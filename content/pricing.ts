import type { PricingTier } from "@/types/content";

export const pricingHero = {
  eyebrow: "Pricing",
  headline: "Flat pricing. No per-cover commission.",
  subhead:
    "Whatever your volume, your price doesn't move. Final quotes depend on your setup, so every plan below starts with a demo.",
};

// Placeholder price points — confirm real numbers before launch.
export const tiers: PricingTier[] = [
  {
    name: "Essential",
    monthlyEur: 99,
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
    monthlyEur: 249,
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
    monthlyEur: null,
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

export const billingToggle = {
  monthlyLabel: "Monthly",
  annualLabel: "Annual",
  annualBadge: "a third off",
  annualNote: "billed annually",
};

export const comparison = {
  title: "What commission really costs",
  body: "A restaurant seating 1,000 covers a month at €2–3 commission per cover pays €24,000–36,000 a year, for a booking page that isn't even theirs. GuestFlow replaces that with a flat subscription that stays the same even in your busiest month.",
};

export const foundingPartner = {
  badge: "Founding offer",
  title: "Three months at half price, and a clean way out",
  body: "Join as a founding venue and pay half price for your first three months. If you don't see real return or real usage through your website or your Google Business Profile in that time, you can end the relationship cleanly. No questions asked, no exit fees, and everything stays good between us. We only want clients who are genuinely winning with this.",
  cta: "Claim the founding offer",
};

export const noWebsiteOffer = {
  eyebrow: "No website yet?",
  title: "Start with your Google Business Profile",
  body: "If you don't have a website, we begin by optimizing your Google Business Profile so people can actually find and book you. When you're ready for more, we design and build a full website with booking built in. That's our higher-level offering, and there's no pressure to get there on day one.",
  points: [
    "Google Business Profile optimization as the affordable starting point",
    "Bookings working without a website of your own",
    "A full custom website with built-in booking when you're ready to level up",
  ],
};

export const transparency = {
  eyebrow: "How we work",
  title: "Complete transparency, in writing",
  body: "We measure everything together. Every month you see exactly what came through your website or your Google profile, what we changed, and whether it worked. If the numbers don't justify the relationship after the three-month pilot, ending it takes one sentence in an email. No questions, no hard feelings.",
};
