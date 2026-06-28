import Link from "next/link";
import { notFound } from "next/navigation";
import { getSend } from "@/lib/outreach/admin";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  sent: "text-emerald-300",
  failed: "text-red-300",
  skipped: "text-cream-faint",
};

export default async function SentEmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  const send = Number.isFinite(numId) ? await getSend(numId) : null;
  if (!send) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/outreach/sent" className="text-sm text-cream-faint hover:text-cream">
          ← Sent emails
        </Link>
        <h1 className="font-display text-xl font-medium text-cream">
          {send.subject ?? "(no subject)"}
        </h1>
      </div>

      {/* Metadata */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border border-line bg-surface p-4 text-sm sm:grid-cols-4">
        <Meta label="To" value={send.to_email} />
        <Meta label="Campaign" value={send.campaign_name ?? "—"} />
        <Meta
          label="Status"
          value={send.status}
          className={cn("capitalize", STATUS_TONE[send.status])}
        />
        <Meta
          label="Sent"
          value={new Date(send.sent_at).toLocaleString("pt-PT", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
        {send.provider_message_id && (
          <Meta label="Provider ID" value={send.provider_message_id} className="col-span-2" />
        )}
        {send.error && <Meta label="Error" value={send.error} className="col-span-2 text-red-300" />}
      </dl>

      {/* Rendered HTML — exactly what the recipient received, isolated in a
          sandboxed iframe (no scripts, no network). */}
      {send.body_html ? (
        <div className="space-y-2">
          <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
            As the recipient sees it
          </h2>
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <iframe
              title="Rendered email preview"
              sandbox=""
              srcDoc={send.body_html}
              className="h-[640px] w-full border-0"
            />
          </div>
        </div>
      ) : (
        <p className="rounded-lg border border-line bg-surface p-4 text-sm text-cream-faint">
          No rendered body stored for this {send.status} send.
        </p>
      )}

      {/* Plain-text part */}
      {send.body_text && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
            Plain-text version
          </h2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-line bg-raised p-4 text-sm text-cream-dim">
            {send.body_text}
          </pre>
        </div>
      )}
    </div>
  );
}

function Meta({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-cream-faint">{label}</dt>
      <dd className={cn("mt-0.5 break-words text-cream", className)}>{value}</dd>
    </div>
  );
}
