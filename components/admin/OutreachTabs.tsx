"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  {
    label: "Campaigns",
    href: "/admin/outreach",
    match: (p: string) =>
      !p.startsWith("/admin/outreach/templates") &&
      !p.startsWith("/admin/outreach/sent"),
  },
  {
    label: "Templates",
    href: "/admin/outreach/templates",
    match: (p: string) => p.startsWith("/admin/outreach/templates"),
  },
  {
    label: "Sent emails",
    href: "/admin/outreach/sent",
    match: (p: string) => p.startsWith("/admin/outreach/sent"),
  },
];

export function OutreachTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-line" aria-label="Outbound sections">
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors",
              active
                ? "border-amber text-cream"
                : "border-transparent text-cream-faint hover:text-cream",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
