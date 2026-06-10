import type { Feature } from "@/types/content";

export const productHero = {
  eyebrow: "Product",
  headline: "Everything booking should do. Nothing it shouldn't.",
  subhead:
    "GuestFlow handles the full reservation lifecycle — from the moment a guest lands on your site to the moment they walk back in for the third time.",
};

export const features: Feature[] = [
  {
    icon: "widget",
    title: "A widget that wears your brand",
    body: "Typography, colors, copy, and flow tailored to your venue. Guests book without ever leaving your site — or realizing software was involved.",
  },
  {
    icon: "calendar",
    title: "Real-time availability",
    body: "Slots, capacity, pacing, and blackout dates managed in one dashboard, reflected on your site instantly.",
  },
  {
    icon: "data",
    title: "Guest CRM & export",
    body: "Every booking builds your guest book: visits, preferences, notes. Yours to keep and export — never ours to monetize.",
  },
  {
    icon: "shield",
    title: "Deposits & no-show protection",
    body: "Card guarantees and deposits for the bookings that hurt most to lose, with policies you control per service and party size.",
  },
  {
    icon: "bell",
    title: "Confirmations & reminders",
    body: "Branded email confirmations and perfectly-timed reminders that cut no-shows without you lifting a finger.",
  },
  {
    icon: "chart",
    title: "Booking analytics",
    body: "See where bookings come from, when demand peaks, and which slots underperform — decisions backed by your own data.",
  },
];

export const ownYourData = {
  eyebrow: "The principle",
  title: "Your guest list is the business. We never touch it.",
  body: "Marketplace platforms built billion-dollar businesses on data that restaurants and hotels generated. GuestFlow is structured so that can't happen here: your bookings and your guests live in your account, exportable in full at any time. We charge for software — not for access to your relationships.",
  points: [
    "Full data export, any time, no questions",
    "No marketing to your guests, ever",
    "No cross-venue marketplace — your guests see only you",
  ],
};
