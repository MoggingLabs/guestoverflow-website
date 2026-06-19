import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { getActiveIndustries } from "@/content/industries";
import { getLocale } from "@/lib/i18n";
import { publicSlugFor } from "@/lib/sectors";
import { cn } from "@/lib/utils";

/**
 * The sector picker on the hub (`/`). Renders a card per ACTIVE sector that
 * links to that sector's mini-site at `/industries/{publicSlug}`. Stashed
 * verticals are filtered out by `getActiveIndustries`; the grid collapses to a
 * centered single card while only one sector is live.
 */
export async function IndustriesPreview() {
  const locale = await getLocale();
  const t = homeContent[locale];
  const industries = getActiveIndustries(locale);

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.industriesEyebrow}
            title={t.industriesPreview.title}
            subhead={t.industriesPreview.subhead}
          />
        </Reveal>
        <Reveal
          stagger
          className={cn(
            "mt-14 grid gap-5",
            industries.length === 1
              ? "max-w-md mx-auto"
              : "sm:grid-cols-2 lg:grid-cols-5",
          )}
        >
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${publicSlugFor(industry.slug)}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 shadow-card transition-colors hover:border-amber-deep"
            >
              <span className="text-amber">
                <Icon name={industry.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-cream">
                {industry.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {industry.cardBlurb}
              </p>
              {/* mt-auto pins the link to the bottom-left of every card,
                  regardless of how long the blurb above it runs. */}
              <span className="mt-auto pt-6 text-sm text-amber transition-colors group-hover:text-amber-bright">
                {t.industriesPreview.explore}
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
