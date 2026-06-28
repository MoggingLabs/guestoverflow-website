"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Overview", href: "/admin" },
  { label: "Funnel", href: "/admin/funnel" },
  { label: "Friction", href: "/admin/friction" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Outbound", href: "/admin/outreach" },
  { label: "Clients", href: "/admin/clients" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="space-y-1">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-raised text-cream"
                : "text-cream-dim hover:bg-surface hover:text-cream",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
