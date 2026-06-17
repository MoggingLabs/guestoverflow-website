"use client";

import Link from "next/link";
import { formStrings } from "@/content/form";
import { useLocale } from "@/lib/locale-client";
import { SHOW_LIVE_DEMO } from "@/lib/features";

export function DemoFormSuccess() {
  const t = formStrings[useLocale()].success;

  return (
    <div
      role="status"
      className="rounded-lg border border-line bg-surface p-10 text-center shadow-card"
    >
      <div
        aria-hidden
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="m5.5 11.5 4 4 7-9"
            stroke="var(--color-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-2xl font-medium text-cream">
        {t.title}
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
        {t.body}
      </p>
      {SHOW_LIVE_DEMO && (
        <p className="mt-6 text-sm text-cream-faint">
          {t.meanwhile}{" "}
          <Link
            href="/#live-demo"
            className="text-amber underline underline-offset-2 hover:text-amber-bright"
          >
            {t.tryDemo}
          </Link>
          .
        </p>
      )}
    </div>
  );
}
