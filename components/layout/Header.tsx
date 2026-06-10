"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
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
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Link href="/" aria-label="GuestFlow home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
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
          <Button
            href={site.cta.primary.href}
            analyticsLabel="header_book_demo"
          >
            {site.cta.primary.label}
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button
            href={site.cta.primary.href}
            size="md"
            className="px-4 py-2"
            analyticsLabel="header_book_demo_mobile"
          >
            Demo
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
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-3 font-display text-2xl text-cream transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href={site.cta.primary.href}
              size="lg"
              className="w-full"
              analyticsLabel="mobile_nav_book_demo"
            >
              {site.cta.primary.label}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
