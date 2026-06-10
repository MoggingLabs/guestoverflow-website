import { notFound } from "next/navigation";
import { BarChart } from "@/components/admin/charts/BarChart";
import { RagDot } from "@/components/admin/RagDot";
import {
  AdminInput,
  AdminSelect,
  AdminSubmit,
  AdminTextarea,
} from "@/components/admin/AdminField";
import {
  clientAssessments,
  clientById,
  clientFigures,
  clientImplementations,
  clientTouchpoints,
} from "@/lib/admin/queries";
import {
  addImplementation,
  addTouchpoint,
  logAssessment,
  updateImplementation,
  updateNotes,
  upsertFigures,
} from "../actions";
import { cn } from "@/lib/utils";

const IMPL_STATUS_STYLES: Record<string, string> = {
  planned: "border-line text-cream-faint",
  shipped: "border-amber-deep text-amber",
  working: "border-success/60 text-success",
  not_working: "border-error/60 text-error",
  needs_changes: "border-amber-deep text-amber-bright",
  abandoned: "border-line text-cream-faint line-through",
};

function monthLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "2-digit",
  });
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await clientById(id);
  if (!client) notFound();

  const [implementations, assessments, figures, touchpoints] =
    await Promise.all([
      clientImplementations(id),
      clientAssessments(id),
      clientFigures(id),
      clientTouchpoints(id),
    ]);

  // Ship-date markers aligned to the bookings-per-month chart.
  const monthKeys = figures.map((f) => String(f.month).slice(0, 7));
  const markers = implementations
    .filter((impl) => impl.shipped_at)
    .map((impl) => ({
      label: impl.title,
      afterIndex: monthKeys.indexOf(String(impl.shipped_at).slice(0, 7)),
    }))
    .filter((m) => m.afterIndex >= 0);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center gap-4">
        <RagDot rag={client.health} className="h-3.5 w-3.5" />
        <h1 className="font-display text-2xl font-medium text-cream">
          {client.name}
        </h1>
        <span className="text-sm text-cream-dim">
          {client.venue_type.replace("_", " ")} ·{" "}
          {client.plan === "pilot_3mo_half_price"
            ? "3-month pilot (half price)"
            : client.plan}{" "}
          · €{Math.round(client.mrr_cents / 100)}/mo · {client.status}
        </span>
        {client.primary_contact && (
          <span className="text-sm text-cream-faint">
            Contact: {client.primary_contact}
          </span>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: implementations + figures chart */}
        <div className="space-y-6">
          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Bookings per month — implementation ship dates marked
            </h2>
            <BarChart
              bars={figures.map((f) => ({
                label: monthLabel(f.month),
                value: Number(f.bookings ?? 0),
              }))}
              markers={markers}
            />
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Implementations — is it working?
            </h2>
            {implementations.length === 0 ? (
              <p className="text-sm text-cream-faint">
                Nothing logged yet. Every change you ship for this client goes
                here, with a review date and a verdict.
              </p>
            ) : (
              <ul className="space-y-4">
                {implementations.map((impl) => {
                  const overdue =
                    impl.status === "shipped" &&
                    impl.review_due !== null &&
                    String(impl.review_due) <= today;
                  return (
                    <li
                      key={impl.id}
                      className="rounded-md border border-line bg-raised/50 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-cream">
                          {impl.title}
                        </span>
                        <span
                          className={cn(
                            "rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-wider",
                            IMPL_STATUS_STYLES[impl.status],
                          )}
                        >
                          {impl.status.replace("_", " ")}
                        </span>
                        {overdue && (
                          <span className="rounded-sm bg-error/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-error">
                            review overdue
                          </span>
                        )}
                      </div>
                      {impl.hypothesis && (
                        <p className="mt-2 text-xs text-cream-dim">
                          Hypothesis: {impl.hypothesis}
                        </p>
                      )}
                      <p className="mt-1.5 text-xs text-cream-faint">
                        {impl.shipped_at
                          ? `Shipped ${impl.shipped_at}`
                          : "Not shipped yet"}
                        {impl.review_due && ` · Review due ${impl.review_due}`}
                        {impl.target_metric && ` · Metric: ${impl.target_metric}`}
                      </p>
                      {impl.outcome_notes && (
                        <p className="mt-2 border-l-2 border-line pl-3 text-xs text-cream-dim">
                          {impl.outcome_notes}
                        </p>
                      )}
                      <form
                        action={updateImplementation}
                        className="mt-3 flex flex-wrap items-end gap-2"
                      >
                        <input type="hidden" name="id" value={impl.id} />
                        <input type="hidden" name="client_id" value={id} />
                        <AdminSelect
                          label="Verdict"
                          name="status"
                          defaultValue={impl.status}
                          className="w-40"
                        >
                          <option value="planned">Planned</option>
                          <option value="shipped">Shipped — measuring</option>
                          <option value="working">Working</option>
                          <option value="not_working">Not working</option>
                          <option value="needs_changes">Needs changes</option>
                          <option value="abandoned">Abandoned</option>
                        </AdminSelect>
                        <div className="min-w-48 flex-1">
                          <AdminInput
                            label="Outcome notes"
                            name="outcome_notes"
                            placeholder="What did we learn?"
                          />
                        </div>
                        <AdminSubmit>Save</AdminSubmit>
                      </form>
                    </li>
                  );
                })}
              </ul>
            )}

            <details className="mt-5">
              <summary className="cursor-pointer text-sm text-amber">
                + Log an implementation
              </summary>
              <form
                action={addImplementation}
                className="mt-4 grid gap-3 sm:grid-cols-2"
              >
                <input type="hidden" name="client_id" value={id} />
                <AdminInput label="Title" name="title" required />
                <AdminInput
                  label="Target metric"
                  name="target_metric"
                  placeholder="e.g. no-show rate"
                />
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="Hypothesis"
                    name="hypothesis"
                    placeholder="We believe X will improve Y because Z"
                  />
                </div>
                <AdminInput label="Shipped on" name="shipped_at" type="date" />
                <AdminInput label="Review due" name="review_due" type="date" />
                <AdminSelect label="Status" name="status" defaultValue="planned">
                  <option value="planned">Planned</option>
                  <option value="shipped">Shipped</option>
                </AdminSelect>
                <div className="self-end">
                  <AdminSubmit>Add</AdminSubmit>
                </div>
              </form>
            </details>
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Monthly figures
            </h2>
            <form
              action={upsertFigures}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              <input type="hidden" name="client_id" value={id} />
              <AdminInput
                label="Month"
                name="month"
                type="month"
                required
                defaultValue={today.slice(0, 7)}
              />
              <AdminInput label="Bookings" name="bookings" type="number" min="0" />
              <AdminInput
                label="Widget sessions"
                name="widget_sessions"
                type="number"
                min="0"
              />
              <AdminInput label="No-shows" name="no_shows" type="number" min="0" />
              <AdminInput
                label="Cancellations"
                name="cancellations"
                type="number"
                min="0"
              />
              <AdminInput
                label="Direct share %"
                name="direct_share_pct"
                type="number"
                min="0"
                max="100"
              />
              <AdminInput
                label="Dashboard logins"
                name="venue_dashboard_logins"
                type="number"
                min="0"
              />
              <AdminInput
                label="Support tickets"
                name="support_tickets"
                type="number"
                min="0"
              />
              <div className="col-span-2 sm:col-span-4">
                <AdminSubmit>Save month</AdminSubmit>
              </div>
            </form>
          </section>
        </div>

        {/* Right: health, touchpoints, notes */}
        <div className="space-y-6">
          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Health — log an assessment
            </h2>
            <form action={logAssessment} className="grid gap-3">
              <input type="hidden" name="client_id" value={id} />
              <div className="grid grid-cols-3 gap-3">
                <AdminSelect label="RAG" name="rag" defaultValue={client.health}>
                  <option value="green">Green</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </AdminSelect>
                <AdminSelect label="Usage trend" name="usage_trend" defaultValue="">
                  <option value="">—</option>
                  <option value="up">Up</option>
                  <option value="flat">Flat</option>
                  <option value="down">Down</option>
                </AdminSelect>
                <AdminInput
                  label="Sentiment 1–10"
                  name="sentiment"
                  type="number"
                  min="1"
                  max="10"
                />
              </div>
              <AdminInput
                label="Reason (required for amber/red)"
                name="reason"
                placeholder="Why this rating?"
              />
              <AdminInput label="Next action" name="next_action" />
              <label className="flex items-center gap-2 text-xs text-cream-dim">
                <input type="checkbox" name="payment_ok" defaultChecked />
                Payments OK
              </label>
              <div>
                <AdminSubmit>Log assessment</AdminSubmit>
              </div>
            </form>

            {assessments.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {assessments.map((a) => (
                  <li key={a.id} className="flex items-start gap-2.5 text-xs">
                    <RagDot rag={a.rag} className="mt-0.5" />
                    <div>
                      <span className="text-cream-faint">
                        {new Date(a.assessed_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>{" "}
                      <span className="text-cream-dim">
                        {a.reason ?? "Healthy"}
                        {a.next_action && ` → ${a.next_action}`}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Touchpoints
            </h2>
            <form action={addTouchpoint} className="flex items-end gap-2">
              <input type="hidden" name="client_id" value={id} />
              <AdminSelect label="Kind" name="kind" defaultValue="call" className="w-28">
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="visit">Visit</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="other">Other</option>
              </AdminSelect>
              <div className="flex-1">
                <AdminInput label="Summary" name="summary" required />
              </div>
              <AdminSubmit>Log</AdminSubmit>
            </form>
            {touchpoints.length > 0 && (
              <ul className="mt-5 space-y-2.5 border-t border-line pt-4 text-xs">
                {touchpoints.map((t) => (
                  <li key={t.id} className="flex gap-2.5">
                    <span className="w-16 shrink-0 text-cream-faint">
                      {new Date(t.occurred_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="w-16 shrink-0 uppercase tracking-wider text-cream-faint">
                      {t.kind}
                    </span>
                    <span className="text-cream-dim">{t.summary}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
              Notes
            </h2>
            <form action={updateNotes} className="space-y-3">
              <input type="hidden" name="client_id" value={id} />
              <AdminTextarea
                label=""
                name="notes"
                defaultValue={client.notes ?? ""}
                placeholder="Anything worth remembering about this client…"
              />
              <AdminSubmit>Save notes</AdminSubmit>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
