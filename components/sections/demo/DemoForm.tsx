"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import {
  businessTypes,
  demoRequestSchema,
  demoSlots,
  webPresences,
} from "@/lib/validations";
import { setFormTelemetry, track } from "@/lib/analytics";
import { cn, formatDayShort, formatWeekday, toDateKey } from "@/lib/utils";
import { DemoFormSuccess } from "./DemoFormSuccess";

/** Next 10 weekdays as selectable demo-call dates. */
function upcomingWeekdays(count = 10): Date[] {
  const days: Date[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
  }
  return days;
}

type FieldErrors = Partial<Record<string, string>>;

const PILL_BASE =
  "rounded-md border px-3 py-2 text-xs transition-colors";
const PILL_OFF = "border-line text-cream-dim hover:border-amber-deep";
const PILL_ON = "border-amber bg-amber/10 text-amber";

export function DemoForm() {
  const pathname = usePathname();
  const [values, setValues] = useState({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    businessTypeOther: "",
    message: "",
  });
  const [webPresence, setWebPresence] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlots, setPreferredSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [serverError, setServerError] = useState<string | null>(null);

  // Dates are computed once on the client; this component only renders
  // client-side state so there's no SSR mismatch concern for chips.
  const dates = useMemo(() => upcomingWeekdays(), []);

  // Field-level telemetry: start-of-form, per-field completion with
  // hesitation time, and abandonment state read by the analytics
  // provider on pagehide.
  const telemetry = useRef({
    started: false,
    submitted: false,
    lastField: "",
    completed: new Set<string>(),
    focusedAt: new Map<string, number>(),
  });

  useEffect(() => () => setFormTelemetry(null), []);

  const syncTelemetry = () => {
    const t = telemetry.current;
    setFormTelemetry({
      started: t.started,
      submitted: t.submitted,
      lastField: t.lastField,
      fieldsCompleted: t.completed.size,
    });
  };

  // Stable handlers reading the field name off the event target, so the
  // ref is only touched at event time.
  const handleFieldFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const field = e.currentTarget.name;
    const t = telemetry.current;
    t.focusedAt.set(field, Date.now());
    t.lastField = field;
    if (!t.started) {
      t.started = true;
      track("demo_form_started");
    }
    syncTelemetry();
  };

  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    const t = telemetry.current;
    if (value.trim() && !t.completed.has(field)) {
      t.completed.add(field);
      const focusedAt = t.focusedAt.get(field);
      track("form_field_completed", {
        field,
        hesitation_ms: focusedAt ? Date.now() - focusedAt : 0,
      });
    }
    syncTelemetry();
  };

  const set = (field: keyof typeof values) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const honeypot =
      (new FormData(e.currentTarget).get("website") as string) ?? "";
    const payload = {
      ...values,
      preferredDate,
      preferredSlots,
      webPresence,
      pageSource: pathname,
      website: honeypot,
    };

    const parsed = demoRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        track("demo_form_error", {
          status: res.status,
          message: data.error ?? "unknown",
        });
        throw new Error(data.error ?? "Something went wrong.");
      }
      telemetry.current.submitted = true;
      syncTelemetry();
      track("demo_form_submitted", { businessType: values.businessType });
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      if (err instanceof TypeError) {
        // Network-level failure — the lead never reached the server.
        track("demo_form_error", { status: 0, message: "network" });
      }
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us.",
      );
    }
  };

  if (status === "success") {
    return <DemoFormSuccess />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, tabbed past by humans, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-5">
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          error={errors.name}
        />
        <Input
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          error={errors.email}
        />
        <Input
          label="Business name"
          name="businessName"
          autoComplete="organization"
          value={values.businessName}
          onChange={(e) => set("businessName")(e.target.value)}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          error={errors.businessName}
        />
        <Select
          label="Business type"
          name="businessType"
          value={values.businessType}
          onChange={(e) => {
            set("businessType")(e.target.value);
            // Leaving "Other" makes the specify-field disappear; drop its value.
            if (e.target.value !== "Other") set("businessTypeOther")("");
          }}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          error={errors.businessType}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>
      {values.businessType === "Other" && (
        <Input
          label="What kind of business is it?"
          name="businessTypeOther"
          placeholder="e.g. cooking school, gallery, co-working space…"
          value={values.businessTypeOther}
          onChange={(e) => set("businessTypeOther")(e.target.value)}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          error={errors.businessTypeOther}
        />
      )}

      <fieldset>
        <legend className="mb-2 flex w-full items-baseline justify-between text-sm font-medium text-cream">
          Where can guests find you today?
          <span className="text-xs font-normal text-cream-faint">
            Optional — select all that apply
          </span>
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {webPresences.map((presence) => {
            const selected = webPresence.includes(presence);
            return (
              <button
                key={presence}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  setWebPresence((current) =>
                    selected
                      ? current.filter((p) => p !== presence)
                      : [...current, presence],
                  )
                }
                className={cn(PILL_BASE, selected ? PILL_ON : PILL_OFF)}
              >
                {presence}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 flex w-full items-baseline justify-between text-sm font-medium text-cream">
          When would you like your demo call?
          <span className="text-xs font-normal text-cream-faint">Optional</span>
        </legend>
        <p className="mb-2.5 text-xs text-cream-faint">
          Pick a day that suits you. It&apos;s a relaxed 20-minute video call.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dates.map((date) => {
            const key = toDateKey(date);
            const selected = key === preferredDate;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setPreferredDate(selected ? "" : key);
                  setPreferredSlots([]);
                }}
                className={cn(
                  PILL_BASE,
                  "flex flex-col items-center px-3",
                  selected ? PILL_ON : PILL_OFF,
                )}
              >
                <span className="text-[10px] uppercase tracking-wider">
                  {formatWeekday(date)}
                </span>
                <span className="whitespace-nowrap font-medium">
                  {formatDayShort(date)}
                </span>
              </button>
            );
          })}
        </div>
        {preferredDate && (
          <>
            <p className="mt-3 mb-2 text-xs text-cream-faint">
              Now select every time that works for you, as many as you like.
              Free from 3 to 4? Pick 15:00 and 15:30.
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
              {demoSlots.map((slot) => {
                const selected = preferredSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setPreferredSlots((current) =>
                        selected
                          ? current.filter((s) => s !== slot)
                          : [...current, slot].sort(
                              (a, b) =>
                                demoSlots.indexOf(a) - demoSlots.indexOf(b),
                            ),
                      )
                    }
                    className={cn(
                      PILL_BASE,
                      "text-center tabular-nums",
                      selected ? PILL_ON : PILL_OFF,
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </fieldset>

      <Textarea
        label="Anything we should know?"
        name="message"
        optional
        placeholder="Current booking setup, website platform, busiest nights…"
        className="min-h-20"
        value={values.message}
        onChange={(e) => set("message")(e.target.value)}
        error={errors.message}
      />

      {serverError && (
        <p role="alert" className="text-sm text-error">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Request my demo"}
      </Button>
    </form>
  );
}
