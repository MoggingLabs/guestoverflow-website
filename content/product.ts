import type { Feature } from "@/types/content";

export const productHero = {
  eyebrow: "Product",
  headline: "Everything you need to take bookings on your own website.",
  subhead:
    "GuestFlow handles the whole reservation journey, from the moment a guest lands on your site to the moment they come back to book again.",
};

export const features: Feature[] = [
  {
    icon: "widget",
    title: "A widget that wears your brand",
    body: "Typography, colors, copy, and flow are all tailored to your venue, so guests book without ever leaving your site.",
  },
  {
    icon: "calendar",
    title: "Real-time availability",
    body: "Slots, capacity, pacing, and blackout dates managed in one dashboard, reflected on your site instantly.",
  },
  {
    icon: "data",
    title: "Guest CRM & export",
    body: "Every booking builds your guest book with visits, preferences, and notes. It's yours to keep and export, and we never use it for anything else.",
  },
  {
    icon: "shield",
    title: "Deposits & no-show protection",
    body: "Card guarantees and deposits for the bookings that hurt most to lose, with policies you control per service and party size.",
  },
  {
    icon: "bell",
    title: "Confirmations & reminders",
    body: "Branded confirmation emails and well-timed reminders go out automatically, which makes a real dent in no-shows.",
  },
  {
    icon: "chart",
    title: "Booking analytics",
    body: "See where bookings come from, when demand peaks, and which slots underperform, so your decisions are backed by your own numbers.",
  },
];

export const ownYourData = {
  eyebrow: "The principle",
  title: "Your guest data is yours, and it stays that way.",
  body: "Marketplace platforms built very large businesses on data that restaurants and hotels generated for them. GuestFlow is set up so that can't happen here: your bookings and your guests live in your account, and you can export everything at any time. We charge for the software, nothing more.",
  points: [
    "Full data export, any time, no questions",
    "No marketing to your guests, ever",
    "No cross-venue marketplace, so your guests only ever see you",
  ],
};
