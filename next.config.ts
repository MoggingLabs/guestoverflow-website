import type { NextConfig } from "next";
import { SECTOR_PATHS } from "./lib/sectors";

// Sector pages moved from their internal slug to a clean public slug
// (e.g. /industries/salons-barbers → /industries/salons). Permanently redirect
// the old paths to preserve any earned SEO. Derived from SECTOR_PATHS, so a
// newly-activated sector whose key differs from its slug gets its redirects for
// free; sectors where key === slug produce nothing.
const sectorRedirects = Object.entries(SECTOR_PATHS)
  .filter(([key, slug]) => key !== slug)
  .flatMap(([key, slug]) => [
    { source: `/industries/${key}`, destination: `/industries/${slug}`, permanent: true },
    { source: `/pricing/${key}`, destination: `/pricing/${slug}`, permanent: true },
  ]);

// Retired public slugs from earlier renames. Keep them as permanent redirects
// so already-indexed URLs keep their SEO equity.
// salons -> salons-barbers (so the URL/breadcrumb names barbers too).
const legacyRedirects = [
  { source: "/industries/salons", destination: "/industries/salons-barbers", permanent: true },
  { source: "/pricing/salons", destination: "/pricing/salons-barbers", permanent: true },
];

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (.next/standalone).
  output: "standalone",
  // Allow the LAN/host IP to load dev resources (HMR, fonts, client chunks)
  // when previewing the dev server from another origin than localhost.
  allowedDevOrigins: ["10.2.0.2"],
  async redirects() {
    return [...sectorRedirects, ...legacyRedirects];
  },
};

export default nextConfig;
