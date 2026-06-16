import type { VenueTheme, VenueThemeId } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

/**
 * The five fictional venues that power the white-label demo. Each theme
 * restyles the same widget via CSS custom properties. The spa theme is
 * deliberately light to prove the engine isn't dark-only.
 */
const COLORS: Record<VenueThemeId, VenueTheme["colors"]> = {
  "fine-dining": {
    bg: "#0e1a28",
    surface: "#152436",
    accent: "#cdb487",
    accentText: "#14110a",
    text: "#eef2f8",
    muted: "#93a3b5",
    line: "#233347",
  },
  hotel: {
    bg: "#0d2733",
    surface: "#133241",
    accent: "#5fb8bb",
    accentText: "#06161a",
    text: "#e8f1f3",
    muted: "#8fb0b6",
    line: "#1f3f4d",
  },
  spa: {
    bg: "#eef5f3",
    surface: "#ffffff",
    accent: "#08696b",
    accentText: "#f3f8f7",
    text: "#143230",
    muted: "#5f7b78",
    line: "#d3e2de",
  },
  "wine-bar": {
    bg: "#0a1622",
    surface: "#11202e",
    accent: "#86d3d5",
    accentText: "#07151a",
    text: "#e9eff3",
    muted: "#8b9bab",
    line: "#1c2c3b",
  },
  // Cool soft-white with a navy accent, the modern monochrome light theme.
  salon: {
    bg: "#f4f6fa",
    surface: "#ffffff",
    accent: "#0f1c2c",
    accentText: "#ffffff",
    text: "#0f1c2c",
    muted: "#5b6b7d",
    line: "#dde3ec",
  },
};

const SLOTS: Record<VenueThemeId, VenueTheme["slots"]> = {
  "fine-dining": { open: 18, close: 23, intervalMin: 30 },
  hotel: { open: 14, close: 20, intervalMin: 60 },
  spa: { open: 9, close: 19, intervalMin: 60 },
  "wine-bar": { open: 17, close: 24, intervalMin: 30 },
  salon: { open: 9, close: 19, intervalMin: 30 },
};

const en: VenueTheme[] = [
  {
    id: "fine-dining",
    label: "Fine dining",
    venueName: "Maison Adler",
    tagline: "Contemporary tasting menus · Lisbon",
    unitLabel: "Guests",
    unitOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    ctaLabel: "Reserve a table",
    confirmationNote: "We hold tables for 15 minutes past the reservation time.",
    colors: COLORS["fine-dining"],
    slots: SLOTS["fine-dining"],
  },
  {
    id: "hotel",
    label: "Hotel",
    venueName: "The Larkspur Hotel",
    tagline: "Eighteen rooms above the harbour",
    unitLabel: "Rooms",
    unitOptions: [1, 2, 3],
    ctaLabel: "Book your stay",
    confirmationNote: "Check-in from 3:00 PM. We'll email directions and your door code.",
    colors: COLORS.hotel,
    slots: SLOTS.hotel,
  },
  {
    id: "spa",
    label: "Spa",
    venueName: "Stillwater Spa",
    tagline: "Slow rituals & thermal baths",
    unitLabel: "People",
    unitOptions: [1, 2],
    ctaLabel: "Book treatment",
    confirmationNote: "Please arrive 20 minutes early to begin unwinding.",
    colors: COLORS.spa,
    slots: SLOTS.spa,
  },
  {
    id: "wine-bar",
    label: "Wine bar",
    venueName: "Cuvée",
    tagline: "Natural wines & small plates",
    unitLabel: "Seats",
    unitOptions: [1, 2, 3, 4, 5, 6],
    ctaLabel: "Reserve seats",
    confirmationNote: "Walk-ins are welcome at the bar. Reserved seats are at the tasting counter.",
    colors: COLORS["wine-bar"],
    slots: SLOTS["wine-bar"],
  },
  {
    id: "salon",
    label: "Salon",
    venueName: "Fade & Bloom",
    tagline: "Cuts, colour & classic shaves",
    unitLabel: "Guests",
    unitOptions: [1, 2],
    ctaLabel: "Book appointment",
    confirmationNote: "Please arrive 5 minutes early. Let us know if you're running late and we'll hold your chair.",
    colors: COLORS.salon,
    slots: SLOTS.salon,
  },
];

const pt: VenueTheme[] = [
  {
    id: "fine-dining",
    label: "Fine dining",
    venueName: "Maison Adler",
    tagline: "Menus de degustação contemporâneos · Lisboa",
    unitLabel: "Pessoas",
    unitOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    ctaLabel: "Reservar mesa",
    confirmationNote: "Guardamos as mesas até 15 minutos depois da hora da reserva.",
    colors: COLORS["fine-dining"],
    slots: SLOTS["fine-dining"],
  },
  {
    id: "hotel",
    label: "Hotel",
    venueName: "The Larkspur Hotel",
    tagline: "Dezoito quartos sobre o porto",
    unitLabel: "Quartos",
    unitOptions: [1, 2, 3],
    ctaLabel: "Reservar estadia",
    confirmationNote: "Check-in a partir das 15h00. Enviamos as direções e o código da porta por email.",
    colors: COLORS.hotel,
    slots: SLOTS.hotel,
  },
  {
    id: "spa",
    label: "Spa",
    venueName: "Stillwater Spa",
    tagline: "Rituais lentos e banhos termais",
    unitLabel: "Pessoas",
    unitOptions: [1, 2],
    ctaLabel: "Marcar tratamento",
    confirmationNote: "Chegue 20 minutos antes para começar a desligar.",
    colors: COLORS.spa,
    slots: SLOTS.spa,
  },
  {
    id: "wine-bar",
    label: "Wine bar",
    venueName: "Cuvée",
    tagline: "Vinhos naturais e petiscos",
    unitLabel: "Lugares",
    unitOptions: [1, 2, 3, 4, 5, 6],
    ctaLabel: "Reservar lugares",
    confirmationNote: "Sem reserva é no balcão. Os lugares reservados são no balcão de provas.",
    colors: COLORS["wine-bar"],
    slots: SLOTS["wine-bar"],
  },
  {
    id: "salon",
    label: "Cabeleireiro",
    venueName: "Fade & Bloom",
    tagline: "Cortes, cor e barbas clássicas",
    unitLabel: "Pessoas",
    unitOptions: [1, 2],
    ctaLabel: "Marcar hora",
    confirmationNote: "Chegue 5 minutos antes. Avise-nos se se atrasar e guardamos a sua vez.",
    colors: COLORS.salon,
    slots: SLOTS.salon,
  },
];

export const venueThemesByLocale: Record<Locale, VenueTheme[]> = { en, pt };

/** English list kept for non-localized callers (seed script, defaults). */
export const venueThemes = en;

export function getVenueTheme(id: VenueThemeId, locale: Locale = "en"): VenueTheme {
  const list = venueThemesByLocale[locale];
  return list.find((t) => t.id === id) ?? list[0];
}
