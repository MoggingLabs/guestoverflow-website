"use client";

/**
 * First-party analytics runtime. Mounted only in the (site) layout so
 * admin pages emit nothing. Placeholder — the full tracking pipeline
 * (page views, engagement, friction listeners, batching) lands with the
 * /api/t ingest route.
 */
export function AnalyticsProvider() {
  return null;
}
