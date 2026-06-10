type AnalyticsEvent =
  | "demo_form_submitted"
  | "widget_completed"
  | "widget_theme_changed"
  | "cta_clicked";

/**
 * Thin event wrapper so instrumentation calls don't change when a real
 * analytics provider (Plausible, GA, PostHog…) is wired in later.
 * Vercel Analytics page views are handled separately in the root layout.
 */
export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number>,
): void {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, props ?? {});
  }
}
