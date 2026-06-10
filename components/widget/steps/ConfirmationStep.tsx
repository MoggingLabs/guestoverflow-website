"use client";

import Link from "next/link";
import { WG } from "@/components/widget/wgStyles";
import type { BookingState } from "@/components/widget/useBookingMachine";
import type { VenueTheme } from "@/types/content";
import { formatDateFull } from "@/lib/utils";

/** Deterministic, friendly-looking confirmation code for the demo. */
function confirmationCode(state: BookingState): string {
  const seed = `${state.dateKey}:${state.time}:${state.partySize}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `GF-${String(1000 + (h % 9000))}`;
}

export function ConfirmationStep({
  state,
  theme,
  onReset,
}: {
  state: BookingState;
  theme: VenueTheme;
  onReset: () => void;
}) {
  const date = state.dateKey ? new Date(`${state.dateKey}T12:00:00`) : null;

  return (
    <div role="status" className="text-center">
      <div
        aria-hidden
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full [background:var(--wg-accent)]"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="m5.5 11.5 4 4 7-9"
            stroke="var(--wg-accent-text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="mt-4 font-display text-lg font-medium [color:var(--wg-text)]">
        Booking confirmed
      </p>
      <p className={`mt-1 ${WG.hint}`}>
        Confirmation {confirmationCode(state)} · {theme.venueName}
      </p>

      <dl className="mx-auto mt-5 max-w-xs space-y-2 rounded-md border p-4 text-left text-sm [border-color:var(--wg-line)] [background:var(--wg-surface)]">
        <div className="flex justify-between gap-4">
          <dt className="[color:var(--wg-muted)]">Date</dt>
          <dd className="[color:var(--wg-text)]">
            {date ? formatDateFull(date) : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="[color:var(--wg-muted)]">{theme.unitLabel}</dt>
          <dd className="[color:var(--wg-text)]">{state.partySize}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="[color:var(--wg-muted)]">Time</dt>
          <dd className="[color:var(--wg-text)]">{state.time}</dd>
        </div>
      </dl>

      <p className={`mt-4 ${WG.hint}`}>{theme.confirmationNote}</p>

      <div className="mt-6 space-y-3">
        <button type="button" onClick={onReset} className={WG.primaryButton}>
          Make another booking
        </button>
        <p className={WG.hint}>
          Want this on your site?{" "}
          <Link
            href="/book-a-demo"
            className="underline underline-offset-2 [color:var(--wg-accent)]"
          >
            Book a demo
          </Link>
        </p>
      </div>
    </div>
  );
}
