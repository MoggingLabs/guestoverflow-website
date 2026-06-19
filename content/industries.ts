import type { IndustryContent, SectorPricing } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";
import { isActiveSector } from "@/lib/sectors";

/* ---------------------------------------------------------------------------
 * Per-sector pricing (PT-calibrated, ex-IVA). The shared tier ladder lives in
 * `pricingLadder` (localized once); per-sector numbers in `sectorPrices`; and
 * per-sector framing copy in `sectorPriceCopy`. `buildSectorPricing(locale,
 * slug)` assembles a `SectorPricing`. See docs/pt-pricing-and-cost-to-serve-2026-06.md.
 * ------------------------------------------------------------------------- */

/** Locale-independent monthly € (ex-IVA). Custom shows a published "from". */
export const sectorPrices: Record<
  string,
  {
    starter: number;
    essential: number;
    premium: number;
    customFrom: number;
    starterSetup?: number;
    essentialSetup?: number;
    premiumSetup?: number;
  }
> = {
  restaurants: {
    starter: 45,
    essential: 85,
    premium: 169,
    customFrom: 329,
    starterSetup: 299,
    essentialSetup: 499,
    premiumSetup: 999,
  },
  hotels: { starter: 29, essential: 129, premium: 279, customFrom: 499 },
  "spas-wellness": { starter: 39, essential: 79, premium: 149, customFrom: 299 },
  "salons-barbers": {
    starter: 35,
    essential: 59,
    premium: 119,
    customFrom: 249,
    starterSetup: 299,
    essentialSetup: 499,
    premiumSetup: 999,
  },
  "tours-experiences": { starter: 39, essential: 99, premium: 189, customFrom: 349 },
};

const pricingLadder = {
  en: {
    eyebrow: "Pricing",
    starter: {
      name: "Starter",
      note: "For solo professionals and small studios getting started",
      blurb: "Your branded booking page with WhatsApp reminders, built and launched by us.",
      features: [
        "Branded booking page on your own guestoverflow.com address",
        "Real-time availability & capacity management",
        "Scheduling for up to 2 professionals",
        "WhatsApp & email reminders, 450/month included",
        "Guest self-service: online cancel & reschedule",
        "Client list with full export",
        "Reserve with Google",
        "Email support",
      ],
    },
    essential: {
      name: "Essential",
      note: "For growing salons and barbershops",
      blurb: "Room to grow your team, with an ongoing partnership and priority support.",
      features: [
        "Everything in Starter",
        "Multiple staff calendars (3+ professionals)",
        "Deposits & no-show protection into your own Stripe",
        "Client CRM: visit history, notes & tags",
        "WhatsApp reminders that scale with your team",
        "Quarterly business review with us",
        "Priority support",
      ],
    },
    premium: {
      name: "Premium",
      note: "For salons and barbershops that depend on bookings",
      blurb: "Everything in Essential, with the addition of protection, analytics and a true white-label.",
      lead: [
        "Everything in Essential",
        "Booking analytics & demand insights",
      ],
      tail: [
        "True on-domain white-label, none of our branding",
        "Dedicated priority support",
      ],
    },
    custom: {
      name: "Custom",
      note: "Groups & multiple locations",
      blurb: "Multiple venues, custom integrations, or requirements we have not yet anticipated.",
      features: [
        "Everything in Premium",
        "Multiple locations: flat per venue, no per-location penalty",
        "Custom integrations (PMS, POS, CRM)",
        "Dedicated account manager",
      ],
    },
    smsAddOn: {
      name: "WhatsApp reminders",
      priceNote: "allowance included",
      included:
        "A monthly allowance is included on every plan, followed by transparent per-message pricing. There is never a per-booking fee. Email reminders are always free of charge.",
    },
  },
  pt: {
    eyebrow: "Preços",
    starter: {
      name: "Starter",
      note: "Para profissionais a solo e pequenos estúdios a começar",
      blurb: "A sua página de marcações com a sua marca e lembretes por WhatsApp, criada e lançada por nós.",
      features: [
        "Página de marcações com a sua marca, num endereço guestoverflow.com",
        "Disponibilidade e capacidade geridas em tempo real",
        "Agenda para até 2 profissionais",
        "Lembretes por WhatsApp e email, 450/mês incluídos",
        "Self-service do cliente: cancelar e remarcar online",
        "Lista de clientes com exportação completa",
        "Reservar com o Google",
        "Suporte por email",
      ],
    },
    essential: {
      name: "Essential",
      note: "Para salões e barbearias em crescimento",
      blurb: "Espaço para crescer a sua equipa, com uma parceria contínua e suporte prioritário.",
      features: [
        "Tudo o que está no Starter",
        "Agendas individuais para a equipa (3+ profissionais)",
        "Sinais e proteção contra faltas na sua conta Stripe",
        "CRM de clientes: histórico de visitas, notas e etiquetas",
        "Lembretes por WhatsApp que crescem com a sua equipa",
        "Revisão trimestral connosco",
        "Suporte prioritário",
      ],
    },
    premium: {
      name: "Premium",
      note: "Para salões e barbearias que dependem de reservas",
      blurb: "Tudo o que está no Essential, com a adição de proteção, análise de dados e white-label verdadeiro.",
      lead: [
        "Tudo o que está no Essential",
        "Análise de reservas e tendências de procura",
      ],
      tail: [
        "White-label verdadeiro no seu domínio, sem a nossa marca",
        "Suporte prioritário dedicado",
      ],
    },
    custom: {
      name: "À medida",
      note: "Grupos e várias localizações",
      blurb: "Vários espaços, integrações à medida, ou requisitos que ainda não antecipámos.",
      features: [
        "Tudo o que está no Premium",
        "Várias localizações: preço fixo por espaço, sem penalização",
        "Integrações à medida (PMS, POS, CRM)",
        "Gestor de conta dedicado",
      ],
    },
    smsAddOn: {
      name: "Lembretes por WhatsApp",
      priceNote: "plafond incluído",
      included:
        "Plafond mensal incluído em todos os planos, seguido de preço transparente por mensagem. Não existe qualquer taxa por reserva. Os lembretes por email são sempre gratuitos.",
    },
  },
} as const;

