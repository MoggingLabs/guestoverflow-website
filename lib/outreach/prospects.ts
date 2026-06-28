/**
 * Prospect field schema + CSV import parsing.
 *
 * A uniform set of fields so every prospect carries what's needed to build a
 * custom cold email. Required fields gate sending; recommended fields enrich
 * personalization. All values are exposed to templates as merge tokens by key
 * (e.g. {{firstName}}, {{business}}, {{city}}, {{channel}}, {{hook}}).
 *
 * Pure module — no Next/server-only imports (used by actions and tests).
 */

export interface ProspectFieldDef {
  key: string;
  label: string;
  required: boolean;
  /** Accepted CSV header variants (compared lowercased/trimmed). */
  aliases: string[];
  hint?: string;
}

export const PROSPECT_FIELDS: ProspectFieldDef[] = [
  { key: "email", label: "Email", required: true, aliases: ["email", "e-mail", "mail", "correio"] },
  { key: "firstName", label: "First name", required: true, aliases: ["first_name", "firstname", "first name", "nome", "primeiro nome", "primeiro_nome"] },
  { key: "business", label: "Business name", required: true, aliases: ["business", "business_name", "business name", "empresa", "negocio", "negócio", "estabelecimento"] },
  { key: "industry", label: "Industry", required: true, aliases: ["industry", "sector", "setor", "indústria", "industria", "tipo", "tipo de negócio"], hint: "Restaurantes | Hotéis | Salões & Barbearias" },
  { key: "city", label: "City", required: false, aliases: ["city", "cidade", "localidade", "local"] },
  { key: "channel", label: "Current booking channel", required: false, aliases: ["channel", "canal", "current_channel", "plataforma"] },
  { key: "hook", label: "Personal note / hook", required: false, aliases: ["hook", "nota", "note", "notes", "observação", "observacoes", "observações", "detalhe"] },
  { key: "website", label: "Website / Instagram", required: false, aliases: ["website", "site", "url", "web", "instagram", "ig"] },
];

export const REQUIRED_KEYS = PROSPECT_FIELDS.filter((f) => f.required).map((f) => f.key);
export const MERGE_KEYS = PROSPECT_FIELDS.map((f) => f.key);
export const INDUSTRY_LABELS = ["Restaurantes", "Hotéis", "Salões & Barbearias"] as const;

/** Example header row shown in the import UI. */
export const SAMPLE_CSV_HEADER = "email,first_name,business,industry,city,channel,hook,website";

const INDUSTRY_PATTERNS: [RegExp, string][] = [
  [/rest|restaur/i, "Restaurantes"],
  [/hot[eé]|hostel|aloj|guest/i, "Hotéis"],
  [/sal[aã]o|salon|barbe|cabelei|hair/i, "Salões & Barbearias"],
];

/** Map a free-text industry to a canonical PT label (template names use these). */
export function normalizeIndustry(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if ((INDUSTRY_LABELS as readonly string[]).includes(v)) return v;
  for (const [re, label] of INDUSTRY_PATTERNS) if (re.test(v)) return label;
  return null;
}

export interface ParsedProspect {
  email: string;
  firstName: string;
  business: string;
  industry: string | null;
  rawIndustry: string;
  /** All non-empty values, keyed by canonical field key. */
  fields: Record<string, string>;
  /** Required keys that are missing/empty/invalid. */
  missing: string[];
}

export interface ParseResult {
  prospects: ParsedProspect[];
  /** Header labels we couldn't map to a known field (ignored on import). */
  unmatchedHeaders: string[];
  error?: string;
}

/** Required fields missing from a stored prospect (gates preview/send). */
export function missingRequired(p: {
  email: string;
  fields?: Record<string, string> | null;
  name?: string | null;
  business_name?: string | null;
}): string[] {
  const f = p.fields ?? {};
  const missing: string[] = [];
  if (!(p.email || "").includes("@")) missing.push("email");
  if (!(f.firstName || p.name)) missing.push("firstName");
  if (!(f.business || p.business_name)) missing.push("business");
  if (!f.industry) missing.push("industry");
  return missing;
}

/** Minimal RFC-4180 CSV → rows of cells (handles quotes, commas, CRLF, "" escapes). */
function parseCsv(text: string): string[][] {
  const s = text.replace(/\r\n?/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { cell += '"'; i++; } else inQuotes = false;
      } else cell += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  row.push(cell);
  rows.push(row);
  // Drop a trailing blank line.
  return rows.filter((r, idx) => !(idx === rows.length - 1 && r.length === 1 && r[0].trim() === ""));
}

function keyForHeader(header: string): string | null {
  const h = header.trim().toLowerCase();
  for (const f of PROSPECT_FIELDS) {
    if (f.key.toLowerCase() === h || f.label.toLowerCase() === h || f.aliases.includes(h)) {
      return f.key;
    }
  }
  return null;
}

export function parseProspectsCsv(text: string): ParseResult {
  const rows = parseCsv(text);
  if (rows.length === 0) return { prospects: [], unmatchedHeaders: [], error: "Empty CSV." };

  const header = rows[0]!;
  const headerMap = header.map(keyForHeader);
  const unmatchedHeaders = header.filter((_, i) => headerMap[i] === null).map((h) => h.trim()).filter(Boolean);

  if (!headerMap.includes("email")) {
    return { prospects: [], unmatchedHeaders, error: "CSV needs at least an 'email' column." };
  }

  const prospects: ParsedProspect[] = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r]!;
    if (cells.every((c) => c.trim() === "")) continue;

    const fields: Record<string, string> = {};
    headerMap.forEach((key, i) => {
      if (!key) return;
      const val = (cells[i] ?? "").trim();
      if (val) fields[key] = val;
    });

    const email = (fields.email ?? "").toLowerCase();
    if (email) fields.email = email;
    const industry = fields.industry ? normalizeIndustry(fields.industry) : null;
    if (industry) fields.industry = industry;
    // `businessName` alias so existing contactMergeVars ({{business}}) lines up.
    if (fields.business) fields.businessName = fields.business;

    const missing: string[] = [];
    if (!email.includes("@")) missing.push("email");
    if (!fields.firstName) missing.push("firstName");
    if (!fields.business) missing.push("business");
    if (!industry) missing.push("industry");

    prospects.push({
      email,
      firstName: fields.firstName ?? "",
      business: fields.business ?? "",
      industry,
      rawIndustry: fields.industry ?? "",
      fields,
      missing,
    });
  }

  return { prospects, unmatchedHeaders };
}
