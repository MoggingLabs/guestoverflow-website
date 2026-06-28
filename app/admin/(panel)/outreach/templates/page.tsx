import { AdminInput, AdminSubmit, AdminTextarea } from "@/components/admin/AdminField";
import { listTemplates, type TemplateListItem } from "@/lib/outreach/admin";
import { createTemplate } from "../actions";

export const dynamic = "force-dynamic";

// Templates are named "Indústria · N. Título"; group by that prefix.
const INDUSTRY_ORDER = ["Restaurantes", "Hotéis", "Salões & Barbearias"] as const;
const OTHER = "Outros";

function industryOf(name: string): string {
  const prefix = name.split("·")[0]?.trim() ?? "";
  return (INDUSTRY_ORDER as readonly string[]).includes(prefix) ? prefix : OTHER;
}

function stripPrefix(name: string, industry: string): string {
  return industry === OTHER ? name : name.replace(/^[^·]*·\s*/, "");
}

export default async function OutreachTemplatesPage() {
  const templates = await listTemplates();

  const groups = new Map<string, TemplateListItem[]>();
  for (const t of templates) {
    const key = industryOf(t.name);
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(t);
  }
  const orderedKeys = [...INDUSTRY_ORDER, OTHER].filter((k) => groups.has(k));

  return (
    <div className="space-y-6">
      <form
        action={createTemplate}
        className="space-y-3 rounded-lg border border-line bg-surface p-4"
      >
        <p className="text-sm font-medium text-cream">New template</p>
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
          label="Body — plain text. Merge fields: {{firstName}}, {{business}}."
          name="body_text"
          placeholder={"Olá {{firstName}},\n\n…"}
          required
        />
        <p className="text-xs text-cream-faint">
          An unsubscribe footer is added automatically. HTML is generated from the
          text unless you provide your own below.
        </p>
        <AdminTextarea label="Body — custom HTML (optional)" name="body_html" placeholder="<p>Olá {{firstName}}…</p>" />
        <AdminSubmit>Save template</AdminSubmit>
      </form>

      {templates.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface p-8 text-center text-sm text-cream-faint">
          No templates yet. Create one above — a campaign step needs a template.
        </div>
      ) : (
        <div className="space-y-6">
          {orderedKeys.map((industry) => {
            const items = groups.get(industry)!;
            return (
              <section key={industry} className="space-y-2">
                <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-cream-faint">
                  {industry}
                  <span className="rounded-full bg-raised px-2 py-0.5 text-[11px] text-cream-faint">
                    {items.length}
                  </span>
                </h2>
                <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
                  <ul className="divide-y divide-line">
                    {items.map((t) => (
                      <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-cream">{stripPrefix(t.name, industry)}</p>
                          <p className="truncate text-xs text-cream-faint">{t.subject}</p>
                        </div>
                        <code className="shrink-0 text-[11px] text-cream-faint">{t.id.slice(0, 8)}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
