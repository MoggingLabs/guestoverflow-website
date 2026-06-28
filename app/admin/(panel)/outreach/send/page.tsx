import { IndividualEmailComposer } from "@/components/admin/IndividualEmailComposer";
import { getDb } from "@/lib/db";
import {
  getRecipient,
  listSendRecipients,
  listTemplates,
  type SendRecipientOption,
} from "@/lib/outreach/admin";
import { loadOutreachConfig } from "@/lib/outreach/config";
import * as repo from "@/lib/outreach/repo";
import { applyVars, contactMergeVars } from "@/lib/outreach/templates";
import { cn } from "@/lib/utils";
import { sendIndividualEmail } from "../actions";

export const dynamic = "force-dynamic";

const INDUSTRIES = ["Restaurantes", "Hotéis", "Salões & Barbearias"];

export default async function SendEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ recipient?: string; template?: string; sent?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const [recipients, templates] = await Promise.all([listSendRecipients(), listTemplates()]);

  // Build the merged, editable draft once both are chosen.
  let draft: { recipientValue: string; toEmail: string; subject: string; body: string } | null = null;
  if (sp.recipient && sp.template) {
    const sql = getDb();
    const [rec, tpl] = await Promise.all([
      getRecipient(sp.recipient),
      sql ? repo.getTemplate(sql, sp.template) : Promise.resolve(null),
    ]);
    if (rec && tpl) {
      const vars = contactMergeVars({
        email: rec.email,
        name: rec.name,
        business_name: rec.business_name,
        fields: rec.fields,
      });
      draft = {
        recipientValue: sp.recipient,
        toEmail: rec.email,
        subject: applyVars(tpl.subject, vars),
        body: applyVars(tpl.body_text, vars),
      };
    }
  }

  const grouped = (group: SendRecipientOption["group"]) =>
    recipients.filter((r) => r.group === group);
  const tmplGroups = INDUSTRIES.map((i) => ({
    industry: i,
    items: templates.filter((t) => t.name.startsWith(`${i} ·`)),
  })).filter((g) => g.items.length > 0);
  const otherTemplates = templates.filter((t) => !INDUSTRIES.some((i) => t.name.startsWith(`${i} ·`)));
  const fromLabel = loadOutreachConfig().fromEmail;

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm text-cream-faint">
        Send one email to a single lead or prospect: pick them, pick a template
        (auto-filled with their info), then edit the preview and send. Goes out
        from the no-reply sender; replies come back to you and show in
        Conversations.
      </p>

      {sp.sent && (
        <p className="rounded-md border border-emerald-700/50 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
          Sent to {sp.sent}.
        </p>
      )}
      {sp.error && (
        <p className="rounded-md border border-red-800/50 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {sp.error}
        </p>
      )}

      {/* Choose recipient + template */}
      <form method="get" className="flex flex-wrap items-end gap-3 rounded-lg border border-line bg-surface p-4">
        <label className="block text-xs text-cream-dim">
          Recipient
          <select
            name="recipient"
            defaultValue={sp.recipient ?? ""}
            required
            className="mt-1.5 block w-72 rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
          >
            <option value="" disabled>Choose a lead or prospect…</option>
            {(["Prospects", "Leads"] as const).map((g) =>
              grouped(g).length > 0 ? (
                <optgroup key={g} label={g}>
                  {grouped(g).map((r) => (
                    <option key={r.value} value={r.value}>
                      {(r.business || r.name || r.email)} — {r.email}
                    </option>
                  ))}
                </optgroup>
              ) : null,
            )}
          </select>
        </label>
        <label className="block text-xs text-cream-dim">
          Template
          <select
            name="template"
            defaultValue={sp.template ?? ""}
            required
            className="mt-1.5 block w-72 rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
          >
            <option value="" disabled>Choose a template…</option>
            {tmplGroups.map((g) => (
              <optgroup key={g.industry} label={g.industry}>
                {g.items.map((t) => (
                  <option key={t.id} value={t.id}>{t.name.replace(/^[^·]*·\s*/, "")}</option>
                ))}
              </optgroup>
            ))}
            {otherTemplates.length > 0 && (
              <optgroup label="Outros">
                {otherTemplates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </optgroup>
            )}
          </select>
        </label>
        <button type="submit" className="rounded-md border border-line bg-surface px-4 py-2 text-sm text-cream-dim hover:text-cream">
          Build draft
        </button>
      </form>

      {/* Editable draft */}
      {draft ? (
        <div className="rounded-lg border border-line bg-surface p-4">
          <IndividualEmailComposer
            action={sendIndividualEmail}
            recipientValue={draft.recipientValue}
            toEmail={draft.toEmail}
            fromLabel={fromLabel}
            initialSubject={draft.subject}
            initialBody={draft.body}
          />
        </div>
      ) : (
        <p className={cn("rounded-lg border border-line bg-surface p-8 text-center text-sm text-cream-faint")}>
          {recipients.length === 0
            ? "No leads or prospects yet. Add prospects in the Prospects tab, or collect leads from the demo form."
            : "Pick a recipient and a template above, then Build draft."}
        </p>
      )}
    </div>
  );
}
