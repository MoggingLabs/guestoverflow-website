import type { PricingTier } from "@/types/content";

export const pricingHero = {
  eyebrow: "Pricing",
  headline: "Flat pricing. No per-cover commission.",
  subhead:
    "Whatever your volume, your price doesn't move. Final quotes depend on your setup — every plan below starts with a demo.",
};

// Placeholder price points — confirm real numbers before launch.
export const tiers: PricingTier[] = [
  {
    name: "Essential",
    price: "from €99/mo",
    priceNote: "For a single venue getting started",
    blurb: "The branded booking widget on your site, with the core toolkit.",
    features: [
      "White-label booking widget on your website",
      "Real-time availability & capacity management",
      "Branded confirmations & reminders",
      "Guest list with full export",
      "Email support",
    ],
  },
  {
    name: "Premium",
    price: "from €249/mo",
    priceNote: "For venues that live on bookings",
    blurb: "Everything in Essential, plus protection and intelligence.",
    featured: true,
    features: [
      "Everything in Essential",
      "Deposits, card guarantees & no-show protection",
      "Booking analytics & demand insights",
      "Custom flow design (multi-service, practitioners, sessions)",
      "Concierge setup included",
      "Priority support",
    ],
  },
  {
    name: "Custom",
    price: "Let's talk",
    priceNote: "Groups & multi-location",
    blurb: "Multiple venues, custom integrations, or something we haven't thought of yet.",
    features: [
      "Everything in Premium",
      "Multi-location dashboard",
      "Custom integrations (PMS, POS, CRM)",
      "Dedicated account manager",
    ],
  },
];

export const comparison = {
  title: "What commission really costs",
  body: "A restaurant seating 1,000 covers a month at €2–3 commission per cover pays €24,000–36,000 a year — for a booking page that isn't even theirs. GuestFlow replaces that with a flat subscription that stays flat on your busiest month of the year.",
};

export const foundingPartner = {
  badge: "Founding partner offer",
  title: "Be one of the first venues on GuestFlow",
  body: "Our first cohort of venues gets hands-on onboarding directly with the founding team and pricing locked for two years. In exchange, we ask for honest feedback as we shape the roadmap.",
  cta: "Claim a founding spot",
};
