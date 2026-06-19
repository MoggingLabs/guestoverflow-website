/**
 * Active-vertical allowlist — the single lever for which verticals are live.
 *
 * We go to market one vertical at a time. Every sector-bearing surface (nav,
 * footer, industry hub, /industries/[slug], /pricing/[sector], competitor
 * compares, the cost calculator, the sitemap) is gated through `isActiveSector`.
 * All other verticals' content stays in the content files, stashed — they are
 * simply filtered out of the output.
 *
 * To STASH a vertical: remove its slug from `ACTIVE_SECTORS`.
 * To RESTORE a vertical: add its slug back (order controls display order), then
 * un-narrow that vertical's share of the shared marketing copy.
 */
export const ACTIVE_SECTORS = ["salons-barbers"] as const;

export type Sector =
  | "restaurants"
  | "hotels"
  | "spas-wellness"
  | "salons-barbers"
  | "tours-experiences";

export function isActiveSector(slug: string): boolean {
  return (ACTIVE_SECTORS as readonly string[]).includes(slug);
}

/**
 * Public, SEO-facing URL slug per sector.
 *
 * The internal key (the `Sector` union above) is immutable — it drives every
 * data lookup and the calculator math (`?sector=` deep-links stay keyed on it).
 * The public slug is what appears in crawlable paths (`/industries/{slug}`,
 * `/pricing/{slug}`). The two are decoupled on purpose: we can ship a clean
 * `/industries/salons` without renaming `salons-barbers` across the content,
 * pricing, competitor and widget-theme files.
 *
 * Convention: a single short noun, plural where natural. New sectors that
 * already read well (restaurants, hotels) map their key to itself.
 */
export const SECTOR_PATHS: Record<Sector, string> = {
  restaurants: "restaurants",
  hotels: "hotels",
  "spas-wellness": "spas",
  "salons-barbers": "salons",
  "tours-experiences": "tours",
};

/** Reserved path segments a sector slug may never take (would shadow a static
 *  route under /industries or /pricing). */
const RESERVED_SLUGS = new Set(["calculator"]);

// Fail the build — not a silent 404 — if two sectors share a public slug or a
// slug collides with a reserved static sibling.
const seenSlugs = new Set<string>();
for (const [key, slug] of Object.entries(SECTOR_PATHS)) {
  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(`Sector "${key}" uses a reserved public slug: "${slug}".`);
  }
  if (seenSlugs.has(slug)) {
    throw new Error(`Duplicate sector public slug: "${slug}".`);
  }
  seenSlugs.add(slug);
}

const KEY_BY_PATH: Record<string, Sector> = Object.fromEntries(
  (Object.entries(SECTOR_PATHS) as [Sector, string][]).map(([key, slug]) => [
    slug,
    key,
  ]),
);

/** Internal key → public URL slug. Falls back to the input for safety. */
export function publicSlugFor(sector: string): string {
  return SECTOR_PATHS[sector as Sector] ?? sector;
}

/** Public URL slug → internal key, or `undefined` if it isn't a known sector. */
export function sectorForPublicSlug(slug: string): Sector | undefined {
  return KEY_BY_PATH[slug];
}
