import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { WidgetShowcase } from "@/components/sections/shared/WidgetShowcase";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getIndustry, industries } from "@/content/industries";
import { getVenueTheme } from "@/content/widget-themes";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
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
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const venue = getVenueTheme(industry.themeId);

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
              eyebrow="The problem"
              title={`What ${industry.label.toLowerCase()} put up with today`}
            />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {industry.painPoints.map((point) => (
              <Card key={point.title}>
                <h3 className="font-display text-lg font-medium text-cream">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {point.body}
                </p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <WidgetShowcase
        eyebrow="Live demo"
        title={`Try a booking at ${venue.venueName}.`}
        subhead="The venue is fictional, but the widget is real. This is how GuestFlow would feel themed for your business."
        initialTheme={industry.themeId}
        showThemeSwitcher={false}
      />

      <section className="border-t border-line py-24 md:py-36">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Built in"
              title={`GuestFlow for ${industry.label.toLowerCase()}`}
            />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {industry.highlights.map((highlight, i) => (
              <div key={highlight.title}>
                <span className="font-display text-4xl font-medium text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-cream">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {highlight.body}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <FooterCta
        headline="Bring booking home to your website."
        subhead="See GuestFlow themed for a venue like yours in a 20-minute demo."
      />
    </>
  );
}
