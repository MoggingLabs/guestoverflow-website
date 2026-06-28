import Link from "next/link";
import { AdminInput, AdminSubmit, AdminTextarea } from "@/components/admin/AdminField";
import { listTemplates, type TemplateListItem } from "@/lib/outreach/admin";
import { cn } from "@/lib/utils";
import { createTemplate } from "../actions";

export const dynamic = "force-dynamic";

const INDUSTRY_ORDER = ["Restaurantes", "Hotéis", "Salões & Barbearias"] as const;
const OTHER = "Outros";

function industryOf(name: string): string {
  const prefix = name.split("·")[0]?.trim() ?? "";
  return (INDUSTRY_ORDER as readonly string[]).includes(prefix) ? prefix : OTHER;
}
function stripPrefix(name: string, industry: string): string {
  return industry === OTHER ? name : name.replace(/^[^·]*·\s*/, "");
}

export default async function OutreachTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const [templates, sp] = await Promise.all([listTemplates(), searchParams]);

  const groups = new Map<string, TemplateListItem[]>();
  for (const t of templates) {
    const key = industryOf(t.name);
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(t);
  }
  const tabs = [...INDUSTRY_ORDER, OTHER].filter((k) => groups.has(k));
  const active = sp.industry && groups.has(sp.industry) ? sp.industry : tabs[0];
  const items = active ? groups.get(active) ?? [] : [];

  return (
    <div className="space-y-5">
      {/* Industry sub-tabs */}
      {tabs.length > 0 && (
        <nav className="flex flex-wrap gap-1 border-b border-line">
          {tabs.map((t) => (
            <Link
              key={t}
              href={`/admin/outreach/templates?industry=${encodeURIComponent(t)}`}
              className={cn(
                "-mb-px flex items-center gap-2 border-b-2 px-4 py-2 text-sm transition-colors",
                t === active
                  ? "border-amber text-cream"
                  : "border-transparent text-cream-faint hover:text-cream",
              )}
            >
              {t}
              <span className="rounded-full bg-raised px-1.5 text-[11px] text-cream-faint">
                {groups.get(t)!.length}
              </span>
            </Link>
          ))}
        </nav>
      )}

      {/* Templates for the selected industry */}
      {tabs.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-cream-faint">
          No templates yet. Create one below.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
          <ul className="divide-y divide-line">
            {items.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/admin/outreach/templates/${t.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-raised/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-cream">{stripPrefix(t.name, active!)}</p>
                    <p className="truncate text-xs text-cream-faint">{t.subject}</p>
                  </div>
                  <span className="shrink-0 text-xs text-amber">Edit / preview →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Create a new template */}
      <details className="rounded-lg border border-line bg-surface p-4">
        <summary className="cursor-pointer text-sm font-medium text-cream">+ New template</summary>
        <form action={createTemplate} className="mt-3 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AdminInput
              label="Name — prefix with an industry to group it (e.g. Restaurantes · …)"
              name="name"
              placeholder="Restaurantes · 6. Reativação"
              required
            />
            <AdminInput label="Subject" name="subject" placeholder="Uma ideia para o {{business}}" required />
          </div>
          <AdminTextarea
            label="Body — plain text. Merge fields: {{firstName}}, {{business}}, {{city}}, {{channel}}, {{hook}}."
            name="body_text"
            placeholder={"Olá {{firstName}},\n\n…"}
            required
          />
          <p className="text-xs text-cream-faint">
            HTML is generated from the text and an unsubscribe footer is added.
            After creating, open it to preview and fine-tune.
          </p>
          <AdminSubmit>Save template</AdminSubmit>
        </form>
      </details>
    </div>
  );
}
