import type { IndustryContent, SectorPricing } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

/* ---------------------------------------------------------------------------
 * Per-sector pricing (PT-calibrated, ex-IVA). The shared tier ladder lives in
 * `pricingLadder` (localized once); per-sector numbers in `sectorPrices`; and
 * per-sector framing copy in `sectorPriceCopy`. `buildSectorPricing(locale,
 * slug)` assembles a `SectorPricing`. See docs/pt-pricing-and-cost-to-serve-2026-06.md.
 * ------------------------------------------------------------------------- */

/** Locale-independent monthly € (ex-IVA). Custom shows a published "from". */
export const sectorPrices: Record<
  string,
  { starter: number; essential: number; premium: number; customFrom: number }
> = {
  restaurants: { starter: 39, essential: 89, premium: 199, customFrom: 349 },
  hotels: { starter: 29, essential: 129, premium: 279, customFrom: 499 },
  "spas-wellness": { starter: 39, essential: 79, premium: 149, customFrom: 299 },
  "salons-barbers": { starter: 25, essential: 59, premium: 119, customFrom: 249 },
  "tours-experiences": { starter: 39, essential: 99, premium: 189, customFrom: 349 },
};

const pricingLadder = {
  en: {
    eyebrow: "Pricing",
    starter: {
      name: "Starter",
      note: "Self-serve. You set it up",
      blurb: "The branded booking widget on your own site, live today. No setup call.",
      features: [
        "White-label booking widget on your website",
        "Real-time availability & capacity",
        "Email confirmations & reminders",
        "Guest list with full export",
        "Reserve with Google",
      ],
    },
    essential: {
      name: "Essential",
      note: "We build, install & optimise it for you",
      blurb: "A partner who sets the whole thing up, instead of software you wire up alone.",
      features: [
        "Everything in Starter",
        "Concierge setup: we build & install it",
        "SMS reminders (allowance included)",
        "Quarterly review with us",
        "Email support",
      ],
    },
    premium: {
      name: "Premium",
      note: "For venues that live on bookings",
      blurb: "Everything in Essential, plus protection, insight and true white-label.",
      lead: [
        "Everything in Essential",
        "Deposits & no-show protection via your own Stripe",
        "Booking analytics & demand insights",
      ],
      tail: [
        "True on-domain white-label, zero of our branding",
        "Priority support",
      ],
    },
    custom: {
      name: "Custom",
      note: "Groups & multiple locations",
      blurb: "Multiple venues, custom integrations, or something we haven't thought of yet.",
      features: [
        "Everything in Premium",
        "Multiple locations: flat per venue, no per-location penalty",
        "Custom integrations (PMS, POS, CRM)",
        "Dedicated account manager",
      ],
    },
    smsAddOn: {
      name: "SMS reminders",
      priceNote: "from €0.09 / SMS",
      included:
        "Monthly allowance included on Essential & Premium, then transparent per-SMS. Never a per-booking fee. Email reminders are always free.",
    },
  },
  pt: {
    eyebrow: "Preços",
    starter: {
      name: "Starter",
      note: "Self-service. Instala você",
      blurb: "O widget de reservas com a sua marca, no seu site, a funcionar hoje. Sem chamada de instalação.",
      features: [
        "Widget de reservas white-label no seu site",
        "Disponibilidade e capacidade em tempo real",
        "Confirmações e lembretes por email",
        "Lista de clientes com exportação completa",
        "Reservar com o Google",
      ],
    },
    essential: {
      name: "Essential",
      note: "Construímos, instalamos e otimizamos por si",
      blurb: "Um parceiro que monta tudo, em vez de software que configura sozinho.",
      features: [
        "Tudo o que está no Starter",
        "Instalação concierge: montamos e instalamos por si",
        "Lembretes por SMS (com plafond incluído)",
        "Revisão trimestral connosco",
        "Suporte por email",
      ],
    },
    premium: {
      name: "Premium",
      note: "Para espaços que vivem de reservas",
      blurb: "Tudo o que está no Essential, mais proteção, inteligência e white-label verdadeiro.",
      lead: [
        "Tudo o que está no Essential",
        "Sinais e proteção contra faltas pelo seu próprio Stripe",
        "Análise de reservas e tendências de procura",
      ],
      tail: [
        "White-label verdadeiro no seu domínio, sem a nossa marca",
        "Suporte prioritário",
      ],
    },
    custom: {
      name: "À medida",
      note: "Grupos e várias localizações",
      blurb: "Vários espaços, integrações à medida, ou algo em que ainda não pensámos.",
      features: [
        "Tudo o que está no Premium",
        "Várias localizações: preço fixo por espaço, sem penalização",
        "Integrações à medida (PMS, POS, CRM)",
        "Gestor de conta dedicado",
      ],
    },
    smsAddOn: {
      name: "Lembretes por SMS",
      priceNote: "desde 0,09 € / SMS",
      included:
        "Plafond mensal incluído no Essential e no Premium, depois SMS a preço transparente. Nunca uma taxa por reserva. Os lembretes por email são sempre gratuitos.",
    },
  },
} as const;

