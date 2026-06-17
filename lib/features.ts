/**
 * Feature flags for surfaces stashed for a future addition.
 *
 * Each flag gates every place a feature renders or is linked. Flip a flag to
 * `true` to restore the feature everywhere at once.
 *
 * Typed as `boolean` (not the literal) so call sites are not treated as
 * statically dead while a feature is off.
 */

/** The interactive booking demo (WidgetShowcase). Off until we have a live one. */
export const SHOW_LIVE_DEMO: boolean = false;

/** The savings / cost-of-commission calculator (CostCalculator). */
export const SHOW_CALCULATOR: boolean = false;
