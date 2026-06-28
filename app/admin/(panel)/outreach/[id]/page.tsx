import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AdminInput,
  AdminSelect,
  AdminSubmit,
  AdminTextarea,
} from "@/components/admin/AdminField";
import { StatusBadge } from "@/components/admin/OutreachStatus";
import { getCampaignDetail, listTemplates } from "@/lib/outreach/admin";
import { cn } from "@/lib/utils";
import {
  addStep,
  importLeads,
  importPasted,
  sendTest,
  setCampaignStatus,
} from "../actions";

export const dynamic = "force-dynamic";

function delayLabel(hours: number): string {
  if (hours <= 0) return "immediately";
  if (hours % 24 === 0) return `+${hours / 24}d`;
  return `+${hours}h`;
}

const ENROLL_STYLES: Record<string, string> = {
  active: "text-emerald-300",
  completed: "text-cream-dim",
  stopped: "text-amber",
};

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [detail, templates] = await Promise.all([
    getCampaignDetail(id),
    listTemplates(),
  ]);
  if (!detail) notFound();
  const { campaign, steps, enrollments, recent, stats } = detail;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/outreach" className="text-sm text-cream-faint hover:text-cream">
            ← Outreach
          </Link>
          <h1 className="font-display text-2xl font-medium text-cream">{campaign.name}</h1>
          <StatusBadge status={campaign.status} />
        </div>
        <div className="flex items-center gap-2">
          {campaign.status !== "active" && (
            <StatusButton id={id} to="active" label="Activate" primary />
          )}
          {campaign.status === "active" && (
            <StatusButton id={id} to="paused" label="Pause" />
          )}
          {campaign.status !== "archived" && (
            <StatusButton id={id} to="archived" label="Archive" />
          )}
        </div>
      </div>

      {campaign.status !== "active" && (
        <p className="rounded-md border border-amber-deep/50 bg-amber/10 px-4 py-2.5 text-xs text-amber">
          This campaign is <strong>{campaign.status}</strong> — the worker will not
          send its emails until it is activated.
        </p>
      )}

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Sent" value={stats.sent} tone="emerald" />
        <Stat label="Queued" value={stats.scheduled} />
        <Stat label="Failed" value={stats.failed} tone={stats.failed > 0 ? "red" : undefined} />
      </div>

      {/* Sequence steps */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
          Sequence ({steps.length} {steps.length === 1 ? "step" : "steps"})
        </h2>
        <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
          {steps.length === 0 ? (
            <p className="p-6 text-center text-sm text-cream-faint">
              No steps yet. Add the first email below.
            </p>
          ) : (
            <ol className="divide-y divide-line">
              {steps.map((s) => (
                <li key={s.step_index} className="flex items-center gap-4 px-5 py-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-raised text-xs text-cream-dim">
                    {s.step_index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-cream">{s.subject}</p>
                    <p className="text-xs text-cream-faint">{s.template_name}</p>
                  </div>
                  <span className="text-xs text-cream-faint">{delayLabel(s.delay_hours)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <form
          action={addStep.bind(null, id)}
          className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[1fr_auto_auto] sm:items-end"
        >
          <AdminSelect label="Template" name="template_id" required defaultValue="">
            <option value="" disabled>
              Choose a template…
            </option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.subject}
              </option>
            ))}
          </AdminSelect>
          <AdminInput
            label="Delay (hours from previous)"
            name="delay_hours"
            type="number"
            min={0}
            defaultValue={steps.length === 0 ? 0 : 72}
            className="w-44"
          />
          <AdminSubmit>Add step</AdminSubmit>
        </form>
      </section>

      {/* Recipients */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
          Recipients ({enrollments.length})
        </h2>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <form action={importLeads.bind(null, id)} className="rounded-lg border border-line bg-surface p-4">
            <p className="text-sm text-cream">Import from leads</p>
            <p className="mt-1 text-xs text-cream-faint">
              Adds every demo-form lead as a contact and enrolls it. Idempotent —
              safe to click again as new leads arrive.
            </p>
            <div className="mt-3">
              <AdminSubmit>Import all leads</AdminSubmit>
            </div>
          </form>

          <form action={importPasted.bind(null, id)} className="space-y-2 rounded-lg border border-line bg-surface p-4">
            <AdminTextarea
              label="Paste cold prospects — one per line: email, name, business"
              name="contacts"
              placeholder={"ana@garagem33.pt, Ana, Garagem 33\njoao@example.pt, João, Tasca do João"}
            />
            <AdminSubmit>Add &amp; enroll</AdminSubmit>
          </form>
        </div>

        <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
          {enrollments.length === 0 ? (
            <p className="p-6 text-center text-sm text-cream-faint">
              No recipients yet. Import leads or paste prospects above.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Business</th>
                  <th className="px-5 py-3 font-medium">Enrollment</th>
                  <th className="px-5 py-3 font-medium">Step</th>
                  <th className="px-5 py-3 font-medium">Last message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {enrollments.map((e) => (
                  <tr key={e.id}>
                    <td className="px-5 py-3">
                      <p className="text-cream">{e.name ?? "—"}</p>
                      <p className="text-xs text-cream-faint">{e.email}</p>
                    </td>
                    <td className="px-5 py-3 text-cream-dim">{e.business_name ?? "—"}</td>
                    <td className={cn("px-5 py-3 capitalize", ENROLL_STYLES[e.status] ?? "text-cream-dim")}>
                      {e.status}
                    </td>
                    <td className="px-5 py-3 text-cream-dim">
                      {e.current_step < 0 ? "—" : e.current_step + 1}
                    </td>
                    <td className="px-5 py-3 text-cream-faint">{e.last_status ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Test send */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
          Send a test
        </h2>
        <form
          action={sendTest.bind(null, id)}
          className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[1fr_auto_auto] sm:items-end"
        >
          <AdminInput label="Send test to" name="to" type="email" placeholder="you@guestoverflow.com" required />
          <AdminInput label="Step #" name="step_index" type="number" min={0} defaultValue={0} className="w-24" />
          <AdminSubmit>Send test</AdminSubmit>
        </form>
        <p className="text-xs text-cream-faint">
          Sends the chosen step (0-based) immediately with sample merge data.
          Does not enroll anyone or write to the log.
        </p>
      </section>

      {/* Recent activity */}
      {recent.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
            Recent sends
          </h2>
          <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                  <th className="px-5 py-3 font-medium">When</th>
                  <th className="px-5 py-3 font-medium">To</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap px-5 py-3 text-cream-faint">
                      {new Date(r.sent_at).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3 text-cream-dim">{r.to_email}</td>
                    <td className="px-5 py-3 text-cream-dim">{r.subject ?? "—"}</td>
                    <td
                      className={cn(
                        "px-5 py-3 capitalize",
                        r.status === "sent"
                          ? "text-emerald-300"
                          : r.status === "failed"
                            ? "text-red-300"
                            : "text-cream-faint",
                      )}
                    >
                      {r.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function StatusButton({
  id,
  to,
  label,
  primary,
}: {
  id: string;
  to: "draft" | "active" | "paused" | "archived";
  label: string;
  primary?: boolean;
}) {
  return (
    <form action={setCampaignStatus.bind(null, id, to)}>
      <button
        type="submit"
        className={cn(
          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
          primary
            ? "bg-amber text-ink hover:bg-amber-bright"
            : "border border-line bg-surface text-cream-dim hover:text-cream",
        )}
      >
        {label}
      </button>
    </form>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "emerald" | "red";
}) {
  return (
    <div className="rounded-lg border border-line bg-surface px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-cream-faint">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl",
          tone === "emerald" ? "text-emerald-300" : tone === "red" ? "text-red-300" : "text-cream",
        )}
      >
        {value}
      </p>
    </div>
  );
}