type LadderTier = {
  name: string;
  note: string;
  blurb: string;
  features: readonly string[];
};
type LadderPremium = {
  name: string;
  note: string;
  blurb: string;
  lead: readonly string[];
  tail: readonly string[];
};
type LadderShape = {
  eyebrow: string;
  starter: LadderTier;
  essential: LadderTier;
  premium: LadderPremium;
  custom: LadderTier;
  smsAddOn: { name: string; priceNote: string; included: string };
};

/**
 * Per-sector overrides of the shared `pricingLadder`. A sector whose tiers need
 * framing in its own language (restaurants think in covers and tables, not
 * chairs and stylists) lives here; sectors absent from this map fall back to the
 * shared salon-shaped ladder. `premiumFlow` (from sectorPriceCopy) is still
 * injected into the Premium tier between its `lead` and `tail`.
 */
const sectorLadders: Partial<Record<Locale, Record<string, LadderShape>>> = {
  en: {
    restaurants: {
      eyebrow: "Pricing",
      starter: {
        name: "Starter",
        note: "For a single dining room taking its first online reservations",
        blurb: "Your branded reservation page with WhatsApp reminders, built and launched by us.",
        features: [
          "Branded reservation page on your own guestoverflow.com address",
          "One real-time book for online, phone & walk-in reservations",
          "WhatsApp & email confirmations & reminders, 450/month included",
          "One-tap confirm & cancel to cut no-shows",
          "Deposits & card holds into your own Stripe",
          "Guest list with full export — you are the data controller",
          "Reserve with Google, commission-free",
          "Floor map & walk-in waitlist",
          "No commission — never per cover, never on regulars",
          "Email support",
        ],
      },
      essential: {
        name: "Essential",
        note: "For a busy full-service restaurant",
        blurb: "Room to run a full book, with pacing, large parties and an ongoing partnership.",
        features: [
          "Everything in Starter",
          "Multi-area floor: dining room, terrace, bar & private",
          "Risk-scaled deposits by party size, day & time, with MB WAY",
          "Guest CRM: visit history, allergies, notes & tags",
          "Shift & service-window management",
          "POS integration: covers flow to the final bill",
          "Quarterly business review with us",
          "Priority support",
        ],
      },
      premium: {
        name: "Premium",
        note: "For venues that live by the reservation book",
        blurb: "Everything in Essential, with analytics, marketing and a true white-label.",
        lead: [
          "Everything in Essential",
          "Booking & demand analytics: covers, no-shows, sources & repeat guests",
        ],
        tail: [
          "Duplicate-booking detection & no-show scoring",
          "WhatsApp marketing to your own guest list",
          "True on-domain white-label, none of our branding",
          "Dedicated priority support",
        ],
      },
      custom: {
        name: "Custom",
        note: "Groups & multiple locations",
        blurb: "Multiple venues, custom integrations, or requirements we have not yet anticipated.",
        features: [
          "Everything in Premium",
          "Multiple locations: flat per venue, no per-location penalty",
          "Custom integrations (POS, PMS, CRM)",
          "Dedicated account manager",
        ],
      },
      smsAddOn: pricingLadder.en.smsAddOn,
    },
  },
  pt: {
    restaurants: {
      eyebrow: "Preços",
      starter: {
        name: "Starter",
        note: "Para uma sala que começa a receber reservas online",
        blurb: "A sua página de reservas com a sua marca e lembretes por WhatsApp, criada e lançada por nós.",
        features: [
          "Página de reservas com a sua marca, num endereço guestoverflow.com",
          "Um livro de reservas em tempo real para online, telefone e walk-in",
          "Confirmações e lembretes por WhatsApp e email, 450/mês incluídos",
          "Confirmar e cancelar num toque para reduzir as faltas",
          "Sinais e cauções de cartão na sua própria conta Stripe",
          "Lista de clientes com exportação completa — o responsável pelos dados é você",
          "Reservar com o Google, sem comissão",
          "Mapa de sala e lista de espera para walk-ins",
          "Sem comissão — nunca por pessoa, nunca sobre os habituais",
          "Suporte por email",
        ],
      },
      essential: {
        name: "Essential",
        note: "Para um restaurante de serviço completo com movimento",
        blurb: "Espaço para gerir um livro cheio, com ritmo, grupos grandes e uma parceria contínua.",
        features: [
          "Tudo o que está no Starter",
          "Sala multi-área: sala, esplanada, bar e privados",
          "Sinais ajustados ao risco por nº de pessoas, dia e hora, com MB WAY",
          "CRM de clientes: histórico de visitas, alergias, notas e etiquetas",
          "Gestão de turnos e janelas de serviço",
          "Integração com POS: as reservas ligam-se à conta final",
          "Revisão trimestral connosco",
          "Suporte prioritário",
        ],
      },
      premium: {
        name: "Premium",
        note: "Para espaços que vivem do livro de reservas",
        blurb: "Tudo o que está no Essential, com análise de dados, marketing e white-label verdadeiro.",
        lead: [
          "Tudo o que está no Essential",
          "Análise de reservas e procura: pessoas, faltas, origens e clientes habituais",
        ],
        tail: [
          "Deteção de reservas duplicadas e classificação de risco de falta",
          "Marketing por WhatsApp para a sua própria lista de clientes",
          "White-label verdadeiro no seu domínio, sem a nossa marca",
          "Suporte prioritário dedicado",
        ],
      },
      custom: {
        name: "À medida",
        note: "Grupos e várias localizações",
        blurb: "Vários espaços, integrações à medida, ou requisitos que ainda não antecipámos.",
        features: [
          "Tudo o que está no Premium",
          "Várias localizações: preço fixo por espaço, sem penalização",
          "Integrações à medida (POS, PMS, CRM)",
          "Gestor de conta dedicado",
        ],
      },
      smsAddOn: pricingLadder.pt.smsAddOn,
    },
  },
};

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
        "Whatever your volume, your price does not move. There is no commission on covers, not even on the regular guests who already know you.",
      premiumFlow: "Table & turn management with pacing controls",
      comparison: {
        title: "The actual cost of TheFork",
        body: "TheFork bills approximately €2-4 a cover, including the regular guests who already book with you. A busy month can exceed €1,000. Guest Overflow is a single flat price that does not move on your busiest night, and it never charges per cover.",
      },
    },
    hotels: {
      valueUnit: "room-night",
      heroHeadline: "Pricing for hotels. Flat, and you retain the OTA cut.",
      heroSubhead:
        "Booking.com takes 15-18% of every stay. Recover a small number of direct bookings each month and Guest Overflow has already paid for itself. In Portugal, you are permitted by law to price your own site below Booking.",
      premiumFlow: "Room types, occupancy rules & seasonal rates",
      comparison: {
        title: "The actual cost of OTA commission",
        body: "A 20-room hotel at €120 a night pays Booking €50,000-63,000 a year in commission. Move even a fifth of those stays to direct booking and you retain over €10,000, all for a flat fee that never moves and runs on your own Stripe, with no payment take-rate.",
      },
      starterNote: "For Alojamento Local, 1-3 units",
      starterBlurb: "A branded direct-booking page for your AL, so that guests book with you, not the OTA.",
    },
    "spas-wellness": {
      valueUnit: "treatment",
      heroHeadline: "Pricing for spas & wellness. Flat per venue, never per chair.",
      heroSubhead:
        "A single flat price regardless of how many rooms or practitioners you operate. There is no commission on new clients, at any time.",
      premiumFlow: "Service, duration & per-practitioner scheduling",
      comparison: {
        title: "The actual cost of the marketplaces",
        body: "Fresha takes ~20% of a new client's first booking, Treatwell 25%, and Booksy 30%. In addition, per-seat tools charge more with every practitioner you add. Guest Overflow is a single flat price per venue, with no commission on your clients and no per-seat penalty.",
      },
    },
    "salons-barbers": {
      valueUnit: "appointment",
      heroHeadline: "Pricing for salons & barbers. Published, flat, commission-free.",
      heroSubhead:
        "Choose the plan that fits your team. No commission on a first visit, no per-booking fee, and no marketplace cut — just a flat monthly price you can see right here.",
      premiumFlow: "Advanced per-stylist buffers & chair/resource management",
      comparison: {
        title: "The actual cost of per-chair pricing",
        body: "A four-chair shop on Booksy pays approximately €80-110 a month in per-seat fees, plus 30% of every new client's first visit. Guest Overflow is a published flat plan with no commission on your bookings and no marketplace cut — you choose your plan, and your regulars never cost you a fee.",
      },
    },
    "tours-experiences": {
      valueUnit: "ticket",
      heroHeadline: "Pricing for tours & experiences. Flat, never per ticket.",
      heroSubhead:
        "Sell direct at a flat cost, whatever your volume. There is no commission and no cancellation fees, and we do not increase the rate without notice.",
      premiumFlow: "Capacity-aware sessions, manifests & group buyouts",
      comparison: {
        title: "The actual cost of marketplace commission",
        body: "Civitatis, GetYourGuide and Viator take 20-30% of every ticket and retain the customer for the next trip; FareHarbor adds 6% to your guests' price. An operator selling 500 tickets a month at €60 pays a marketplace €90,000+ a year. Guest Overflow is a single flat price that does not move, and we never bill you for a cancellation.",
      },
    },
  },
  pt: {
    restaurants: {
      valueUnit: "reserva",
      heroHeadline: "Preços para restaurantes. Fixo, nunca por reserva.",
      heroSubhead:
        "Seja qual for o volume, o preço não se altera. Não existe comissão por pessoa, nem sequer nos clientes habituais que já reservam consigo.",
      premiumFlow: "Gestão de mesas e rotação com controlo de ritmo",
      comparison: {
        title: "O custo real do TheFork",
        body: "O TheFork cobra cerca de 2 a 4 € por pessoa, incluindo os clientes habituais que já reservam consigo. Um mês cheio ultrapassa facilmente os 1.000 €. O Guest Overflow é um preço fixo que não se altera no seu mês mais cheio, e nunca cobra por reserva.",
      },
    },
    hotels: {
      valueUnit: "dormida",
      heroHeadline: "Preços para hotéis. Fixo, e a comissão das OTAs fica consigo.",
      heroSubhead:
        "A Booking leva 15 a 18% de cada estadia. Recupere um pequeno número de reservas diretas por mês e o Guest Overflow já se terá pago. Em Portugal, por lei, pode colocar o seu site abaixo da Booking.",
      premiumFlow: "Tipos de quarto, regras de ocupação e tarifas sazonais",
      comparison: {
        title: "O custo real da comissão das OTAs",
        body: "Um hotel de 20 quartos a 120 € por noite entrega à Booking 50.000 a 63.000 € por ano em comissão. Transfira apenas um quinto dessas estadias para reserva direta e ficará com mais de 10.000 €. É um valor fixo que não se altera e corre no seu próprio Stripe, sem margem nos pagamentos.",
      },
      starterNote: "Para Alojamento Local, 1 a 3 unidades",
      starterBlurb: "Uma página de reservas direta com a sua marca para o seu AL, para que os hóspedes reservem consigo, não na OTA.",
    },
    "spas-wellness": {
      valueUnit: "tratamento",
      heroHeadline: "Preços para spas e bem-estar. Fixo por espaço, nunca por cadeira.",
      heroSubhead:
        "Um preço fixo, independentemente do número de salas ou terapeutas que tiver. Não existe comissão sobre novos clientes, em momento algum.",
      premiumFlow: "Agenda por serviço, duração e por terapeuta",
      comparison: {
        title: "O custo real dos marketplaces",
        body: "A Fresha leva ~20% da primeira marcação de um novo cliente, a Treatwell 25% e a Booksy 30%. Além disso, as ferramentas por lugar cobram mais a cada terapeuta que acrescenta. O Guest Overflow é um preço fixo por espaço, sem comissão sobre os seus clientes e sem penalização por lugar.",
      },
    },
    "salons-barbers": {
      valueUnit: "marcação",
      heroHeadline: "Preços para cabeleireiros e barbearias. Públicos, fixos e sem comissão.",
      heroSubhead:
        "Escolha o plano à medida da sua equipa. Sem comissão na primeira visita, sem taxa por marcação e sem corte de marketplace — apenas uma mensalidade fixa que pode ver aqui mesmo.",
      premiumFlow: "Gestão avançada de intervalos por profissional e de cadeiras/recursos",
      comparison: {
        title: "O custo real do preço por cadeira",
        body: "Um espaço de quatro cadeiras na Booksy paga cerca de 80 a 110 € por mês em taxas por lugar, mais 30% da primeira visita de cada novo cliente. O Guest Overflow é um plano fixo e público, sem comissão nas suas marcações e sem corte de marketplace — escolhe o seu plano, e os seus clientes habituais nunca lhe custam uma taxa.",
      },
    },
    "tours-experiences": {
      valueUnit: "bilhete",
      heroHeadline: "Preços para tours e experiências. Fixo, nunca por bilhete.",
      heroSubhead:
        "Venda direto a um custo fixo, seja qual for o volume. Não existe comissão nem taxas de cancelamento, e não aumentamos a tarifa sem aviso prévio.",
      premiumFlow: "Sessões com gestão de lotação, manifestos e reservas exclusivas",
      comparison: {
        title: "O custo real da comissão dos marketplaces",
        body: "A Civitatis, a GetYourGuide e a Viator levam 20 a 30% de cada bilhete e ficam com o cliente para a próxima viagem; a FareHarbor acrescenta 6% ao preço dos seus clientes. Um operador que vende 500 bilhetes por mês a 60 € entrega a um marketplace mais de 90.000 € por ano. O Guest Overflow é um preço fixo que não se altera, e nunca lhe cobramos por um cancelamento.",
      },
    },
  },
};

