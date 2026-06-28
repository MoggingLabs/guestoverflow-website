import Link from "next/link";
import { notFound } from "next/navigation";
import { ProspectSendButton } from "@/components/admin/ProspectSendButton";
import { getDb } from "@/lib/db";
import { listTemplates } from "@/lib/outreach/admin";
import { buildProspectEmail } from "@/lib/outreach/prospect-email";
import { missingRequired } from "@/lib/outreach/prospects";
import * as repo from "@/lib/outreach/repo";
import { sendProspectEmail } from "../../../actions";

export const dynamic = "force-dynamic";

const INDUSTRIES = ["Restaurantes", "Hotéis", "Salões & Barbearias"];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ProspectPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string }>;
}) {
  const [{ id }, { template }] = await Promise.all([params, searchParams]);
  if (!UUID_RE.test(id)) notFound();
  const sql = getDb();
  const contact = sql ? await repo.getContact(sql, id) : null;
  if (!contact) notFound();

  const templateId = template || null;
  const [built, templates] = await Promise.all([
    buildProspectEmail(sql!, contact, templateId),
    listTemplates(),
  ]);
  const missing = missingRequired(contact);
  const blocked = Boolean(contact.unsubscribed_at);
  const canSend = built.ok && missing.length === 0 && !blocked;

  // Group templates for the picker.
  const groups = INDUSTRIES.map((industry) => ({
    industry,
    items: templates.filter((t) => t.name.startsWith(`${industry} ·`)),
  })).filter((g) => g.items.length > 0);
  const otherTemplates = templates.filter(
    (t) => !INDUSTRIES.some((i) => t.name.startsWith(`${i} ·`)),
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/outreach/prospects" className="text-sm text-cream-faint hover:text-cream">
          ← Prospects
        </Link>
        <h2 className="font-display text-lg font-medium text-cream">
          Preview · {contact.business_name ?? contact.email}
        </h2>
      </div>

      {missing.length > 0 && (
        <p className="rounded-md border border-amber-deep/50 bg-amber/10 px-4 py-2.5 text-xs text-amber">
          Missing required field(s): {missing.join(", ")}. Fill these (re-import the
          CSV) before sending.
        </p>
      )}
      {blocked && (
        <p className="rounded-md border border-amber-deep/50 bg-amber/10 px-4 py-2.5 text-xs text-amber">
          This address is unsubscribed — sending is disabled.
        </p>
      )}

      {/* Template picker + send */}
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-lg border border-line bg-surface p-4">
        <form method="get" className="flex items-end gap-2">
          <label className="block text-xs text-cream-dim">
            Template
            <select
              name="template"
              defaultValue={templateId ?? ""}
              className="mt-1.5 block w-72 rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
            >
              <option value="">Auto — {String(contact.fields?.industry ?? "industry")} intro</option>
              {groups.map((g) => (
                <optgroup key={g.industry} label={g.industry}>
                  {g.items.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name.replace(/^[^·]*·\s*/, "")}
                    </option>
                  ))}
                </optgroup>
              ))}
              {otherTemplates.length > 0 && (
                <optgroup label="Outros">
                  {otherTemplates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md border border-line bg-surface px-3 py-2 text-sm text-cream-dim hover:text-cream"
          >
            Update preview
          </button>
        </form>

        <ProspectSendButton
          action={sendProspectEmail.bind(null, id, templateId)}
          confirmText={`Send this cold email to ${contact.email}?`}
          label="Send Prospect Email"
          disabled={!canSend}
        />
      </div>

      {/* Rendered email */}
      {built.ok ? (
        <div className="space-y-3">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
            <Meta label="To" value={contact.email} />
            <Meta label="Subject" value={built.subject!} className="col-span-2" />
            <Meta label="Template" value={built.templateName!} />
          </dl>
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <iframe
              title="Email preview"
              sandbox=""
              srcDoc={built.html!}
              className="h-[560px] w-full border-0"
            />
          </div>
          <details className="rounded-lg border border-line bg-raised p-3 text-sm text-cream-dim">
            <summary className="cursor-pointer text-cream-faint">Plain-text version</summary>
            <pre className="mt-2 whitespace-pre-wrap">{built.text}</pre>
          </details>
        </div>
      ) : (
        <p className="rounded-lg border border-line bg-surface p-4 text-sm text-cream-faint">
          {built.reason}
        </p>
      )}
    </div>
  );
}

function Meta({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs uppercase tracking-wider text-cream-faint">{label}</dt>
      <dd className="mt-0.5 break-words text-cream">{value}</dd>
    </div>
  );
}
