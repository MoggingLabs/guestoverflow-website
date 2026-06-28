import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplateEditor } from "@/components/admin/TemplateEditor";
import { getDb } from "@/lib/db";
import * as repo from "@/lib/outreach/repo";
import { updateTemplate } from "../../actions";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function TemplateEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!UUID_RE.test(id)) notFound();
  const sql = getDb();
  const tpl = sql ? await repo.getTemplate(sql, id) : null;
  if (!tpl) notFound();

  const industry = tpl.name.split("·")[0]?.trim() ?? "";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/outreach/templates${industry ? `?industry=${encodeURIComponent(industry)}` : ""}`}
          className="text-sm text-cream-faint hover:text-cream"
        >
          ← Templates
        </Link>
        <h2 className="font-display text-lg font-medium text-cream">Edit template</h2>
      </div>

      {sp.saved && (
        <p className="rounded-md border border-emerald-700/50 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
          Saved.
        </p>
      )}
      {sp.error && (
        <p className="rounded-md border border-red-800/50 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {sp.error}
        </p>
      )}

      <div className="rounded-lg border border-line bg-surface p-4">
        <TemplateEditor
          action={updateTemplate.bind(null, id)}
          initialName={tpl.name}
          initialSubject={tpl.subject}
          initialBody={tpl.body_text}
        />
      </div>
    </div>
  );
}
