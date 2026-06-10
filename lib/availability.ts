import type { VenueTheme } from "@/types/content";

export type Slot = {
  /** Display label, e.g. "7:30 PM". */
  label: string;
  status: "open" | "limited" | "full";
};

/** Deterministic hash so availability is stable for a given date+venue. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function formatSlot(hour: number, minute: number): string {
  const h12 = ((hour + 11) % 12) + 1;
  const period = hour >= 12 ? "PM" : "AM";
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

/**
 * Generates believable availability for the demo widget: ~25% of slots
 * fully booked and a couple marked "2 left". Pure function of
 * (dateKey, venue) — same inputs, same output, so SSR and client agree.
 */
export function getSlots(dateKey: string, venue: VenueTheme): Slot[] {
  const { open, close, intervalMin } = venue.slots;
  const slots: Slot[] = [];

  for (let m = open * 60; m < close * 60; m += intervalMin) {
    const hour = Math.floor(m / 60);
    const minute = m % 60;
    const seed = hash(`${venue.id}:${dateKey}:${m}`);
    const roll = seed % 100;

    slots.push({
      label: formatSlot(hour, minute),
      status: roll < 25 ? "full" : roll < 40 ? "limited" : "open",
    });
  }

  // Never strand the user on a fully-booked day: force a few open slots.
  if (!slots.some((s) => s.status === "open")) {
    for (let i = 0; i < slots.length; i += 2) slots[i].status = "open";
  }

  return slots;
}

/** The next `count` days starting tomorrow, as selectable dates. */
export function getSelectableDates(from: Date, count = 14): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setDate(d.getDate() + 1 + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });
}
