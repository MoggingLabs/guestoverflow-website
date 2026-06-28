import Link from "next/link";
import {
  getConversationMeta,
  getThread,
  listConversations,
  type ConversationRow,
} from "@/lib/outreach/admin";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type TypeFilter = "all" | "client" | "prospect" | "lead" | "other";
type DirFilter = "all" | "sent" | "received";
type DaysFilter = "all" | "7" | "30" | "90";

function typeOf(c: { is_client: boolean; source: string | null }): {
  key: TypeFilter;
  label: string;
} {
  if (c.is_client) return { key: "client", label: "Client" };
  if (c.source === "prospect") return { key: "prospect", label: "Prospect" };
  if (c.source === "lead") return { key: "lead", label: "Lead" };
  if (c.source) return { key: "other", label: "Contact" };
  return { key: "other", label: "—" };
}

const TYPE_TONE: Record<string, string> = {
  Client: "bg-emerald-500/15 text-emerald-300",
  Prospect: "bg-amber/15 text-amber",
  Lead: "bg-sky-500/15 text-sky-300",
  Contact: "bg-raised text-cream-faint",
  "—": "bg-raised text-cream-faint",
};

function fmt(at: string): string {
  return new Date(at).toLocaleString("pt-PT", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    dir?: string;
    days?: string;
    contact?: string;
  }>;
}) {
  const sp = await searchParams;

  // ---- Thread view ----
  if (sp.contact) {
    const email = sp.contact;
    const [thread, meta] = await Promise.all([getThread(email), getConversationMeta(email)]);
    const t = typeOf(meta);
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/outreach/conversations" className="text-sm text-cream-faint hover:text-cream">
            ← Conversations
          </Link>
          <h2 className="font-display text-lg font-medium text-cream">
            {meta.business_name ?? meta.contact_name ?? email}
          </h2>
          <span className={cn("rounded px-2 py-0.5 text-xs font-medium", TYPE_TONE[t.label])}>
            {t.label}
          </span>
        </div>
        <p className="-mt-3 text-sm text-cream-faint">{email}</p>

        {thread.length === 0 ? (
          <p className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-cream-faint">
            No emails with this address.
          </p>
        ) : (
          <div className="space-y-3">
            {thread.map((m, i) => {
              const sent = m.direction === "sent";
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-lg border p-4",
                    sent ? "border-amber-deep/40 bg-amber/5" : "border-line bg-surface",
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                    <span className={cn("font-medium", sent ? "text-amber" : "text-emerald-300")}>
                      {sent ? "→ Sent" : "← Received"}
                      {m.status && m.status !== "sent" ? ` (${m.status})` : ""}
                    </span>
                    <span className="text-cream-faint">{fmt(m.at)}</span>
                  </div>
                  <p className="text-sm font-medium text-cream">{m.subject ?? "(no subject)"}</p>
                  {m.body_html ? (
                    <div className="mt-2 overflow-hidden rounded-md border border-line bg-white">
                      <iframe
                        title={`message-${i}`}
                        sandbox=""
                        srcDoc={m.body_html}
                        className="h-96 w-full border-0"
                      />
                    </div>
                  ) : m.body_text ? (
                    <pre className="mt-2 max-h-72 overflow-y-auto whitespace-pre-wrap text-sm text-cream-dim">
                      {m.body_text}
                    </pre>
                  ) : null}
                  {m.body_html && m.body_text && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-cream-faint">Plain-text version</summary>
                      <pre className="mt-1 max-h-48 overflow-y-auto whitespace-pre-wrap text-sm text-cream-dim">
                        {m.body_text}
                      </pre>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ---- List view (search + advanced filters) ----
  const q = (sp.q ?? "").trim().toLowerCase();
  const type = (["all", "client", "prospect", "lead", "other"].includes(sp.type ?? "")
    ? sp.type
    : "all") as TypeFilter;
  const dir = (["all", "sent", "received"].includes(sp.dir ?? "") ? sp.dir : "all") as DirFilter;
  const days = (["all", "7", "30", "90"].includes(sp.days ?? "") ? sp.days : "all") as DaysFilter;

  // Date filtering happens in SQL (keeps render pure); the rest filters here.
  const all = await listConversations(days === "all" ? 0 : Number(days));
  const rows = all.filter((c: ConversationRow) => {
    if (q) {
      const hay = `${c.raw_email} ${c.business_name ?? ""} ${c.contact_name ?? ""} ${c.last_subject ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (type !== "all" && typeOf(c).key !== type) return false;
    if (dir === "received" && c.received_count === 0) return false;
    if (dir === "sent" && c.sent_count === 0) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm text-cream-faint">
        Every email thread with a prospect or client — what we sent and what they
        replied. Search by name, business, email or subject; filter below.
      </p>

      <form method="get" className="flex flex-wrap items-end gap-2">
        <label className="block text-xs text-cream-dim">
          Search
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="name, business, email, subject…"
            className="mt-1.5 block w-64 rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:border-amber-deep focus:outline-none"
          />
        </label>
        <Select name="type" label="Type" value={type} options={[["all", "All"], ["client", "Clients"], ["prospect", "Prospects"], ["lead", "Leads"], ["other", "Other"]]} />
        <Select name="dir" label="Has" value={dir} options={[["all", "Any"], ["received", "Replies"], ["sent", "Sent"]]} />
        <Select name="days" label="Period" value={days} options={[["all", "All time"], ["7", "Last 7 days"], ["30", "Last 30 days"], ["90", "Last 90 days"]]} />
        <button type="submit" className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-ink hover:bg-amber-bright">
          Filter
        </button>
        {(sp.q || type !== "all" || dir !== "all" || days !== "all") && (
          <Link href="/admin/outreach/conversations" className="px-2 py-2 text-sm text-cream-faint hover:text-cream">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-lg border border-line bg-surface shadow-card">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            {all.length === 0
              ? "No email activity yet."
              : "No conversations match these filters."}
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Last message</th>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Sent / Recv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((c) => {
                const t = typeOf(c);
                const href = `/admin/outreach/conversations?contact=${encodeURIComponent(c.raw_email)}`;
                return (
                  <tr key={c.email} className="hover:bg-raised/30">
                    <td className="px-4 py-3">
                      <Link href={href} className="block">
                        <span className="text-cream">{c.business_name ?? c.contact_name ?? c.raw_email}</span>
                        <span className="block text-xs text-cream-faint">{c.raw_email}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded px-2 py-0.5 text-xs font-medium", TYPE_TONE[t.label])}>
                        {t.label}
                      </span>
                    </td>
                    <td className="max-w-72 px-4 py-3">
                      <Link href={href} className="block truncate text-cream-dim hover:text-cream">
                        <span className={cn("mr-1.5", c.last_dir === "received" ? "text-emerald-300" : "text-cream-faint")}>
                          {c.last_dir === "received" ? "←" : "→"}
                        </span>
                        {c.last_subject ?? "—"}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-cream-faint">{fmt(c.last_at)}</td>
                    <td className="px-4 py-3 text-xs text-cream-faint">
                      {c.sent_count} /{" "}
                      <span className={c.received_count > 0 ? "text-emerald-300" : ""}>{c.received_count}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: [string, string][];
}) {
  return (
    <label className="block text-xs text-cream-dim">
      {label}
      <select
        name={name}
        defaultValue={value}
        className="mt-1.5 block rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
