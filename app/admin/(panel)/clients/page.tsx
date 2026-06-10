import Link from "next/link";
import { StatCard } from "@/components/admin/charts/StatCard";
import { RagDot } from "@/components/admin/RagDot";
import {
  AdminInput,
  AdminSelect,
  AdminSubmit,
  AdminTextarea,
} from "@/components/admin/AdminField";
import { clientsPortfolio } from "@/lib/admin/queries";
import { createClient } from "./actions";

const SERVICE_LABELS: Record<string, string> = {
  gbp_optimization: "GBP",
  booking_widget: "Booking",
  website_build: "Website",
};

function eur(cents: number): string {
  return `€${(cents / 100).toLocaleString("en-IE", { maximumFractionDigits: 0 })}`;
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

export default async function AdminClientsPage() {
  const portfolio = await clientsPortfolio();

  const active = portfolio.filter((c) => c.status === "active");
  const totalMrr = active.reduce((sum, c) => sum + c.mrr_cents, 0);
  const atRisk = portfolio.filter(
    (c) => c.status !== "churned" && c.health !== "green",
  ).length;
  const reviewsDue = portfolio.reduce((sum, c) => sum + Number(c.reviews_due), 0);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-medium text-cream">Clients</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active MRR" value={eur(totalMrr)} />
        <StatCard label="Active clients" value={active.length} />
        <StatCard
          label="At risk"
          value={atRisk}
          hint="Health amber or red"
        />
        <StatCard
          label="Reviews due"
          value={reviewsDue}
          hint="Shipped implementations awaiting a verdict"
        />
      </div>

      <div className="rounded-lg border border-line bg-surface shadow-card">
        {portfolio.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            No clients yet — add your first one below.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Services</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 text-right font-medium">MRR</th>
                <th className="px-5 py-3 text-right font-medium">Bookings (mo)</th>
                <th className="px-5 py-3 text-right font-medium">Open impl.</th>
                <th className="px-5 py-3 text-right font-medium">Last contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {portfolio.map((client) => {
                const contactDays = daysSince(client.last_contact);
                const delta =
                  client.bookings_this_month !== null &&
                  client.bookings_last_month
                    ? Number(client.bookings_this_month) -
                      Number(client.bookings_last_month)
                    : null;
                return (
                  <tr key={client.id}>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="flex items-center gap-2.5 text-cream hover:text-amber-bright"
                      >
                        <RagDot rag={client.health} />
                        {client.name}
                        {client.status !== "active" && (
                          <span className="text-xs text-cream-faint">
                            ({client.status})
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-cream-dim">
                      {client.venue_type.replace("_", " ")}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-sm border border-line px-1.5 py-0.5 text-[10px] text-cream-dim"
                          >
                            {SERVICE_LABELS[s] ?? s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-cream-dim">
                      {client.plan === "pilot_3mo_half_price" ? (
                        <span className="text-amber">3-mo pilot ½ price</span>
                      ) : (
                        client.plan
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-cream">
                      {eur(client.mrr_cents)}
                    </td>
                    <td className="px-5 py-3 text-right text-cream-dim">
                      {client.bookings_this_month ?? "—"}
                      {delta !== null && (
                        <span
                          className={
                            delta >= 0 ? "ml-1 text-xs text-success" : "ml-1 text-xs text-error"
                          }
                        >
                          {delta >= 0 ? `+${delta}` : delta}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-cream-dim">
                      {client.open_implementations}
                      {Number(client.reviews_due) > 0 && (
                        <span className="ml-1 text-xs text-amber">
                          ({client.reviews_due} due)
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {contactDays === null ? (
                        <span className="text-cream-faint">never</span>
                      ) : contactDays > 21 ? (
                        <span className="text-error">{contactDays}d ago</span>
                      ) : (
                        <span className="text-cream-faint">{contactDays}d ago</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <details className="rounded-lg border border-line bg-surface shadow-card">
        <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-cream">
          + Add client
        </summary>
        <form action={createClient} className="grid gap-4 border-t border-line p-5 sm:grid-cols-2 lg:grid-cols-3">
          <AdminInput label="Name" name="name" required />
          <AdminSelect label="Venue type" name="venue_type" defaultValue="restaurant">
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="spa">Spa</option>
            <option value="tour_operator">Tour operator</option>
            <option value="salon">Salon</option>
            <option value="other">Other</option>
          </AdminSelect>
          <AdminSelect label="Plan" name="plan" defaultValue="pilot_3mo_half_price">
            <option value="pilot_3mo_half_price">3-month pilot (half price)</option>
            <option value="standard">Standard</option>
            <option value="founding">Founding</option>
            <option value="custom">Custom</option>
          </AdminSelect>
          <AdminInput label="MRR (€/mo)" name="mrr_eur" type="number" min="0" step="1" />
          <AdminInput label="Start date" name="start_date" type="date" />
          <AdminSelect label="Status" name="status" defaultValue="onboarding">
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </AdminSelect>
          <fieldset className="text-xs text-cream-dim sm:col-span-2">
            Services
            <div className="mt-2 flex gap-4">
              {Object.entries({
                gbp_optimization: "Google Business Profile optimization",
                booking_widget: "Booking widget",
                website_build: "Website build",
              }).map(([value, label]) => (
                <label key={value} className="flex items-center gap-1.5">
                  <input type="checkbox" name="services" value={value} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <AdminInput label="Primary contact" name="primary_contact" />
          <div className="sm:col-span-2 lg:col-span-3">
            <AdminTextarea label="Notes" name="notes" />
          </div>
          <div>
            <AdminSubmit>Add client</AdminSubmit>
          </div>
        </form>
      </details>
    </div>
  );
}
