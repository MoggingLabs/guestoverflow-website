import type { IndustryContent } from "@/types/content";

export const industries: IndustryContent[] = [
  {
    slug: "restaurants",
    label: "Restaurants",
    themeId: "fine-dining",
    icon: "fork",
    cardBlurb:
      "Table reservations that feel like a natural part of your dining room, not a marketplace tab.",
    hero: {
      headline: "Take reservations on your own website.",
      subhead:
        "GuestFlow gives restaurants a reservation flow that lives on their own site, carries their brand, and never charges per cover.",
    },
    painPoints: [
      {
        title: "Marketplaces compete for your diners",
        body: "Booking platforms list you right next to your competitors, and they're happy to nudge your guests toward someone else's table.",
      },
      {
        title: "Per-cover fees scale against you",
        body: "With commission pricing, a fully booked night is also your most expensive one. The fees quietly eat into your best services.",
      },
      {
        title: "No-shows burn prime slots",
        body: "Without deposits and well-timed reminders, a no-show on a Friday eight-top is revenue you simply never get back.",
      },
    ],
    highlights: [
      {
        title: "Table & turn management",
        body: "Slot lengths per party size, pacing controls, and dining-room capacity that match how you actually seat guests.",
      },
      {
        title: "Deposits & card guarantees",
        body: "Protect prime-time covers with deposits or card holds for large parties and special menus.",
      },
      {
        title: "A guest book you own",
        body: "Regulars, allergies, anniversaries. It all stays in your hands, and you can export it whenever you like.",
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
      "Direct bookings for boutique hotels, so you keep the OTA commission and own the guest relationship.",
    hero: {
      headline: "Make direct booking the obvious choice.",
      subhead:
        "Boutique hotels lose 15–25% of every OTA stay. GuestFlow puts a beautiful, brand-true booking flow on your own site so guests book direct.",
    },
    painPoints: [
      {
        title: "OTAs take a fifth of every stay",
        body: "Online travel agencies charge commissions that dwarf any software cost, and they keep the guest's email forever.",
      },
      {
        title: "Clunky booking engines lose guests",
        body: "Most hotel booking engines feel like airline checkouts, so guests give up halfway and book through the OTA instead.",
      },
      {
        title: "No relationship before arrival",
        body: "When the OTA owns the booking, your first real contact with a guest happens at the front desk.",
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
      "Treatment bookings that feel as calm as your space, with services, practitioners, and schedules handled gracefully.",
    hero: {
      headline: "A booking experience as calm as your space.",
      subhead:
        "Spas and wellness studios get a booking flow that matches the feel of their brand, with services, durations, and practitioner schedules handled without the friction.",
    },
    painPoints: [
      {
        title: "Phone tag fills your front desk",
        body: "Every booking taken by phone costs staff time, and enquiries that come in after hours often never get answered at all.",
      },
      {
        title: "Generic salon software, generic feel",
        body: "Mass-market booking tools tend to look like spreadsheets. Your booking page should feel like your space does.",
      },
      {
        title: "Late cancellations leave empty rooms",
        body: "An empty treatment room is revenue you can't get back, and unprotected bookings make late cancellations painless for everyone but you.",
      },
    ],
    highlights: [
      {
        title: "Service & practitioner logic",
        body: "Durations, prep time, and per-practitioner availability all handled cleanly behind the scenes.",
      },
      {
        title: "Cancellation protection",
        body: "Deposits and tiered cancellation windows keep your treatment rooms earning.",
      },
      {
        title: "Intake built into booking",
        body: "Collect preferences and health notes at booking time, so clients arrive ready and sessions start on time.",
      },
    ],
    metaDescription:
      "White-label spa and wellness booking on your own website. Services, practitioners, deposits, and intake, in a flow as calm as your brand.",
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
        "Wineries, tour operators, and experience hosts get capacity-aware scheduling and direct sales, without marketplace commissions eating into the margin.",
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
        body: "Private tastings and group tours arranged over long email threads take up hours and slip through the cracks more often than anyone admits.",
      },
    ],
    highlights: [
      {
        title: "Capacity-aware sessions",
        body: "Fixed departures with live seat counts, so guests see real availability and you never oversell a session.",
      },
      {
        title: "Direct payment, no commission",
        body: "Tickets and tastings sold on your own site at a flat cost, whatever your volume.",
      },
      {
        title: "Private & group requests",
        body: "A structured enquiry flow for buyouts and groups, so your largest bookings don't get lost in your inbox.",
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
    "One booking system, adapted to how your business works. Each page below includes a live demo themed for that type of venue.",
};
