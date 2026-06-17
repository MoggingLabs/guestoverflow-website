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
