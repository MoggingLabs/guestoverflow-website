import "server-only";
import { cookies, headers } from "next/headers";
import type { Locale } from "@/lib/i18n-shared";

export type { Locale };

export const LOCALE_COOKIE = "gf_locale";

/**
 * Server-side locale. An explicit choice from the language toggle (the
 * `gf_locale` cookie) always wins. With no cookie we fall back to the visitor's
 * Accept-Language header.
 *
 * The market is Portugal-only, so the default is Portuguese: a visitor (or
 * crawler) with no clear language preference lands in PT. Crucially, search
 * crawlers like Googlebot send no Accept-Language, so this is what makes Google
 * index the Portuguese content. Only an explicit English preference that
 * outranks Portuguese yields English.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const chosen = store.get(LOCALE_COOKIE)?.value;
  if (chosen === "pt" || chosen === "en") return chosen;

  const accept = (await headers()).get("accept-language") ?? "";
  return prefersEnglish(accept) ? "en" : "pt";
}

/** Whether English strictly outranks Portuguese in an Accept-Language header. */
function prefersEnglish(accept: string): boolean {
  let ptQ = -1;
  let enQ = -1;
  for (const part of accept.toLowerCase().split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const lang = tag.trim();
    if (!lang) continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
    const weight = Number.isFinite(q) ? q : 0;
    if (lang.startsWith("pt")) ptQ = Math.max(ptQ, weight);
    else if (lang.startsWith("en")) enQ = Math.max(enQ, weight);
  }
  return enQ > ptQ;
}