function buildSectorPricing(locale: Locale, slug: string): SectorPricing {
  const ui: LadderShape = sectorLadders[locale]?.[slug] ?? pricingLadder[locale];
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
        flatMonthly: true,
        setupFeeEur: p.starterSetup,
      },
      {
        name: ui.essential.name,
        monthlyEur: p.essential,
        priceNote: ui.essential.note,
        blurb: ui.essential.blurb,
        features: [...ui.essential.features],
        featured: true,
        setupFeeEur: p.essentialSetup,
      },
      {
        name: ui.premium.name,
        monthlyEur: p.premium,
        priceNote: ui.premium.note,
        blurb: ui.premium.blurb,
        features: [...ui.premium.lead, c.premiumFlow, ...ui.premium.tail],
        setupFeeEur: p.premiumSetup,
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
        "Table reservations that function as a natural part of your dining room, not a marketplace tab.",
      hero: {
        headline: "Take reservations on your own website.",
        subhead:
          "Guest Overflow provides restaurants with a reservation flow that lives on their own site, carries their brand, and never charges per cover.",
      },
      painPoints: [
        {
          title: "Marketplaces compete for your diners",
          body: "Booking platforms list you directly beside your competitors, and they readily direct your guests toward another establishment's table.",
        },
        {
          title: "Per-cover fees scale against you",
          body: "With commission pricing, a fully booked night is also your most expensive one. The fees steadily reduce the margin on your best services.",
        },
        {
          title: "No-shows remove revenue from prime time slots",
          body: "Without deposits and well-timed reminders, a no-show on a Friday eight-top is revenue that you never recover.",
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
          body: "Regular guests, allergies, anniversaries. All of it remains in your hands, and you may export it whenever you require.",
        },
      ],
      metaDescription:
        "Branded restaurant reservations, on your own booking system. No per-cover commission, deposits for no-show protection, and a guest book you own.",
      pricing: buildSectorPricing("en", "restaurants"),
    },
    {
      slug: "hotels",
      label: "Hotels",
      themeId: "hotel",
      icon: "bed",
      cardBlurb:
        "Direct bookings for boutique hotels, so you retain the OTA commission and own the guest relationship.",
      hero: {
        headline: "Make direct booking the obvious choice.",
        subhead:
          "Boutique hotels lose 15-25% of every OTA stay. Guest Overflow places a polished, brand-true booking flow on your own site so that guests book direct.",
      },
      painPoints: [
        {
          title: "OTAs take a fifth of every stay",
          body: "Online travel agencies charge commissions that far exceed any software cost, and they retain the guest's email permanently.",
        },
        {
          title: "Cumbersome booking engines lose guests",
          body: "Most hotel booking engines resemble airline checkouts, so guests abandon the process partway and book through the OTA instead.",
        },
        {
          title: "No relationship before arrival",
          body: "When the OTA owns the booking, your first genuine contact with a guest occurs at the front desk.",
        },
      ],
      highlights: [
        {
          title: "Room & rate aware",
          body: "Room types, occupancy rules, and seasonal rates presented in a flow that reflects your hotel, not a portal.",
        },
        {
          title: "Direct-booking incentives",
          body: "Present member rates, perks, or packages that make booking direct visibly preferable to the OTA price.",
        },
        {
          title: "Pre-arrival guest profile",
          body: "Preferences and special requests collected at booking, so that the welcome begins before check-in.",
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
        "Treatment bookings as calm as your space, with services, practitioners, and schedules handled gracefully.",
      hero: {
        headline: "A booking experience as calm as your space.",
        subhead:
          "Spas and wellness studios receive a booking flow that matches the character of their brand, with services, durations, and practitioner schedules handled without friction.",
      },
      painPoints: [
        {
          title: "Telephone reservations consume front-desk time",
          body: "Every booking taken by telephone costs staff time, and enquiries that arrive after hours frequently receive no response at all.",
        },
        {
          title: "Generic salon software, generic impression",
          body: "Mass-market booking tools tend to resemble spreadsheets. Your booking page should convey what your space conveys.",
        },
        {
          title: "Late cancellations leave empty rooms",
          body: "An empty treatment room is revenue that you cannot recover, and unprotected bookings render late cancellations cost-free for everyone but you.",
        },
      ],
      highlights: [
        {
          title: "Service & practitioner logic",
          body: "Durations, preparation time, and per-practitioner availability all handled cleanly behind the scenes.",
        },
        {
          title: "Cancellation protection",
          body: "Deposits and tiered cancellation windows keep your treatment rooms earning.",
        },
        {
          title: "Intake built into booking",
          body: "Collect preferences and health notes at the time of booking, so that clients arrive prepared and sessions begin on time.",
        },
      ],
      metaDescription:
        "Branded spa and wellness booking, on your own booking system. Services, practitioners, deposits, and intake, in a flow as calm as your brand.",
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
          "Wineries, tour operators, and experience hosts receive capacity-aware scheduling and direct sales, without marketplace commissions reducing the margin.",
      },
      painPoints: [
        {
          title: "Marketplaces take 20-30% per ticket",
          body: "Experience platforms charge substantial commissions and retain the customer for the next trip as well.",
        },
        {
          title: "Capacity conflicts across channels",
          body: "Selling the same departure in three places results in overbooking or, worse, half-empty sessions.",
        },
        {
          title: "Group bookings handled by email",
          body: "Private tastings and group tours arranged over lengthy email threads consume hours and are overlooked more often than is generally acknowledged.",
        },
      ],
      highlights: [
        {
          title: "Capacity-aware sessions",
          body: "Fixed departures with live seat counts, so that guests see real availability and you never oversell a session.",
        },
        {
          title: "Direct payment, no commission",
          body: "Tickets and tastings sold on your own site at a flat cost, whatever your volume.",
        },
        {
          title: "Private & group requests",
          body: "A structured enquiry flow for buyouts and groups, so that your largest bookings are not lost in your inbox.",
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
        "Appointments that present as your salon, not a booking app, with deposits and rebooking that keep chairs full.",
      hero: {
        headline: "Booking that fits your chair.",
        subhead:
          "Salons and barbershops receive an appointment flow on their own site, themed to their brand, with deposits, per-stylist scheduling, and no commission or per-booking fees.",
      },
      painPoints: [
        {
          title: "Booking apps own your clients",
          body: "Marketplace apps list your shop beside every competitor, take a commission on each booking, and retain the client's details for themselves.",
        },
        {
          title: "No-shows leave the chair empty",
          body: "An empty chair is time that cannot be sold twice. Without deposits and reminders, a missed appointment is lost permanently.",
        },
        {
          title: "The telephone rings mid-service",
          body: "Taking bookings by telephone requires interrupting a service, and calls that arrive after hours frequently go unanswered.",
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
          body: "Preferred stylist, colour formulas, and visit history remain with you, so that the next appointment is one tap away.",
        },
      ],
      metaDescription:
        "Branded booking for hair salons and barbershops, on your own booking system. Per-stylist scheduling, deposits for no-show protection, and client history you own.",
      pricing: buildSectorPricing("en", "salons-barbers"),
    },
  ],
  index: {
    eyebrow: "Industries",
    title: "Built for the way your salon runs.",
    subhead:
      "One booking system, built around how your salon or barbershop operates, with a live demo you can try.",
    seeBooking: (label) => `See ${label.toLowerCase()} booking →`,
  },
  detail: {
    problemEyebrow: "The problem",
    problemTitle: (label) => `What ${label.toLowerCase()} contend with today`,
    liveDemoEyebrow: "Live demo",
    liveDemoTitle: (venue) => `Try a booking at ${venue}.`,
    liveDemoSubhead:
      "The salon is fictional, but the booking page is real. This is how Guest Overflow would perform once tailored to your business.",
    builtInEyebrow: "Built in",
    builtInTitle: (label) => `Guest Overflow for ${label.toLowerCase()}`,
    pricingEyebrow: "Pricing",
    pricingAddOnsTitle: "Optional add-ons",
    pricingCalcCta: "Calculate your savings",
    comparisonFlat: "Flat, with no commission, ever.",
    seePricing: "See pricing",
    footerHeadline: "Set up a booking system of your own.",
    footerSubhead: "See Guest Overflow themed for a salon like yours in a 20-minute demo.",
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
        "Reservas de mesa que constituem uma parte natural da sua sala, não um separador de marketplace.",
      hero: {
        headline: "Receba reservas no seu próprio site.",
        subhead:
          "O Guest Overflow disponibiliza aos restaurantes um fluxo de reservas que vive no seu próprio site, apresenta a sua marca e nunca cobra por reserva.",
      },
      painPoints: [
        {
          title: "Os marketplaces disputam os seus clientes",
          body: "As plataformas de reservas apresentam-no mesmo ao lado dos concorrentes, e não hesitam em direcionar os seus clientes para a mesa de outro.",
        },
        {
          title: "As taxas por reserva crescem contra si",
          body: "Com comissões, uma noite esgotada é também a mais cara. As taxas reduzem progressivamente a margem dos seus melhores serviços.",
        },
        {
          title: "As faltas retiram receita dos melhores horários",
          body: "Sem sinais e lembretes na hora certa, uma falta numa mesa de oito à sexta-feira é receita que não volta a recuperar.",
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
          body: "Clientes habituais, alergias, aniversários. Tudo permanece nas suas mãos, e poderá exportá-lo quando pretender.",
        },
      ],
      metaDescription:
        "Reservas de restaurante com a sua marca, no seu próprio sistema. Sem comissão por reserva, sinais contra faltas e um livro de clientes que é seu.",
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
          "Os hotéis boutique perdem 15 a 25% de cada estadia vendida por OTA. O Guest Overflow coloca um fluxo de reserva cuidado e fiel à marca no seu próprio site, para que os hóspedes reservem diretamente.",
      },
      painPoints: [
        {
          title: "As OTAs levam um quinto de cada estadia",
          body: "As agências de viagens online cobram comissões que ultrapassam largamente qualquer custo de software, e ficam permanentemente com o email do hóspede.",
        },
        {
          title: "Motores de reserva pesados afastam hóspedes",
          body: "A maioria dos motores de reserva de hotel assemelha-se a um checkout de companhia aérea, pelo que os hóspedes desistem a meio e acabam por reservar na OTA.",
        },
        {
          title: "Nenhuma relação antes da chegada",
          body: "Quando a reserva pertence à OTA, o primeiro contacto real com o hóspede ocorre na receção.",
        },
      ],
      highlights: [
        {
          title: "A pensar em quartos e tarifas",
          body: "Tipos de quarto, regras de ocupação e tarifas sazonais apresentados num fluxo que reflete o seu hotel, não um portal.",
        },
        {
          title: "Incentivos à reserva direta",
          body: "Destaque tarifas de membro, vantagens ou pacotes que tornem a reserva direta visivelmente preferível ao preço da OTA.",
        },
        {
          title: "Perfil do hóspede antes da chegada",
          body: "Preferências e pedidos especiais recolhidos na reserva, para que o acolhimento comece antes do check-in.",
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
          body: "Cada marcação por telefone custa tempo à equipa, e os contactos fora de horas frequentemente ficam sem resposta.",
        },
        {
          title: "Software genérico, experiência genérica",
          body: "As ferramentas de marcação massificadas assemelham-se a folhas de cálculo. A sua página de marcações deveria transmitir aquilo que o seu espaço transmite.",
        },
        {
          title: "Cancelamentos tardios deixam salas vazias",
          body: "Uma sala de tratamento vazia é receita irrecuperável, e as marcações sem proteção tornam o cancelamento tardio isento de custo para todos exceto para si.",
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
          body: "Preferências e notas de saúde recolhidas no momento da marcação, para que os clientes cheguem preparados e as sessões comecem a horas.",
        },
      ],
      metaDescription:
        "Marcações com a sua marca para spas e bem-estar, no seu próprio sistema. Serviços, terapeutas, sinais e fichas de cliente, num fluxo tão calmo como a sua marca.",
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
          "Quintas, operadores de tours e anfitriões de experiências recebem agendamento com gestão de lotação e vendas diretas, sem comissões de marketplace a reduzir a margem.",
      },
      painPoints: [
        {
          title: "Os marketplaces levam 20 a 30% por bilhete",
          body: "As plataformas de experiências cobram comissões elevadas e ficam com o cliente para a próxima viagem.",
        },
        {
          title: "Conflitos de lotação entre canais",
          body: "Vender a mesma partida em três sítios resulta em overbooking ou, pior, em sessões meio vazias.",
        },
        {
          title: "Reservas de grupo geridas por email",
          body: "Provas privadas e tours de grupo negociados em longas trocas de email consomem horas e são esquecidos mais vezes do que é reconhecido.",
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
          "Salões e barbearias recebem o seu próprio sistema de marcações, com a sua marca, sinais, agenda por profissional e sem comissões nem taxas por marcação.",
      },
      painPoints: [
        {
          title: "As apps ficam com os seus clientes",
          body: "As apps de marcações colocam o seu espaço ao lado de todos os concorrentes, cobram uma comissão sobre cada marcação e guardam os dados do cliente para si.",
        },
        {
          title: "As faltas deixam a cadeira vazia",
          body: "Uma cadeira vazia é tempo que não se vende duas vezes. Sem sinais e lembretes, uma falta é receita perdida.",
        },
        {
          title: "O telefone toca a meio do serviço",
          body: "Aceitar marcações por telefone obriga a interromper o serviço, e as chamadas fora de horas ficam frequentemente sem resposta.",
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
          body: "Profissional preferido, fórmulas de cor e histórico de visitas permanecem consigo, para que a próxima marcação fique a um toque.",
        },
      ],
      metaDescription:
        "Marcações com a sua marca para cabeleireiros e barbearias, no seu próprio sistema. Agenda por profissional, sinais contra faltas e histórico de cliente que é seu.",
      pricing: buildSectorPricing("pt", "salons-barbers"),
    },
  ],
  index: {
    eyebrow: "Setores",
    title: "Feito para a forma como o seu salão trabalha.",
    subhead:
      "Um único sistema de reservas, à medida de como o seu salão ou barbearia funciona, com uma demonstração ao vivo que pode experimentar.",
    seeBooking: (label) => `Ver reservas para ${label.toLowerCase()} →`,
  },
  detail: {
    problemEyebrow: "O problema",
    problemTitle: (label) => `O que ${label.toLowerCase()} enfrentam hoje`,
    liveDemoEyebrow: "Demo ao vivo",
    liveDemoTitle: (venue) => `Experimente reservar no ${venue}.`,
    liveDemoSubhead:
      "O salão é fictício, mas a página de reservas é real. É assim que o Guest Overflow funcionaria depois de adaptado ao seu negócio.",
    builtInEyebrow: "Incluído",
    builtInTitle: (label) => `Guest Overflow para ${label.toLowerCase()}`,
    pricingEyebrow: "Preços",
    pricingAddOnsTitle: "Extras opcionais",
    pricingCalcCta: "Calcule a sua poupança",
    comparisonFlat: "Fixo, sem comissão, nunca.",
    seePricing: "Ver preços",
    footerHeadline: "Monte o seu próprio sistema de reservas.",
    footerSubhead:
      "Veja o Guest Overflow com o tema de um salão como o seu numa demonstração de 20 minutos.",
  },
};

export const industriesContent: Record<Locale, IndustriesStrings> = { en, pt };

/**
 * Active slugs only (locale-independent); used by generateStaticParams and the
 * sitemap. Stashed verticals stay in `industries` above but are filtered out by
 * `isActiveSector` - see `lib/sectors.ts`.
 */
export const industrySlugs = en.industries
  .filter((i) => isActiveSector(i.slug))
  .map((i) => i.slug);

/** The active industries for a locale, in display order - used by the hubs. */
export function getActiveIndustries(locale: Locale): IndustryContent[] {
  return industriesContent[locale].industries.filter((i) =>
    isActiveSector(i.slug),
  );
}

export function getIndustry(
  locale: Locale,
  slug: string,
): IndustryContent | undefined {
  if (!isActiveSector(slug)) return undefined;
  return industriesContent[locale].industries.find((i) => i.slug === slug);
}