type SectorCopy = {
  valueUnit: string;
  heroHeadline: string;
  heroSubhead: string;
  premiumFlow: string;
  comparison: { title: string; body: string };
  starterNote?: string;
  starterBlurb?: string;
};

const sectorPriceCopy: Record<Locale, Record<string, SectorCopy>> = {
  en: {
    restaurants: {
      valueUnit: "cover",
      heroHeadline: "Pricing for restaurants. Flat, never per cover.",
      heroSubhead:
        "Whatever your volume, your price doesn't move. No commission on covers, not even on the regulars who already know you.",
      premiumFlow: "Table & turn management with pacing controls",
      comparison: {
        title: "What TheFork really costs",
        body: "TheFork bills around €2-4 a cover, including the regulars who already book with you. A busy month can run well over €1,000. Guest Overflow is one flat price that doesn't move on your busiest night, and never charges per cover.",
      },
    },
    hotels: {
      valueUnit: "room-night",
      heroHeadline: "Pricing for hotels. Flat, and you keep the OTA cut.",
      heroSubhead:
        "Booking.com takes 15-18% of every stay. Recover a handful of direct bookings a month and Guest Overflow has already paid for itself. In Portugal, you can price your own site below Booking by law.",
      premiumFlow: "Room types, occupancy rules & seasonal rates",
      comparison: {
        title: "What OTA commission really costs",
        body: "A 20-room hotel at €120 a night hands Booking €50,000-63,000 a year in commission. Shift even a fifth of those stays to direct and you keep over €10,000. All for a flat fee that never moves and runs on your own Stripe, with no payment take-rate.",
      },
      starterNote: "For Alojamento Local, 1-3 units",
      starterBlurb: "A white-label direct-booking widget for your AL, so guests book you, not the OTA.",
    },
    "spas-wellness": {
      valueUnit: "treatment",
      heroHeadline: "Pricing for spas & wellness. Flat per venue, never per chair.",
      heroSubhead:
        "One flat price however many rooms or practitioners you run. No commission on new clients, ever.",
      premiumFlow: "Service, duration & per-practitioner scheduling",
      comparison: {
        title: "What the marketplaces really cost",
        body: "Fresha takes ~20% of a new client's first booking, Treatwell 25%, Booksy 30%. And per-seat tools charge more with every practitioner you add. Guest Overflow is one flat price per venue, with no cut of your clients and no per-seat penalty.",
      },
    },
    "salons-barbers": {
      valueUnit: "appointment",
      heroHeadline: "Pricing for salons & barbers. Flat per venue, not per chair.",
      heroSubhead:
        "A two-chair shop and a ten-chair salon pay the same. No commission on a first visit, no per-booking fee.",
      premiumFlow: "Per-stylist scheduling, buffers & chair management",
      comparison: {
        title: "What per-chair pricing really costs",
        body: "A four-chair shop on Booksy pays around €80-110 a month in seat fees alone, plus 30% of every new client's first visit. Guest Overflow is one flat price per venue, whatever your chair count, and never takes a cut of a booking.",
      },
    },
    "tours-experiences": {
      valueUnit: "ticket",
      heroHeadline: "Pricing for tours & experiences. Flat, never per ticket.",
      heroSubhead:
        "Sell direct at a flat cost, whatever your volume. No commission, no cancellation fees, and a rate we never raise out from under you.",
      premiumFlow: "Capacity-aware sessions, manifests & group buyouts",
      comparison: {
        title: "What marketplace commission really costs",
        body: "Civitatis, GetYourGuide and Viator take 20-30% of every ticket and keep the customer for the next trip; FareHarbor adds 6% to your guests' price. An operator selling 500 tickets a month at €60 hands a marketplace €90,000+ a year. Guest Overflow is one flat price that doesn't move, and we never bill you for a cancellation.",
      },
    },
  },
  pt: {
    restaurants: {
      valueUnit: "reserva",
      heroHeadline: "Preços para restaurantes. Fixo, nunca por reserva.",
      heroSubhead:
        "Seja qual for o volume, o preço não mexe. Sem comissão por pessoa, nem sequer nos habituais que já reservam consigo.",
      premiumFlow: "Gestão de mesas e rotação com controlo de ritmo",
      comparison: {
        title: "O que o TheFork custa de verdade",
        body: "O TheFork cobra cerca de 2 a 4 € por pessoa, incluindo os habituais que já reservam consigo. Um mês cheio passa facilmente dos 1.000 €. O Guest Overflow é um preço fixo que não muda no seu mês mais cheio, e nunca cobra por reserva.",
      },
    },
    hotels: {
      valueUnit: "dormida",
      heroHeadline: "Preços para hotéis. Fixo, e a comissão das OTAs fica consigo.",
      heroSubhead:
        "A Booking leva 15 a 18% de cada estadia. Recupere um punhado de reservas diretas por mês e o Guest Overflow já se pagou. Em Portugal, por lei, pode pôr o seu site abaixo da Booking.",
      premiumFlow: "Tipos de quarto, regras de ocupação e tarifas sazonais",
      comparison: {
        title: "O que a comissão das OTAs custa de verdade",
        body: "Um hotel de 20 quartos a 120 € por noite entrega à Booking 50.000 a 63.000 € por ano em comissão. Passe apenas um quinto dessas estadias para reserva direta e fica com mais de 10.000 €. É um valor fixo que não muda e corre no seu próprio Stripe, sem margem nos pagamentos.",
      },
      starterNote: "Para Alojamento Local, 1 a 3 unidades",
      starterBlurb: "Um widget de reserva direta white-label para o seu AL, para que os hóspedes reservem consigo, não na OTA.",
    },
    "spas-wellness": {
      valueUnit: "tratamento",
      heroHeadline: "Preços para spas e bem-estar. Fixo por espaço, nunca por cadeira.",
      heroSubhead:
        "Um preço fixo, sejam quantas salas ou terapeutas tiver. Sem comissão sobre novos clientes, nunca.",
      premiumFlow: "Agenda por serviço, duração e por terapeuta",
      comparison: {
        title: "O que os marketplaces custam de verdade",
        body: "A Fresha leva ~20% da primeira marcação de um novo cliente, a Treatwell 25%, a Booksy 30%. E as ferramentas por lugar cobram mais a cada terapeuta que acrescenta. O Guest Overflow é um preço fixo por espaço, sem comissão sobre os seus clientes e sem penalização por lugar.",
      },
    },
    "salons-barbers": {
      valueUnit: "marcação",
      heroHeadline: "Preços para cabeleireiros e barbearias. Fixo por espaço, não por cadeira.",
      heroSubhead:
        "Um espaço de duas cadeiras e um de dez pagam o mesmo. Sem comissão na primeira visita, sem taxa por marcação.",
      premiumFlow: "Agenda por profissional, intervalos e gestão de cadeiras",
      comparison: {
        title: "O que o preço por cadeira custa de verdade",
        body: "Um espaço de quatro cadeiras na Booksy paga cerca de 80 a 110 € por mês só em taxas por lugar, mais 30% da primeira visita de cada novo cliente. O Guest Overflow é um preço fixo por espaço, seja qual for o número de cadeiras, e nunca leva uma fatia de uma marcação.",
      },
    },
    "tours-experiences": {
      valueUnit: "bilhete",
      heroHeadline: "Preços para tours e experiências. Fixo, nunca por bilhete.",
      heroSubhead:
        "Venda direto a um custo fixo, seja qual for o volume. Sem comissão, sem taxas de cancelamento, e uma tarifa que nunca aumentamos sem o avisar.",
      premiumFlow: "Sessões com gestão de lotação, manifestos e reservas exclusivas",
      comparison: {
        title: "O que a comissão dos marketplaces custa de verdade",
        body: "A Civitatis, a GetYourGuide e a Viator levam 20 a 30% de cada bilhete e ficam com o cliente para a próxima viagem; a FareHarbor acrescenta 6% ao preço dos seus clientes. Um operador que vende 500 bilhetes por mês a 60 € entrega a um marketplace mais de 90.000 € por ano. O Guest Overflow é um preço fixo que não muda, e nunca lhe cobramos por um cancelamento.",
      },
    },
  },
};

