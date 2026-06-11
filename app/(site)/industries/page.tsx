import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FooterCta } from "@/components/layout/FooterCta";
import { industriesContent } from "@/content/industries";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Guest Overflow powers custom online booking for restaurants, hotels, spas, and tour operators, with one system shaped to each business.",
};

export default async function IndustriesPage() {
  const t = industriesContent[await getLocale()];

  return (
    <>
      <PageHero
        eyebrow={t.index.eyebrow}
        headline={t.index.title}
        subhead={t.index.subhead}
        showCta={false}
      />
      <section className="pb-24 md:pb-36">
        <Container>
          <Reveal stagger className="grid gap-5 sm:grid-cols-2">
            {t.industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-8 shadow-card transition-colors hover:border-amber-deep"
              >
                <span className="text-amber">
                  <Icon name={industry.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-medium text-cream">
                  {industry.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {industry.cardBlurb}
                </p>
                <span className="mt-auto pt-6 text-sm text-amber transition-colors group-hover:text-amber-bright">
                  {t.index.seeBooking(industry.label)}
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
      <FooterCta />
    </>
  );
}
