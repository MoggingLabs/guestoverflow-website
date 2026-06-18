import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { WidgetShowcase } from "@/components/sections/shared/WidgetShowcase";
import { ComparisonCallout } from "@/components/sections/shared/ComparisonCallout";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getIndustry, industriesContent, industrySlugs } from "@/content/industries";
import { getVenueTheme } from "@/content/widget-themes";
import { getLocale } from "@/lib/i18n";
import { SHOW_LIVE_DEMO } from "@/lib/features";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const industry = getIndustry("en", (await params).slug);
  if (!industry) return {};
  return {
    title: `Online booking for ${industry.label.toLowerCase()}`,
    description: industry.metaDescription,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const locale = await getLocale();
  const industry = getIndustry(locale, (await params).slug);
  if (!industry) notFound();

  const t = industriesContent[locale].detail;
  const venue = getVenueTheme(industry.themeId, locale);

  return (
    <>
      <PageHero
        eyebrow={industry.label}
        headline={industry.hero.headline}
        subhead={industry.hero.subhead}
      />

      <section className="border-t border-line py-24 md:py-36">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t.problemEyebrow}
              title={t.problemTitle(industry.label)}
            />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-x-5 gap-y-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
            {industry.painPoints.map((point) => (
              <Card
                key={point.title}
                className="grid gap-y-4 md:row-span-2 md:grid-rows-subgrid"
              >
                <h3 className="font-display text-lg font-medium text-cream md:min-h-[3.5rem]">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-dim">
                  {point.body}
                </p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <ComparisonCallout slug={industry.slug} />

      {SHOW_LIVE_DEMO && (
        <WidgetShowcase
          eyebrow={t.liveDemoEyebrow}
          title={t.liveDemoTitle(venue.venueName)}
          subhead={t.liveDemoSubhead}
          initialTheme={industry.themeId}
          showThemeSwitcher={false}
        />
      )}

      <section className="border-t border-line py-24 md:py-36">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t.builtInEyebrow}
              title={t.builtInTitle(industry.label)}
            />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-x-10 gap-y-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
            {industry.highlights.map((highlight, i) => (
              <div
                key={highlight.title}
                className="grid gap-y-4 md:row-span-3 md:grid-rows-subgrid"
              >
                <span className="font-display text-4xl font-medium text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium text-cream md:min-h-[3.5rem]">
                  {highlight.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-dim">
                  {highlight.body}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <FooterCta headline={t.footerHeadline} subhead={t.footerSubhead} />
    </>
  );
}
