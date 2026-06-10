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
};

export type PricingTier = {
  name: string;
  /** Monthly price in euros; null renders the custom "Let's talk" tier. */
  monthlyEur: number | null;
  priceNote: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type VenueThemeId = "fine-dining" | "hotel" | "spa" | "wine-bar";

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