function buildSectorPricing(locale: Locale, slug: string): SectorPricing {
  const ui = pricingLadder[locale];
  const p = sectorPrices[slug];
  const c = sectorPriceCopy[locale][slug];
  return {
    hero: { eyebrow: ui.eyebrow, headline: c.heroHeadline, subhead: c.heroSubhead },
    valueUnit: c.valueUnit,
    comparison: c.comparison,
    tiers: [
      {
        name: ui.starter.name,
        monthlyEur: p.starter,
        priceNote: c.starterNote ?? ui.starter.note,
        blurb: c.starterBlurb ?? ui.starter.blurb,
        features: [...ui.starter.features],
      },
      {
        name: ui.essential.name,
        monthlyEur: p.essential,
        priceNote: ui.essential.note,
        blurb: ui.essential.blurb,
        features: [...ui.essential.features],
        featured: true,
      },
      {
        name: ui.premium.name,
        monthlyEur: p.premium,
        priceNote: ui.premium.note,
        blurb: ui.premium.blurb,
        features: [...ui.premium.lead, c.premiumFlow, ...ui.premium.tail],
      },
      {
        name: ui.custom.name,
        monthlyEur: null,
        fromEur: p.customFrom,
        priceNote: ui.custom.note,
        blurb: ui.custom.blurb,
        features: [...ui.custom.features],
      },
    ],
    addOns: [{ ...ui.smsAddOn }],
  };
}

