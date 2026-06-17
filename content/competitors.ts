import type { Locale } from "@/lib/i18n-shared";

/** Calculator sectors, keyed by the industry slugs so `?sector=` deep-links. */
export type FeeSector =
  | "restaurants"
  | "hotels"
  | "spas-wellness"
  | "salons-barbers"
  | "tours-experiences";

/**
 * A competitor's fee model. Either a per-unit € fee (`perUnit*`) or a
 * %-of-ticket commission (`pct*`). Ranges (low/high) drive a savings range.
 * Locale-independent: only the display `name` and the math live here.
 */
export type CommissionModel = {
  id: string;
  name: string;
  perUnitLow?: number;
  perUnitHigh?: number;
  /** Fraction 0-1 of the average ticket. */
  pctLow?: number;
  pctHigh?: number;
  /** Flat monthly € on top, if any. */
  fixedMonthly?: number;
  /** Fee also hits repeat/returning guests → eligible for the tax callout. */
  repeatGuestTax: boolean;
};

export type SectorCalc = {
  /** Slider bounds for monthly volume (covers, room-nights, clients, tickets…). */
  volumeMin: number;
  volumeMax: number;
  volumeStep: number;
  volumeDefault: number;
  /** Average ticket €. Converts % models to € and is editable in the UI. */
  avgTicketEur: number;
  competitors: CommissionModel[];
};

/** Locale-independent fee math, anchored to PT competitor reality (June 2026). */
export const sectorCalculators: Record<FeeSector, SectorCalc> = {
  restaurants: {
    volumeMin: 0,
    volumeMax: 3000,
    volumeStep: 50,
    volumeDefault: 1000,
    avgTicketEur: 25,
    competitors: [
      { id: "thefork", name: "TheFork", perUnitLow: 2, perUnitHigh: 4, repeatGuestTax: true },
    ],
  },
  hotels: {
    volumeMin: 0,
    volumeMax: 1500,
    volumeStep: 25,
    volumeDefault: 300,
    avgTicketEur: 120,
    competitors: [
      { id: "booking", name: "Booking.com", pctLow: 0.15, pctHigh: 0.18, repeatGuestTax: true },
    ],
  },
  "spas-wellness": {
    volumeMin: 0,
    volumeMax: 400,
    volumeStep: 10,
    volumeDefault: 80,
    avgTicketEur: 60,
    competitors: [
      { id: "fresha", name: "Fresha", pctLow: 0.2, pctHigh: 0.2, repeatGuestTax: true },
      { id: "treatwell", name: "Treatwell", pctLow: 0.25, pctHigh: 0.25, repeatGuestTax: true },
      { id: "booksy", name: "Booksy", pctLow: 0.3, pctHigh: 0.3, repeatGuestTax: true },
    ],
  },
  "salons-barbers": {
    volumeMin: 0,
    volumeMax: 500,
    volumeStep: 10,
    volumeDefault: 100,
    avgTicketEur: 25,
    competitors: [
      { id: "booksy", name: "Booksy", pctLow: 0.3, pctHigh: 0.3, repeatGuestTax: true },
      { id: "fresha", name: "Fresha", pctLow: 0.2, pctHigh: 0.2, repeatGuestTax: true },
    ],
  },
  "tours-experiences": {
    volumeMin: 0,
    volumeMax: 3000,
    volumeStep: 50,
    volumeDefault: 500,
    avgTicketEur: 60,
    competitors: [
      { id: "marketplace", name: "Civitatis / GYG / Viator", pctLow: 0.2, pctHigh: 0.3, repeatGuestTax: true },
      { id: "fareharbor", name: "FareHarbor", pctLow: 0.06, pctHigh: 0.06, repeatGuestTax: false },
    ],
  },
};

export const feeSectors = Object.keys(sectorCalculators) as FeeSector[];

type CalculatorStrings = {
  eyebrow: string;
  title: string;
  subhead: string;
  sectorLabel: string;
  sectorNames: Record<FeeSector, string>;
  /** Singular value-unit per sector, used in copy. */
  unit: Record<FeeSector, string>;
  /** Plural value-unit per sector, used on the slider/axis. */
  unitPlural: Record<FeeSector, string>;
  volumeLabel: (unitPlural: string) => string;
  avgTicketLabel: string;
  tierLabel: string;
  billingMonthly: string;
  billingAnnual: string;
  goLineLabel: string;
  savingsHeading: string;
  savesPerYear: (amount: string, competitor: string) => string;
  costsPerYear: (amount: string, competitor: string) => string;
  repeatTax: (amount: string) => string;
  breakEven: (tier: string, n: number, unit: string) => string;
  perUnitFee: (amount: string, unit: string) => string;
  pctFee: (pct: string) => string;
  flatYou: (amount: string) => string;
  disclaimer: string;
};

