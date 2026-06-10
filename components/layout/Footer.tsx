import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" aria-label="GuestFlow home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-faint">
              White-label online booking for restaurants, hotels, spas, and
              experiences.
            </p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-cream-faint">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-dim transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-xs text-cream-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — a {site.company}{" "}
            product.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-cream"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
