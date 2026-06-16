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

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = siteStrings[locale];

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 50,
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md shadow-card"
          : "border-b border-line bg-ink/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" aria-label="Guest Overflow home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {t.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-cream",
                pathname.startsWith(link.href)
                  ? "text-cream"
                  : "text-cream-dim",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <Button href={t.cta.primary.href} analyticsLabel="header_book_demo">
            {t.cta.primary.label}
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button
            href={t.cta.primary.href}
            size="md"
            className="px-4 py-2"
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
            className="flex h-10 w-10 items-center justify-center text-cream"
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

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="h-screen border-t border-line bg-ink px-6 pt-6 md:hidden"
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
          <div className="mt-6">
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
    </header>
  );
}
