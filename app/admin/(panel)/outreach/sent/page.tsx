import Link from "next/link";
import { listSends } from "@/lib/outreach/admin";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  sent: "text-emerald-300",
  failed: "text-red-300",
  skipped: "text-cream-faint",
};

export default async function SentEmailsPage() {
  const sends = await listSends();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/outreach" className="text-sm text-cream-faint hover:text-cream">
          ← Outreach
        </Link>
        <h1 className="font-display text-2xl font-medium text-cream">Sent emails</h1>
      </div>
      <p className="max-w-2xl text-sm text-cream-faint">
        Every email the system has sent — campaign sends and test sends. Click a
        row to see exactly what the recipient received.
      </p>

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
        {sends.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            Nothing sent yet. Sends appear here once a campaign is active or you
            send a test.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-5 py-3 font-medium">When</th>
                <th className="px-5 py-3 font-medium">To</th>
                <th className="px-5 py-3 font-medium">Subject</th>
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sends.map((s) => (
                <tr key={s.id} className="hover:bg-raised/40">
                  <td className="whitespace-nowrap px-5 py-3 text-cream-faint">
                    <Link href={`/admin/outreach/sent/${s.id}`} className="block">
                      {new Date(s.sent_at).toLocaleString("pt-PT", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-cream-dim">
                    <Link href={`/admin/outreach/sent/${s.id}`} className="block hover:text-cream">
                      {s.to_email}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-cream">
                    <Link href={`/admin/outreach/sent/${s.id}`} className="block hover:text-amber">
                      {s.is_test && (
                        <span className="mr-2 rounded bg-amber/15 px-1.5 py-0.5 text-[10px] font-medium uppercase text-amber">
                          test
                        </span>
                      )}
                      {s.subject ?? "—"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-cream-faint">{s.campaign_name ?? "—"}</td>
                  <td className={cn("px-5 py-3 capitalize", STATUS_TONE[s.status] ?? "text-cream-faint")}>
                    {s.status}
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
