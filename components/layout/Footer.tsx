import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site, siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";
import { isActiveSector } from "@/lib/sectors";

/** Hide footer links that point at stashed verticals or stashed campaigns. */
function isStashedLink(href: string): boolean {
  const industry = href.match(/^\/industries\/(.+)$/);
  if (industry) return !isActiveSector(industry[1]);
  if (href === "/quandoo") return true;
  return false;
}

export async function Footer() {
  const t = siteStrings[await getLocale()];
  const columns = t.footerColumns
    .map((col) => ({
      ...col,
      links: col.links.filter((link) => !isStashedLink(link.href)),
    }))
    .filter((col) => col.links.length > 0);

  return (
    <footer className="border-t border-line bg-surface/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Link href="/" aria-label="Guest Overflow home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-faint">
              {t.footerBlurb}
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-cream-faint">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
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

        <div className="mt-14 border-t border-line pt-7">
          <p className="text-center text-xs font-medium tracking-wide text-amber">
            {t.footerNote}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-xs text-cream-faint md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}, {t.footerProductOf}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-cream"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
