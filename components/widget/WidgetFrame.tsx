"use client";

import type { ReactNode } from "react";
import type { VenueTheme } from "@/types/content";

/**
 * The white-label shell. Every color inside the widget comes from CSS
 * custom properties set here, so swapping the venue theme retints the
 * whole experience — the core of the product demonstration.
 */
export function WidgetFrame({
  theme,
  children,
}: {
  theme: VenueTheme;
  children: ReactNode;
}) {
  return (
    <div
      style={
        {
          "--wg-bg": theme.colors.bg,
          "--wg-surface": theme.colors.surface,
          "--wg-accent": theme.colors.accent,
          "--wg-accent-text": theme.colors.accentText,
          "--wg-text": theme.colors.text,
          "--wg-muted": theme.colors.muted,
          "--wg-line": theme.colors.line,
        } as React.CSSProperties
      }
      className="overflow-hidden rounded-xl border shadow-card transition-colors duration-300 [background:var(--wg-bg)] [border-color:var(--wg-line)]"
    >
      <div className="border-b px-6 py-5 transition-colors duration-300 [border-color:var(--wg-line)]">
        <p className="font-display text-xl font-medium transition-colors duration-300 [color:var(--wg-text)]">
          {theme.venueName}
        </p>
        <p className="mt-0.5 text-xs transition-colors duration-300 [color:var(--wg-muted)]">
          {theme.tagline}
        </p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
