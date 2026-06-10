/**
 * Shared class fragments for widget internals. Everything references the
 * --wg-* custom properties set by WidgetFrame so all steps retheme
 * together.
 */
export const WG = {
  heading: "text-sm font-medium [color:var(--wg-text)]",
  hint: "text-xs [color:var(--wg-muted)]",
  chip: "rounded-md border px-3 py-2.5 text-sm transition-colors duration-200 [border-color:var(--wg-line)] [color:var(--wg-text)] hover:[border-color:var(--wg-accent)] focus-visible:[outline-color:var(--wg-accent)]",
  chipSelected:
    "rounded-md border px-3 py-2.5 text-sm transition-colors duration-200 [border-color:var(--wg-accent)] [background:var(--wg-accent)] [color:var(--wg-accent-text)] font-medium",
  chipDisabled:
    "rounded-md border px-3 py-2.5 text-sm [border-color:var(--wg-line)] [color:var(--wg-muted)] line-through opacity-50 cursor-not-allowed",
  primaryButton:
    "w-full rounded-md px-5 py-3 text-sm font-medium transition-opacity duration-200 [background:var(--wg-accent)] [color:var(--wg-accent-text)] hover:opacity-90 disabled:opacity-50",
  backButton:
    "mb-4 inline-flex items-center gap-1 text-xs transition-colors [color:var(--wg-muted)] hover:[color:var(--wg-text)]",
  input:
    "w-full rounded-md border bg-transparent px-3.5 py-2.5 text-sm transition-colors [border-color:var(--wg-line)] [color:var(--wg-text)] placeholder:[color:var(--wg-muted)] focus:[border-color:var(--wg-accent)] focus:outline-none",
} as const;
