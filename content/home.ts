import type { Differentiator, HowItWorksStep } from "@/types/content";

export const hero = {
  eyebrow: "White-label online booking",
  headline: "Booking that belongs on your website.",
  subhead:
    "GuestFlow is a white-label reservation system for restaurants, hotels, and experiences — designed into your site, matched to your brand, with every guest relationship staying yours.",
};

export const problems = {
  title: "Your guests deserve better than a third-party tab.",
  items: [
    {
      title: "Third-party apps own your guests",
      body: "Marketplace platforms sit between you and the people you host. They collect the emails, the preferences, the loyalty — and rent them back to you.",
    },
    {
      title: "You pay commission per cover",
      body: "Per-booking fees punish you for being busy. Your best Saturday of the year is also your most expensive.",
    },
    {
      title: "The booking page isn't yours",
      body: "You've invested in a beautiful website — then the reservation step dumps guests onto a generic page that looks like everyone else's.",
    },
  ],
};

export const widgetShowcase = {
  eyebrow: "Live demo",
  title: "Don't take our word for it. Book a table.",
  subhead:
    "This is a real GuestFlow widget running right here on the page. Switch the venue type to see the same engine wearing a different brand.",
  caption: "Same engine. Your brand.",
};

export const howItWorks: { title: string; steps: HowItWorksStep[] } = {
  title: "Live in days, not months.",
  steps: [
    {
      title: "We design it into your site",
      body: "Our team builds the booking experience to match your brand — typography, colors, voice — and installs it on your existing website. You don't touch code.",
    },
    {
      title: "Guests book in seconds",
      body: "Date, party, time, done. A flow that feels native to your site, works beautifully on mobile, and never sends guests somewhere else.",
    },
    {
      title: "You own every reservation",
      body: "Bookings, guest details, and preferences land in your dashboard — yours to keep, export, and build on. No middleman.",
    },
  ],
};

export const differentiators: { title: string; items: Differentiator[] } = {
  title: "Why teams switch to GuestFlow.",
  items: [
    {
      icon: "brand",
      title: "Truly yours",
      body: "GuestFlow lives on your domain, in your brand. Guests never leave your site — and never see ours.",
    },
    {
      icon: "commission",
      title: "No per-cover commission",
      body: "Flat monthly pricing. A full Saturday costs the same as a slow Tuesday, so growth is pure upside.",
    },
    {
      icon: "data",
      title: "Own your guest data",
      body: "Every booking, preference, and email is yours to export at any time. No marketplace between you and your guests.",
    },
    {
      icon: "concierge",
      title: "Concierge setup",
      body: "We design, build, and install it with you. From kickoff to first booking without touching a line of code.",
    },
  ],
};

export const industriesPreview = {
  title: "Built for the way you host.",
  subhead:
    "One booking engine, shaped to the rhythm of your business — covers, stays, treatments, or departures.",
};

export const builtFor = {
  line: "Built for independent restaurants, boutique hotels, spas, and tour operators.",
  credibility:
    "From the team at MoggingLabs — we've spent years building high-converting websites for hospitality businesses. GuestFlow is everything our clients kept asking for.",
};
