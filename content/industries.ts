import type { IndustryContent } from "@/types/content";

export const industries: IndustryContent[] = [
  {
    slug: "restaurants",
    label: "Restaurants",
    themeId: "fine-dining",
    icon: "fork",
    cardBlurb:
      "Table reservations that feel like an extension of your dining room — not a marketplace tab.",
    hero: {
      headline: "Your tables. Your guests. Your terms.",
      subhead:
        "GuestFlow gives restaurants a reservation flow that lives on their own website, carries their brand, and never charges per cover.",
    },
    painPoints: [
      {
        title: "Marketplaces compete for your diners",
        body: "Booking platforms list you next to your competitors and upsell your guests someone else's table.",
      },
      {
        title: "Per-cover fees scale against you",
        body: "Commission models mean your busiest service is your most expensive. Full books shouldn't cost extra.",
      },
      {
        title: "No-shows burn prime slots",
        body: "Without deposits and smart reminders, Friday eight-tops vanish into thin air.",
      },
    ],
    highlights: [
      {
        title: "Table & turn management",
        body: "Slot lengths per party size, pacing controls, and dining-room capacity that mirrors how you actually seat.",
      },
      {
        title: "Deposits & card guarantees",
        body: "Protect prime-time covers with deposits or card holds for large parties and special menus.",
      },
      {
        title: "Guest book you own",
        body: "Regulars, allergies, anniversaries — your guest intelligence stays in your hands, exportable any day.",
      },
    ],
    metaDescription:
      "White-label restaurant reservations on your own website. No per-cover commission, deposits for no-show protection, and a guest book you own.",
  },
  {
    slug: "hotels",
    label: "Hotels",
    themeId: "hotel",
    icon: "bed",
    cardBlurb:
      "Direct bookings for boutique hotels — keep the OTA commission and own the guest relationship.",
    hero: {
      headline: "Make direct booking the obvious choice.",
      subhead:
        "Boutique hotels lose 15–25% of every OTA stay. GuestFlow puts a beautiful, brand-true booking flow on your own site so guests book direct.",
    },
    painPoints: [
      {
        title: "OTAs take a fifth of every stay",
        body: "Online travel agencies charge commissions that dwarf any software cost — and they own the guest's email forever.",
      },
      {
        title: "Clunky booking engines kill conversion",
        body: "Generic hotel booking engines feel like airline checkouts. Guests bounce back to the OTA tab.",
      },
      {
        title: "No relationship before arrival",
        body: "When the OTA owns the booking, your first real contact with a guest is at the front desk.",
      },
    ],
    highlights: [
      {
        title: "Room & rate aware",
        body: "Room types, occupancy rules, and seasonal rates presented in a flow that feels like your hotel, not a portal.",
      },
      {
        title: "Direct-booking incentives",
        body: "Surface member rates, perks, or packages that make booking direct visibly better than the OTA price.",
      },
      {
        title: "Pre-arrival guest profile",
        body: "Preferences and special requests collected at booking, so the welcome starts before check-in.",
      },
    ],
    metaDescription:
      "Direct hotel bookings on your own website. A brand-true booking flow that beats OTA commissions and keeps the guest relationship yours.",
  },
  {
    slug: "spas-wellness",
    label: "Spas & wellness",
    themeId: "spa",
    icon: "leaf",
    cardBlurb:
      "Treatment bookings as calm as your space — services, practitioners, and schedules handled gracefully.",
    hero: {
      headline: "Booking as serene as the treatment.",
      subhead:
        "Spas and wellness studios get a booking flow that matches the calm of their brand — services, durations, and practitioner schedules without the friction.",
    },
    painPoints: [
      {
        title: "Phone tag fills your front desk",
        body: "Every booking taken by phone is staff time lost — and an after-hours enquiry missed entirely.",
      },
      {
        title: "Generic salon software, generic feel",
        body: "Mass-market booking tools look like spreadsheets. Your booking page should feel like your space.",
      },
      {
        title: "Late cancellations leave empty rooms",
        body: "Treatment rooms and practitioner hours are perishable. Unprotected slots expire worthless.",
      },
    ],
    highlights: [
      {
        title: "Service & practitioner logic",
        body: "Durations, prep time, and per-practitioner availability handled cleanly under a serene surface.",
      },
      {
        title: "Cancellation protection",
        body: "Deposits and tiered cancellation windows keep your treatment rooms earning.",
      },
      {
        title: "Intake built into booking",
        body: "Collect preferences and health notes at booking time — clients arrive ready, sessions start on time.",
      },
    ],
    metaDescription:
      "White-label spa and wellness booking on your own website. Services, practitioners, deposits, and intake — in a flow as calm as your brand.",
  },
  {
    slug: "tours-experiences",
    label: "Tours & experiences",
    themeId: "wine-bar",
    icon: "compass",
    cardBlurb:
      "Tastings, tours, and events with capacity-aware scheduling and direct ticket sales.",
    hero: {
      headline: "Sell out departures from your own site.",
      subhead:
        "Wineries, tour operators, and experience hosts get capacity-aware scheduling and direct sales — without marketplace commissions eating the margin.",
    },
    painPoints: [
      {
        title: "Marketplaces take 20–30% per ticket",
        body: "Experience platforms charge steep commissions and own the customer for the next trip too.",
      },
      {
        title: "Capacity chaos across channels",
        body: "Selling the same departure in three places means overbooking or, worse, half-empty sessions.",
      },
      {
        title: "Group bookings handled by email",
        body: "Private tastings and group tours negotiated over email threads leak revenue and time.",
      },
    ],
    highlights: [
      {
        title: "Capacity-aware sessions",
        body: "Fixed departures with live seat counts — scarcity shown honestly, overbooking impossible.",
      },
      {
        title: "Direct payment, no commission",
        body: "Tickets and tastings sold on your site at flat cost, whatever your volume.",
      },
      {
        title: "Private & group requests",
        body: "Structured enquiry flow for buyouts and groups, so big-ticket bookings stop living in your inbox.",
      },
    ],
    metaDescription:
      "Direct booking for tours, tastings, and experiences on your own website. Capacity-aware sessions without marketplace commissions.",
  },
];

export function getIndustry(slug: string): IndustryContent | undefined {
  return industries.find((i) => i.slug === slug);
}

export const industriesIndex = {
  eyebrow: "Industries",
  title: "Built for the way you host.",
  subhead:
    "One booking engine, shaped to the rhythm of your business. Pick your world — the demo on each page is themed to match.",
};
