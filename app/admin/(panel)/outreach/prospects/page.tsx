import Link from "next/link";
import { AdminSubmit, AdminTextarea } from "@/components/admin/AdminField";
import { ProspectSendButton } from "@/components/admin/ProspectSendButton";
import { listProspects } from "@/lib/outreach/admin";
import {
  missingRequired,
  PROSPECT_FIELDS,
  SAMPLE_CSV_HEADER,
} from "@/lib/outreach/prospects";
import { cn } from "@/lib/utils";
import { importProspects, sendProspectEmail } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{ imported?: string; skipped?: string; sent?: string; error?: string }>;
}) {
  const [prospects, sp] = await Promise.all([listProspects(), searchParams]);
  const ready = prospects.filter((p) => missingRequired(p).length === 0).length;

  return (
    <div className="space-y-6">
      {/* Notices */}
      {sp.sent && <Notice tone="ok">Sent to {sp.sent}.</Notice>}
      {sp.imported !== undefined && (
        <Notice tone="ok">
          Imported {sp.imported} prospect(s)
          {Number(sp.skipped) > 0 ? `, skipped ${sp.skipped} without a valid email` : ""}.
        </Notice>
      )}
      {sp.error && <Notice tone="err">{sp.error}</Notice>}

      {/* Import */}
      <form
        action={importProspects}
        className="space-y-3 rounded-lg border border-line bg-surface p-4"
      >
        <p className="text-sm font-medium text-cream">Import prospects (CSV)</p>
        <p className="text-xs text-cream-faint">
          Header row required. Recognized columns (so every prospect has what a
          custom email needs):
        </p>
        <ul className="flex flex-wrap gap-1.5 text-xs">
          {PROSPECT_FIELDS.map((f) => (
            <li
              key={f.key}
              className={cn(
                "rounded px-2 py-0.5",
                f.required ? "bg-amber/15 text-amber" : "bg-raised text-cream-faint",
              )}
              title={f.hint ?? f.aliases.join(", ")}
            >
              {f.label}
              {f.required ? " *" : ""}
            </li>
          ))}
        </ul>
        <p className="text-xs text-cream-faint">
          * required to send. Example header:{" "}
          <code className="text-cream-dim">{SAMPLE_CSV_HEADER}</code>
        </p>
        <input
          type="file"
          name="file"
          accept=".csv,text/csv"
          className="block w-full text-sm text-cream-dim file:mr-3 file:rounded-md file:border-0 file:bg-raised file:px-3 file:py-1.5 file:text-sm file:text-cream hover:file:bg-line"
        />
        <AdminTextarea
          label="…or paste CSV"
          name="csv"
          placeholder={`${SAMPLE_CSV_HEADER}\nana@garagem33.pt,Ana,Garagem 33,Restaurantes,Vila Verde,Instagram,172k seguidores no IG`}
        />
        <AdminSubmit>Import</AdminSubmit>
      </form>

      {/* Table */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wider text-cream-faint">
          Prospects ({prospects.length})
        </h2>
        <span className="text-xs text-cream-faint">{ready} ready to send</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-surface shadow-card">
        {prospects.length === 0 ? (
          <p className="p-8 text-center text-sm text-cream-faint">
            No prospects yet. Import a CSV above to build your cold-outreach list.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-cream-faint">
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Details</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {prospects.map((p) => {
                const missing = missingRequired(p);
                const blocked = Boolean(p.unsubscribed_at) || p.suppressed;
                const canSend = missing.length === 0 && !blocked;
                const f = p.fields ?? {};
                const details = [f.city, f.channel, f.hook].filter(Boolean).join(" · ");
                return (
                  <tr key={p.id} className="align-top hover:bg-raised/30">
                    <td className="px-4 py-3 text-cream">{p.business_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <p className="text-cream-dim">{p.name ?? "—"}</p>
                      <p className="text-xs text-cream-faint">{p.email}</p>
                    </td>
                    <td className="px-4 py-3 text-cream-dim">{f.industry ?? "—"}</td>
                    <td className="max-w-56 px-4 py-3 text-xs text-cream-faint">{details || "—"}</td>
                    <td className="px-4 py-3 text-xs">
                      {blocked ? (
                        <span className="text-amber">unsubscribed</span>
                      ) : missing.length > 0 ? (
                        <span className="text-amber">missing: {missing.join(", ")}</span>
                      ) : p.last_emailed_at ? (
                        <span className="text-cream-faint">
                          sent {new Date(p.last_emailed_at).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })}
                        </span>
                      ) : (
                        <span className="text-emerald-300">ready</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/outreach/prospects/${p.id}/preview`}
                          className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-cream-dim hover:text-cream"
                        >
                          Preview
                        </Link>
                        <ProspectSendButton
                          action={sendProspectEmail.bind(null, p.id, null)}
                          confirmText={`Send a cold email to ${p.email}?`}
                          label="Send"
                          small
                          disabled={!canSend}
                        />
                      </div>
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

function Notice({ tone, children }: { tone: "ok" | "err"; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "rounded-md border px-4 py-2.5 text-sm",
        tone === "ok"
          ? "border-emerald-700/50 bg-emerald-500/10 text-emerald-300"
          : "border-red-800/50 bg-red-500/10 text-red-300",
      )}
    >
      {children}
    </p>
  );
}
