import Link from "next/link";
import { AdminInput, AdminSubmit } from "@/components/admin/AdminField";
import { StatusBadge } from "@/components/admin/OutreachStatus";
import { cn } from "@/lib/utils";
import { loadOutreachConfig } from "@/lib/outreach/config";
import { listCampaigns, outreachCounts } from "@/lib/outreach/admin";
import { createCampaign } from "./actions";

export const dynamic = "force-dynamic";

function uniq(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))];
}

export default async function OutreachCampaignsPage() {
  const [campaigns, counts] = await Promise.all([listCampaigns(), outreachCounts()]);

  const cfg = loadOutreachConfig();
  const fromSuggestions = uniq([
    cfg.fromEmail,
    "Guest Overflow <hello@guestoverflow.com>",
    "Guest Overflow <sales@guestoverflow.com>",
  ]);
  const replySuggestions = uniq([
    cfg.replyTo,
    "sales@guestoverflow.com",
    "hello@guestoverflow.com",
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Campaigns" value={campaigns.length} />
        <Stat label="Contacts" value={counts.contacts} />
        <Stat label="Sent" value={counts.sends} href="/admin/outreach/conversations?dir=sent" />
        <Stat label="Unsubscribed" value={counts.suppressions} />
      </div>

      <form
        action={createCampaign}
        className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
      >
        <AdminInput label="New campaign name" name="name" placeholder="Restaurantes · Lisboa" required />
        <AdminInput
          label="From (optional)"
          name="from_email"
          list="from-suggestions"
          defaultValue={fromSuggestions[0]}
          placeholder={fromSuggestions[0]}
        />
        <AdminInput
          label="Reply-to (optional)"
          name="reply_to"
          list="replyto-suggestions"
          defaultValue={replySuggestions[0]}
          placeholder={replySuggestions[0]}
        />
        <AdminSubmit>Create</AdminSubmit>
        <datalist id="from-suggestions">
          {fromSuggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <datalist id="replyto-suggestions">
          {replySuggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </form>

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
        {campaigns.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            No campaigns yet. Create one above, add steps from the Templates tab,
            then add recipients.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Steps</th>
                <th className="px-5 py-3 font-medium">Contacts</th>
                <th className="px-5 py-3 font-medium">Sent</th>
                <th className="px-5 py-3 font-medium">Queued</th>
                <th className="px-5 py-3 font-medium">Failed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-raised/40">
                  <td className="px-5 py-3">
                    <Link href={`/admin/outreach/${c.id}`} className="text-cream hover:text-amber">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3 text-cream-dim">{c.steps}</td>
                  <td className="px-5 py-3 text-cream-dim">{c.contacts}</td>
                  <td className="px-5 py-3 text-emerald-300">{c.sent}</td>
                  <td className="px-5 py-3 text-cream-dim">{c.scheduled}</td>
                  <td className={cn("px-5 py-3", c.failed > 0 ? "text-red-300" : "text-cream-faint")}>
                    {c.failed}
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

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const inner = (
    <>
      <p className="text-xs uppercase tracking-wider text-cream-faint">{label}</p>
      <p className="mt-1 font-display text-2xl text-cream">{value}</p>
    </>
  );
  const className = "block rounded-lg border border-line bg-surface px-4 py-3";
  return href ? (
    <Link href={href} className={cn(className, "transition-colors hover:border-amber-deep/60")}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