export const calculatorContent: Record<Locale, CalculatorStrings> = {
  en: {
    eyebrow: "Savings calculator",
    title: "See what commission actually costs you",
    subhead:
      "Set the slider to your monthly volume. The flat line is Guest Overflow; the rising line is what a commission platform bills as you grow.",
    sectorLabel: "Your business",
    sectorNames: {
      restaurants: "Restaurant",
      hotels: "Hotel / AL",
      "spas-wellness": "Spa & wellness",
      "salons-barbers": "Salon & barber",
      "tours-experiences": "Tours & experiences",
    },
    unit: {
      restaurants: "cover",
      hotels: "room-night",
      "spas-wellness": "new client",
      "salons-barbers": "new client",
      "tours-experiences": "ticket",
    },
    unitPlural: {
      restaurants: "covers",
      hotels: "room-nights",
      "spas-wellness": "new clients",
      "salons-barbers": "new clients",
      "tours-experiences": "tickets",
    },
    volumeLabel: (u) => `${u} per month`,
    avgTicketLabel: "Average ticket",
    tierLabel: "Compare against",
    billingMonthly: "Monthly",
    billingAnnual: "Annual",
    goLineLabel: "Guest Overflow (flat)",
    savingsHeading: "Your savings, per year",
    savesPerYear: (amount, c) => `You would retain ${amount} a year versus ${c}`,
    costsPerYear: (amount, c) => `${c} would bill you ${amount}/year`,
    repeatTax: (amount) =>
      `≈ ${amount} of that is the repeat-client tax: a charge for clients who had already chosen you.`,
    breakEven: (tier, n, unit) => `${tier} pays for itself at ~${n} ${unit}/mo.`,
    perUnitFee: (amount, unit) => `${amount} per ${unit}`,
    pctFee: (pct) => `${pct} per booking`,
    flatYou: (amount) => `${amount}/mo flat, at any volume`,
    disclaimer:
      "Estimates based on typical Portuguese ticket values and published competitor fees. Your figures may vary.",
  },
  pt: {
    eyebrow: "Calculadora de poupança",
    title: "Veja o que a comissão lhe custa realmente",
    subhead:
      "Ajuste o cursor ao seu volume mensal. A linha plana é o Guest Overflow; a linha ascendente é o que uma plataforma de comissões cobra à medida que cresce.",
    sectorLabel: "O seu negócio",
    sectorNames: {
      restaurants: "Restaurante",
      hotels: "Hotel / AL",
      "spas-wellness": "Spa e bem-estar",
      "salons-barbers": "Cabeleireiro e barbearia",
      "tours-experiences": "Tours e experiências",
    },
    unit: {
      restaurants: "reserva",
      hotels: "dormida",
      "spas-wellness": "novo cliente",
      "salons-barbers": "novo cliente",
      "tours-experiences": "bilhete",
    },
    unitPlural: {
      restaurants: "reservas",
      hotels: "dormidas",
      "spas-wellness": "novos clientes",
      "salons-barbers": "novos clientes",
      "tours-experiences": "bilhetes",
    },
    volumeLabel: (u) => `${u} por mês`,
    avgTicketLabel: "Ticket médio",
    tierLabel: "Comparar com",
    billingMonthly: "Mensal",
    billingAnnual: "Anual",
    goLineLabel: "Guest Overflow (fixo)",
    savingsHeading: "A sua poupança, por ano",
    savesPerYear: (amount, c) => `Reteria ${amount} por ano face à ${c}`,
    costsPerYear: (amount, c) => `A ${c} cobrar-lhe-ia ${amount}/ano`,
    repeatTax: (amount) =>
      `≈ ${amount} disso é a taxa sobre clientes habituais: uma cobrança por clientes que já o tinham escolhido.`,
    breakEven: (tier, n, unit) => `O ${tier} paga-se a partir de ~${n} ${unit}/mês.`,
    perUnitFee: (amount, unit) => `${amount} por ${unit}`,
    pctFee: (pct) => `${pct} por reserva`,
    flatYou: (amount) => `${amount}/mês fixo, em qualquer volume`,
    disclaimer:
      "Estimativas com base em tickets médios típicos em Portugal e nas taxas publicadas dos concorrentes. Os seus valores podem variar.",
  },
};
