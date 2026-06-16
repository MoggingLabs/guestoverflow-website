"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { siteStrings } from "@/content/site";
import { useLocale } from "@/lib/locale-client";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

// Shared expo-out easing for the island morph, premium and unhurried.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = siteStrings[locale];

  // Past a short threshold the full-width bar condenses into a floating island.
  const island = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-[450ms]",
          EASE,
          island ? "px-3 pt-3 md:px-4 md:pt-4" : "px-0 pt-0",
        )}
      >
        <div
          className={cn(
            "w-full backdrop-blur-md transition-all duration-[450ms]",
            EASE,
            island
              ? "max-w-6xl rounded-2xl border border-line bg-ink/90 shadow-[0_12px_44px_-12px_rgb(11_28_48/0.28)] backdrop-blur-xl"
              : "max-w-[120rem] rounded-none border-x-0 border-t-0 border-b border-line bg-ink/70 shadow-none",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 px-4 transition-[height] duration-[450ms] md:px-6",
              EASE,
              island ? "h-14" : "h-16",
            )}
          >
            <Link
              href="/"
              aria-label="Guest Overflow home"
              className="shrink-0"
            >
              <Logo />
            </Link>

            <nav
              aria-label="Main"
              className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            >
              {t.navLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors duration-200",
                      active
                        ? "text-cream"
                        : "text-cream-dim hover:bg-raised/70 hover:text-cream",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <LanguageToggle />
              <Button
                href={t.cta.tertiary.href}
                variant="tertiary"
                size="sm"
                analyticsLabel="header_start_free"
              >
                {t.cta.tertiary.label}
              </Button>
              <Button
                href={t.cta.primary.href}
                size="sm"
                analyticsLabel="header_book_demo"
              >
                {t.cta.primary.label}
              </Button>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
              <Button
                href={t.cta.primary.href}
                size="sm"
                analyticsLabel="header_book_demo_mobile"
              >
                {t.navDemoShort}
              </Button>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-cream transition-colors hover:bg-raised/70"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {open ? (
                    <path
                      d="m4 4 12 12M16 4 4 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M3 5.5h14M3 10h14M3 14.5h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-0 top-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-24 lg:hidden"
        >
          <ul className="space-y-1">
            {t.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 font-display text-2xl text-cream transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LanguageToggle />
          </div>
          <div className="mt-6 space-y-3">
            <Button
              href={t.cta.tertiary.href}
              size="lg"
              variant="tertiary"
              className="w-full"
              onClick={() => setOpen(false)}
              analyticsLabel="mobile_nav_start_free"
            >
              {t.cta.tertiary.label}
            </Button>
            <Button
              href={t.cta.primary.href}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
              analyticsLabel="mobile_nav_book_demo"
            >
              {t.cta.primary.label}
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
