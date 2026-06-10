import Link from "next/link";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { leads } from "@/lib/admin/queries";
import { cn } from "@/lib/utils";

const TABS = [
  { key: undefined, label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "closed", label: "Closed" },
] as const;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = ["new", "contacted", "closed"].includes(status ?? "")
    ? status
    : undefined;
  const rows = await leads(filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-cream">Leads</h1>
        <div className="inline-flex rounded-md border border-line bg-surface p-0.5">
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              href={tab.key ? `/admin/leads?status=${tab.key}` : "/admin/leads"}
              className={cn(
                "rounded px-3 py-1.5 text-xs transition-colors",
                filter === tab.key
                  ? "bg-raised text-cream"
                  : "text-cream-faint hover:text-cream",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-surface shadow-card">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            No leads {filter ? `with status "${filter}"` : "yet"}. Submissions
            from the demo form land here.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Preferred time</th>
                <th className="px-5 py-3 font-medium">Message</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="whitespace-nowrap px-5 py-3 text-cream-faint">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-cream">{lead.name}</p>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-xs text-amber hover:text-amber-bright"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-cream-dim">{lead.business_name}</p>
                    {lead.web_presence && (
                      <p className="text-xs text-cream-faint">
                        {lead.web_presence}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-cream-dim">
                    {lead.business_type}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-cream-dim">
                    {[lead.preferred_date, lead.preferred_window]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </td>
                  <td className="max-w-56 px-5 py-3 text-xs text-cream-faint">
                    {lead.message ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <LeadStatusSelect id={lead.id} status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
