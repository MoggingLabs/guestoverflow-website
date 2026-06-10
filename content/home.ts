import type { Differentiator, HowItWorksStep } from "@/types/content";

export const hero = {
  eyebrow: "White-label online booking",
  headline: "Booking that belongs on your website.",
  subhead:
    "GuestFlow is a reservation system we design into your own website, so it looks and feels like your brand. Guests book directly with you, and every guest relationship stays yours.",
};

export const problems = {
  title: "Why send your guests somewhere else to book?",
  items: [
    {
      title: "Third-party apps own your guests",
      body: "Booking platforms sit between you and the people you host. They keep the guest emails and the booking history, and you end up paying to reach your own customers.",
    },
    {
      title: "You pay commission per cover",
      body: "With per-booking fees, the busier you are, the more you pay. It adds up fast, especially on the nights you work hardest.",
    },
    {
      title: "The booking page isn't yours",
      body: "You've put real care into your website, but the moment guests try to book, they land on a generic page that looks nothing like you.",
    },
  ],
};

export const widgetShowcase = {
  eyebrow: "Live demo",
  title: "See for yourself — try booking a table.",
  subhead:
    "This is a real GuestFlow widget running right here on the page. Switch the venue type to see how the same system looks when it's styled for a different business.",
  caption: "One booking system, styled to match each venue.",
};

export const howItWorks: { title: string; steps: HowItWorksStep[] } = {
  title: "Up and running in days.",
  steps: [
    {
      title: "We design it into your site",
      body: "Our team builds the booking experience to match your brand, from typography to tone of voice, and installs it on your existing website. You never have to touch code.",
    },
    {
      title: "Guests book in seconds",
      body: "Guests pick a date, a party size, and a time without ever leaving your site. The whole flow works just as well on a phone as it does on a laptop.",
    },
    {
      title: "You own every reservation",
      body: "Bookings, guest details, and preferences all land in your dashboard. They're yours to keep, export, and build on, with nobody in between.",
    },
  ],
};

export const differentiators: { title: string; items: Differentiator[] } = {
  title: "Why venues choose GuestFlow.",
  items: [
    {
      icon: "brand",
      title: "Truly yours",
      body: "GuestFlow lives on your domain and wears your brand. Guests book without ever leaving your site, and they never see our name.",
    },
    {
      icon: "commission",
      title: "No per-cover commission",
      body: "You pay a flat monthly price that stays the same however busy you get. A full Saturday costs you exactly what a quiet Tuesday does.",
    },
    {
      icon: "data",
      title: "Own your guest data",
      body: "Every booking, preference, and email address is yours, and you can export it all whenever you like. There's no marketplace between you and your guests.",
    },
    {
      icon: "concierge",
      title: "Concierge setup",
      body: "We design, build, and install everything with you, from the first conversation to your first booking. No code on your end.",
    },
  ],
};

export const industriesPreview = {
  title: "Built for the way you host.",
  subhead:
    "Whether you take table reservations, room bookings, treatments, or tour departures, GuestFlow adapts to how your business actually works.",
};

export const noWebsite = {
  eyebrow: "No website yet?",
  title: "You can still take bookings.",
  subhead:
    "Plenty of great venues run on word of mouth and a Google listing. That's a fine place to start, and we meet you there.",
  paths: [
    {
      title: "Start with your Google Business Profile",
      body: "We optimize your Google Business Profile so people searching for a place like yours actually find you, see the right photos and hours, and book you directly. It's the fastest and most affordable way to get online bookings working.",
      badge: "The starting point",
    },
    {
      title: "Ready for more? We build your website",
      body: "When you want a home of your own on the web, we design and build a full website with booking built in from day one. It's our higher-level offering, and most venues grow into it after seeing what an optimized profile alone brings in.",
      badge: "The full picture",
    },
  ],
};

export const promiseStrip = {
  title: "Our promise: complete transparency.",
  body: "Start with three months at half price. If you don't see real return or real usage through your website or your Google Business Profile in that time, you can end the relationship cleanly — no questions asked, no hard feelings. We'd rather part as friends than keep a client who isn't winning.",
};

export const builtFor = {
  line: "Built for independent restaurants, boutique hotels, spas, and tour operators.",
  credibility:
    "From the team at MoggingLabs — we've spent years building high-converting websites for hospitality businesses. GuestFlow is everything our clients kept asking for.",
};
