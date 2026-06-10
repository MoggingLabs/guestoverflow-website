import type { VenueTheme, VenueThemeId } from "@/types/content";

/**
 * The four fictional venues that power the white-label demo. Each theme
 * restyles the same widget via CSS custom properties — the entire
 * product pitch in one interaction. The spa theme is deliberately light
 * to prove the engine isn't dark-only.
 */
export const venueThemes: VenueTheme[] = [
  {
    id: "fine-dining",
    label: "Fine dining",
    venueName: "Maison Adler",
    tagline: "Contemporary tasting menus · Lisbon",
    unitLabel: "Guests",
    unitOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    ctaLabel: "Reserve a table",
    confirmationNote: "We hold tables for 15 minutes past the reservation time.",
    colors: {
      bg: "#100d0b",
      surface: "#1a1512",
      accent: "#c89b5a",
      accentText: "#14100c",
      text: "#f2ece2",
      muted: "#9c917f",
      line: "#2e261f",
    },
    slots: { open: 18, close: 23, intervalMin: 30 },
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
    colors: {
      bg: "#0e1418",
      surface: "#162026",
      accent: "#7fa8b8",
      accentText: "#0b1216",
      text: "#e9f0f2",
      muted: "#8da3ac",
      line: "#243038",
    },
    slots: { open: 14, close: 20, intervalMin: 60 },
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
    colors: {
      bg: "#f2f1ea",
      surface: "#faf9f4",
      accent: "#5d7558",
      accentText: "#f5f6f0",
      text: "#33382f",
      muted: "#7d8377",
      line: "#dcdacd",
    },
    slots: { open: 9, close: 19, intervalMin: 60 },
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
    colors: {
      bg: "#150c10",
      surface: "#201217",
      accent: "#b85c6e",
      accentText: "#170d10",
      text: "#f1e8ea",
      muted: "#a08b91",
      line: "#332128",
    },
    slots: { open: 17, close: 24, intervalMin: 30 },
  },
];

export function getVenueTheme(id: VenueThemeId): VenueTheme {
  return venueThemes.find((t) => t.id === id) ?? venueThemes[0];
}
