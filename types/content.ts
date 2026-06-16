export type NavLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Differentiator = {
  title: string;
  body: string;
  icon: IconName;
};

export type HowItWorksStep = {
  title: string;
  body: string;
};

export type Feature = {
  title: string;
  body: string;
  icon: IconName;
};

export type IndustryContent = {
  slug: string;
  /** Short label used in cards and nav ("Restaurants"). */
  label: string;
  /** Which widget venue theme this vertical demos. */
  themeId: VenueThemeId;
  icon: IconName;
  cardBlurb: string;
  hero: { headline: string; subhead: string };
  painPoints: { title: string; body: string }[];
  highlights: { title: string; body: string }[];
  metaDescription: string;
  /** Per-sector published pricing (PT-calibrated). Drives /pricing/[sector]. */
  pricing: SectorPricing;
};

export type PricingTier = {
  name: string;
  /** Monthly price in euros; null renders the custom tier. */
  monthlyEur: number | null;
  /** For the custom tier: a published "from €X/mo" starting price. */
  fromEur?: number;
  priceNote: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

/** An optional, transparently-priced add-on shown beneath a sector's tiers. */
export type PricingAddOn = {
  name: string;
  /** e.g. "from €0.09 / SMS" — kept honest, never a per-booking surcharge. */
  priceNote: string;
  /** What's bundled before overage, e.g. "100 SMS/mo included on Premium". */
  included?: string;
};

/** Per-sector pricing content; reuses PricingTier, authored per locale. */
export type SectorPricing = {
  hero: { eyebrow: string; headline: string; subhead: string };
  tiers: PricingTier[];
  /** Localized value-unit noun for copy/calculator ("cover", "treatment"…). */
  valueUnit: string;
  /** Sector-framed "what commission really costs" block. */
  comparison: { title: string; body: string };
  /** Optional metered add-ons (e.g. SMS reminders). */
  addOns?: PricingAddOn[];
};

export type VenueThemeId = "fine-dining" | "hotel" | "spa" | "wine-bar" | "salon";

export type VenueTheme = {
  id: VenueThemeId;
  /** Pill label in the theme switcher ("Fine dining"). */
  label: string;
  venueName: string;
  tagline: string;
  /** What a "party" is called for this venue type. */
  unitLabel: string;
  unitOptions: number[];
  ctaLabel: string;
  confirmationNote: string;
  colors: {
    bg: string;
    surface: string;
    accent: string;
    accentText: string;
    text: string;
    muted: string;
    line: string;
  };
  slots: { open: number; close: number; intervalMin: number };
};

export type IconName =
  | "fork"
  | "bed"
  | "leaf"
  | "compass"
  | "scissors"
  | "brand"
  | "commission"
  | "data"
  | "concierge"
  | "calendar"
  | "bell"
  | "chart"
  | "shield"
  | "widget"
  | "clock";