type IndustriesStrings = {
  industries: IndustryContent[];
  index: { eyebrow: string; title: string; subhead: string; seeBooking: (label: string) => string };
  detail: {
    problemEyebrow: string;
    problemTitle: (label: string) => string;
    liveDemoEyebrow: string;
    liveDemoTitle: (venue: string) => string;
    liveDemoSubhead: string;
    builtInEyebrow: string;
    builtInTitle: (label: string) => string;
    pricingEyebrow: string;
    pricingAddOnsTitle: string;
    pricingCalcCta: string;
    comparisonFlat: string;
    seePricing: string;
    footerHeadline: string;
    footerSubhead: string;
  };
};

const en: IndustriesStrings = {
  industries: [
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
          "Guest Overflow gives restaurants a reservation flow that lives on their own site, carries their brand, and never charges per cover.",
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
      pricing: buildSectorPricing("en", "restaurants"),
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
          "Boutique hotels lose 15-25% of every OTA stay. Guest Overflow puts a beautiful, brand-true booking flow on your own site so guests book direct.",
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
      pricing: buildSectorPricing("en", "hotels"),
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
      pricing: buildSectorPricing("en", "spas-wellness"),
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
          title: "Marketplaces take 20-30% per ticket",
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
      pricing: buildSectorPricing("en", "tours-experiences"),
    },
    {
      slug: "salons-barbers",
      label: "Salons & barbers",
      themeId: "salon",
      icon: "scissors",
      cardBlurb:
        "Appointments that look like your salon, not a booking app, with deposits and rebooking that keep chairs full.",
      hero: {
        headline: "Booking that fits your chair.",
        subhead:
          "Salons and barbershops get an appointment flow on their own site, themed to their brand, with deposits, per-stylist scheduling, and no commission or per-booking fees.",
      },
      painPoints: [
        {
          title: "Booking apps own your clients",
          body: "Marketplace apps list your shop next to every competitor, take a cut of each booking, and keep the client's details for themselves.",
        },
        {
          title: "No-shows leave the chair empty",
          body: "An empty chair is time you can't sell twice. Without deposits and reminders, a missed appointment is gone for good.",
        },
        {
          title: "The phone rings mid-cut",
          body: "Taking bookings by phone means stopping mid-service, and calls that come in after hours often go unanswered.",
        },
      ],
      highlights: [
        {
          title: "Per-stylist scheduling",
          body: "Service durations, individual stylist and chair availability, and buffer time, all handled cleanly behind the scenes.",
        },
        {
          title: "Deposits & no-show protection",
          body: "Take a deposit or card hold on booking, with cancellation windows that keep your column earning.",
        },
        {
          title: "Rebooking & client history",
          body: "Preferred stylist, colour formulas, and visit history stay with you, so the next appointment is one tap away.",
        },
      ],
      metaDescription:
        "White-label booking for hair salons and barbershops on your own website. Per-stylist scheduling, deposits for no-show protection, and client history you own.",
      pricing: buildSectorPricing("en", "salons-barbers"),
    },
  ],
  index: {
    eyebrow: "Industries",
    title: "Built for the way you host.",
    subhead:
      "One booking system, adapted to how your business works. Each page below includes a live demo themed for that type of venue.",
    seeBooking: (label) => `See ${label.toLowerCase()} booking →`,
  },
  detail: {
    problemEyebrow: "The problem",
    problemTitle: (label) => `What ${label.toLowerCase()} put up with today`,
    liveDemoEyebrow: "Live demo",
    liveDemoTitle: (venue) => `Try a booking at ${venue}.`,
    liveDemoSubhead:
      "The venue is fictional, but the widget is real. This is how Guest Overflow would feel themed for your business.",
    builtInEyebrow: "Built in",
    builtInTitle: (label) => `Guest Overflow for ${label.toLowerCase()}`,
    pricingEyebrow: "Pricing",
    pricingAddOnsTitle: "Optional add-ons",
    pricingCalcCta: "Calculate your savings",
    comparisonFlat: "Flat, no commission, ever.",
    seePricing: "See pricing",
    footerHeadline: "Bring booking home to your website.",
    footerSubhead: "See Guest Overflow themed for a venue like yours in a 20-minute demo.",
  },
};

