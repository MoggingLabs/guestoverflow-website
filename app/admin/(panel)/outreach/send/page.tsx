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
import { sendIndividualEmail } from "../actions";

export const dynamic = "force-dynamic";

const INDUSTRIES = ["Restaurantes", "Hotéis", "Salões & Barbearias"];

interface SP {
  recipient?: string;
  template?: string;
  sent?: string;
  error?: string;
  m_email?: string;
  m_first?: string;
  m_business?: string;
  m_industry?: string;
  m_city?: string;
  m_channel?: string;
  m_hook?: string;
}

export default async function SendEmailPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const [recipients, templates] = await Promise.all([listSendRecipients(), listTemplates()]);

  let draft: {
    hiddenFields: Record<string, string>;
    toEmail: string;
    subject: string;
    body: string;
  } | null = null;

  if (sp.template) {
    const sql = getDb();
    const tpl = sql ? await repo.getTemplate(sql, sp.template) : null;
    if (tpl) {
      let vars: Record<string, string> | null = null;
      let hiddenFields: Record<string, string> | null = null;
      let toEmail = "";

      if (sp.recipient) {
        const rec = await getRecipient(sp.recipient);
        if (rec) {
          vars = contactMergeVars({
            email: rec.email,
            name: rec.name,
            business_name: rec.business_name,
            fields: rec.fields,
          });
          hiddenFields = { recipient: sp.recipient };
          toEmail = rec.email;
        }
      } else if (sp.m_email && sp.m_email.includes("@")) {
        const fields: Record<string, string> = {};
        if (sp.m_first) { fields.firstName = sp.m_first; }
        if (sp.m_business) { fields.business = sp.m_business; fields.businessName = sp.m_business; }
        if (sp.m_industry) fields.industry = sp.m_industry;
        if (sp.m_city) fields.city = sp.m_city;
        if (sp.m_channel) fields.channel = sp.m_channel;
        if (sp.m_hook) fields.hook = sp.m_hook;
        vars = contactMergeVars({
          email: sp.m_email,
          name: sp.m_first ?? null,
          business_name: sp.m_business ?? null,
          fields,
        });
        hiddenFields = {
          m_email: sp.m_email,
          m_first: sp.m_first ?? "",
          m_business: sp.m_business ?? "",
          m_industry: sp.m_industry ?? "",
          m_city: sp.m_city ?? "",
          m_channel: sp.m_channel ?? "",
          m_hook: sp.m_hook ?? "",
        };
        toEmail = sp.m_email;
      }

      if (vars && hiddenFields) {
        draft = {
          hiddenFields,
          toEmail,
          subject: applyVars(tpl.subject, vars),
          body: applyVars(tpl.body_text, vars),
        };
      }
    }
  }

  const grouped = (group: SendRecipientOption["group"]) => recipients.filter((r) => r.group === group);
  const tmplGroups = INDUSTRIES.map((i) => ({
    industry: i,
    items: templates.filter((t) => t.name.startsWith(`${i} ·`)),
  })).filter((g) => g.items.length > 0);
  const otherTemplates = templates.filter((t) => !INDUSTRIES.some((i) => t.name.startsWith(`${i} ·`)));
  const fromLabel = loadOutreachConfig().fromEmail;
  const usingManual = !sp.recipient && Boolean(sp.m_email);

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm text-cream-faint">
        Send one email to a single lead or prospect — or to someone new. Pick or
        enter the recipient, pick a template (auto-filled with their info), edit
        the preview, and send. Goes out from the no-reply sender; replies show in
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

      <form method="get" className="space-y-4 rounded-lg border border-line bg-surface p-4">
        <div className="flex flex-wrap items-end gap-3">
          <Field label="Recipient (from your list)">
            <select name="recipient" defaultValue={sp.recipient ?? ""} className={selectCls}>
              <option value="">— choose existing —</option>
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
          </Field>
          <Field label="Template">
            <select name="template" defaultValue={sp.template ?? ""} required className={selectCls}>
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
          </Field>
          <button type="submit" className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-ink hover:bg-amber-bright">
            Build draft
          </button>
        </div>

        <details open={usingManual} className="border-t border-line pt-3">
          <summary className="cursor-pointer text-sm text-cream-dim">
            …or send to someone not in your list (saved as a prospect)
          </summary>
          <p className="mt-2 text-xs text-cream-faint">
            Leave the existing-recipient picker on “choose existing”. Fill these in
            — they populate the template merge fields ({"{{firstName}}"},{" "}
            {"{{business}}"}, {"{{city}}"}, {"{{channel}}"}, {"{{hook}}"}).
          </p>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Email *"><input name="m_email" type="email" defaultValue={sp.m_email ?? ""} className={inputCls} /></Field>
            <Field label="First name"><input name="m_first" defaultValue={sp.m_first ?? ""} className={inputCls} /></Field>
            <Field label="Business"><input name="m_business" defaultValue={sp.m_business ?? ""} className={inputCls} /></Field>
            <Field label="Industry"><input name="m_industry" defaultValue={sp.m_industry ?? ""} placeholder="Restaurantes…" className={inputCls} /></Field>
            <Field label="City"><input name="m_city" defaultValue={sp.m_city ?? ""} className={inputCls} /></Field>
            <Field label="Current channel"><input name="m_channel" defaultValue={sp.m_channel ?? ""} placeholder="TheFork, Instagram…" className={inputCls} /></Field>
            <Field label="Personal hook"><input name="m_hook" defaultValue={sp.m_hook ?? ""} className={inputCls} /></Field>
          </div>
        </details>
      </form>

      {draft ? (
        <div className="rounded-lg border border-line bg-surface p-4">
          <IndividualEmailComposer
            action={sendIndividualEmail}
            hiddenFields={draft.hiddenFields}
            toEmail={draft.toEmail}
            fromLabel={fromLabel}
            initialSubject={draft.subject}
            initialBody={draft.body}
          />
        </div>
      ) : (
        <p className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-cream-faint">
          Choose a recipient (or enter a new one) and a template, then Build draft.
        </p>
      )}
    </div>
  );
}

const selectCls =
  "mt-1.5 block w-72 rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none";
const inputCls =
  "mt-1.5 block w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:border-amber-deep focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs text-cream-dim">
      {label}
      {children}
    </label>
  );
}