const pt: IndustriesStrings = {
  industries: [
    {
      slug: "restaurants",
      label: "Restaurantes",
      themeId: "fine-dining",
      icon: "fork",
      cardBlurb:
        "Reservas de mesa que parecem uma parte natural da sua sala, não um separador de marketplace.",
      hero: {
        headline: "Receba reservas no seu próprio site.",
        subhead:
          "O Guest Overflow dá aos restaurantes um fluxo de reservas que vive no seu próprio site, veste a sua marca e nunca cobra por reserva.",
      },
      painPoints: [
        {
          title: "Os marketplaces disputam os seus clientes",
          body: "As plataformas de reservas mostram-no mesmo ao lado dos concorrentes, e não hesitam em empurrar os seus clientes para a mesa de outro.",
        },
        {
          title: "As taxas por reserva crescem contra si",
          body: "Com comissões, uma noite esgotada é também a mais cara. As taxas vão comendo os seus melhores serviços sem dar por isso.",
        },
        {
          title: "As faltas queimam os melhores horários",
          body: "Sem sinais e lembretes na hora certa, uma falta numa mesa de oito à sexta-feira é receita que nunca mais recupera.",
        },
      ],
      highlights: [
        {
          title: "Gestão de mesas e rotação",
          body: "Durações por tamanho de grupo, controlo de ritmo e capacidade da sala alinhados com a forma como realmente senta os clientes.",
        },
        {
          title: "Sinais e garantias de cartão",
          body: "Proteja os horários nobres com sinais ou garantias de cartão para grupos grandes e menus especiais.",
        },
        {
          title: "Um livro de clientes que é seu",
          body: "Habituais, alergias, aniversários. Tudo fica nas suas mãos, e pode exportá-lo quando quiser.",
        },
      ],
      metaDescription:
        "Reservas de restaurante white-label no seu próprio site. Sem comissão por reserva, sinais contra faltas e um livro de clientes que é seu.",
      pricing: buildSectorPricing("pt", "restaurants"),
    },
    {
      slug: "hotels",
      label: "Hotéis",
      themeId: "hotel",
      icon: "bed",
      cardBlurb:
        "Reservas diretas para hotéis boutique: fica com a comissão das OTAs e com a relação com o hóspede.",
      hero: {
        headline: "Faça da reserva direta a escolha óbvia.",
        subhead:
          "Os hotéis boutique perdem 15 a 25% de cada estadia vendida por OTA. O Guest Overflow coloca um fluxo de reserva bonito e fiel à marca no seu próprio site, para que os hóspedes reservem diretamente.",
      },
      painPoints: [
        {
          title: "As OTAs levam um quinto de cada estadia",
          body: "As agências de viagens online cobram comissões que ultrapassam em muito qualquer custo de software, e ficam para sempre com o email do hóspede.",
        },
        {
          title: "Motores de reserva pesados afastam hóspedes",
          body: "A maioria dos motores de reserva de hotel parece um checkout de companhia aérea, e os hóspedes desistem a meio e acabam por reservar na OTA.",
        },
        {
          title: "Nenhuma relação antes da chegada",
          body: "Quando a reserva pertence à OTA, o primeiro contacto real com o hóspede acontece na receção.",
        },
      ],
      highlights: [
        {
          title: "A pensar em quartos e tarifas",
          body: "Tipos de quarto, regras de ocupação e tarifas sazonais apresentados num fluxo que parece o seu hotel, não um portal.",
        },
        {
          title: "Incentivos à reserva direta",
          body: "Destaque tarifas de membro, vantagens ou pacotes que tornem a reserva direta visivelmente melhor do que o preço da OTA.",
        },
        {
          title: "Perfil do hóspede antes da chegada",
          body: "Preferências e pedidos especiais recolhidos na reserva, para que a hospitalidade comece antes do check-in.",
        },
      ],
      metaDescription:
        "Reservas diretas de hotel no seu próprio site. Um fluxo fiel à marca que vence as comissões das OTAs e mantém a relação com o hóspede.",
      pricing: buildSectorPricing("pt", "hotels"),
    },
    {
      slug: "spas-wellness",
      label: "Spas e bem-estar",
      themeId: "spa",
      icon: "leaf",
      cardBlurb:
        "Marcações de tratamentos tão calmas como o seu espaço, com serviços, terapeutas e horários geridos com elegância.",
      hero: {
        headline: "Uma experiência de marcação tão calma como o seu espaço.",
        subhead:
          "Spas e estúdios de bem-estar recebem um fluxo de marcações à imagem da sua marca, com serviços, durações e horários de terapeutas geridos sem fricção.",
      },
      painPoints: [
        {
          title: "O telefone consome a sua receção",
          body: "Cada marcação por telefone custa tempo à equipa, e os contactos fora de horas muitas vezes ficam simplesmente sem resposta.",
        },
        {
          title: "Software genérico, experiência genérica",
          body: "As ferramentas de marcação massificadas parecem folhas de cálculo. A sua página de marcações devia transmitir o que o seu espaço transmite.",
        },
        {
          title: "Cancelamentos tardios deixam salas vazias",
          body: "Uma sala de tratamento vazia é receita irrecuperável, e marcações sem proteção tornam o cancelamento tardio indolor para todos menos para si.",
        },
      ],
      highlights: [
        {
          title: "Lógica de serviços e terapeutas",
          body: "Durações, tempos de preparação e disponibilidade por terapeuta, tudo gerido de forma limpa nos bastidores.",
        },
        {
          title: "Proteção contra cancelamentos",
          body: "Sinais e janelas de cancelamento escalonadas mantêm as suas salas de tratamento a render.",
        },
        {
          title: "Ficha de cliente integrada na marcação",
          body: "Preferências e notas de saúde recolhidas no momento da marcação, para que os clientes cheguem prontos e as sessões comecem a horas.",
        },
      ],
      metaDescription:
        "Marcações white-label para spas e bem-estar no seu próprio site. Serviços, terapeutas, sinais e fichas de cliente, num fluxo tão calmo como a sua marca.",
      pricing: buildSectorPricing("pt", "spas-wellness"),
    },
    {
      slug: "tours-experiences",
      label: "Tours e experiências",
      themeId: "wine-bar",
      icon: "compass",
      cardBlurb:
        "Provas, tours e eventos com gestão de lotação e venda direta de bilhetes.",
      hero: {
        headline: "Esgote partidas a partir do seu próprio site.",
        subhead:
          "Quintas, operadores de tours e anfitriões de experiências recebem agendamento com gestão de lotação e vendas diretas, sem comissões de marketplace a comer a margem.",
      },
      painPoints: [
        {
          title: "Os marketplaces levam 20 a 30% por bilhete",
          body: "As plataformas de experiências cobram comissões pesadas e ficam com o cliente para a próxima viagem.",
        },
        {
          title: "Caos de lotação entre canais",
          body: "Vender a mesma partida em três sítios significa overbooking ou, pior, sessões meio vazias.",
        },
        {
          title: "Reservas de grupo geridas por email",
          body: "Provas privadas e tours de grupo negociados em longas trocas de email consomem horas e escapam-se mais vezes do que se admite.",
        },
      ],
      highlights: [
        {
          title: "Sessões com gestão de lotação",
          body: "Partidas fixas com contagem de lugares em tempo real, para que os clientes vejam disponibilidade real e nunca venda a mais.",
        },
        {
          title: "Pagamento direto, sem comissão",
          body: "Bilhetes e provas vendidos no seu próprio site a custo fixo, seja qual for o volume.",
        },
        {
          title: "Pedidos privados e de grupo",
          body: "Um fluxo estruturado para grupos e reservas exclusivas, para que as suas maiores reservas não se percam na caixa de entrada.",
        },
      ],
      metaDescription:
        "Reserva direta de tours, provas e experiências no seu próprio site. Sessões com gestão de lotação, sem comissões de marketplace.",
      pricing: buildSectorPricing("pt", "tours-experiences"),
    },
    {
      slug: "salons-barbers",
      label: "Cabeleireiros e barbearias",
      themeId: "salon",
      icon: "scissors",
      cardBlurb:
        "Marcações com o aspeto do seu salão, não de uma app, com sinais e remarcação que mantêm as cadeiras cheias.",
      hero: {
        headline: "Marcações à medida da sua cadeira.",
        subhead:
          "Salões e barbearias recebem um fluxo de marcações no seu próprio site, com a sua marca, sinais, agenda por profissional e sem comissões nem taxas por marcação.",
      },
      painPoints: [
        {
          title: "As apps ficam com os seus clientes",
          body: "As apps de marcações colocam o seu espaço ao lado de todos os concorrentes, levam uma fatia de cada marcação e guardam os dados do cliente para si.",
        },
        {
          title: "As faltas deixam a cadeira vazia",
          body: "Uma cadeira vazia é tempo que não se vende duas vezes. Sem sinais e lembretes, uma falta é receita perdida.",
        },
        {
          title: "O telefone toca a meio do corte",
          body: "Aceitar marcações por telefone obriga a parar a meio do serviço, e as chamadas fora de horas ficam muitas vezes sem resposta.",
        },
      ],
      highlights: [
        {
          title: "Agenda por profissional",
          body: "Durações de serviço, disponibilidade por profissional e por cadeira e tempos de intervalo, tudo gerido de forma limpa nos bastidores.",
        },
        {
          title: "Sinais e proteção contra faltas",
          body: "Receba um sinal ou garantia de cartão na marcação, com janelas de cancelamento que mantêm a sua agenda a render.",
        },
        {
          title: "Remarcação e histórico de cliente",
          body: "Profissional preferido, fórmulas de cor e histórico de visitas ficam consigo, para que a próxima marcação fique a um toque.",
        },
      ],
      metaDescription:
        "Marcações white-label para cabeleireiros e barbearias no seu próprio site. Agenda por profissional, sinais contra faltas e histórico de cliente que é seu.",
      pricing: buildSectorPricing("pt", "salons-barbers"),
    },
  ],
  index: {
    eyebrow: "Setores",
    title: "Feito para a forma como recebe.",
    subhead:
      "Um único sistema de reservas, adaptado à forma como o seu negócio funciona. Cada página abaixo inclui uma demo ao vivo com o tema desse tipo de espaço.",
    seeBooking: (label) => `Ver reservas para ${label.toLowerCase()} →`,
  },
  detail: {
    problemEyebrow: "O problema",
    problemTitle: (label) => `O que ${label.toLowerCase()} aturam hoje`,
    liveDemoEyebrow: "Demo ao vivo",
    liveDemoTitle: (venue) => `Experimente reservar no ${venue}.`,
    liveDemoSubhead:
      "O espaço é fictício, mas o widget é real. É assim que o Guest Overflow se sentiria com o tema do seu negócio.",
    builtInEyebrow: "Incluído",
    builtInTitle: (label) => `Guest Overflow para ${label.toLowerCase()}`,
    pricingEyebrow: "Preços",
    pricingAddOnsTitle: "Extras opcionais",
    pricingCalcCta: "Calcule a sua poupança",
    comparisonFlat: "Fixo, sem comissão, nunca.",
    seePricing: "Ver preços",
    footerHeadline: "Traga as reservas de volta para o seu site.",
    footerSubhead:
      "Veja o Guest Overflow com o tema de um espaço como o seu numa demonstração de 20 minutos.",
  },
};

export const industriesContent: Record<Locale, IndustriesStrings> = { en, pt };

/** Slugs are locale-independent; used by generateStaticParams and the sitemap. */
export const industrySlugs = en.industries.map((i) => i.slug);

export function getIndustry(
  locale: Locale,
  slug: string,
): IndustryContent | undefined {
  return industriesContent[locale].industries.find((i) => i.slug === slug);
}
