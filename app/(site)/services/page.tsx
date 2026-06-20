import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { servicesContent } from "@/content/services";
import { seoStrings } from "@/content/seo";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: seoStrings[locale].servicesTitle,
    description: servicesContent[locale].meta,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const t = servicesContent[await getLocale()];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
        showCta={false}
      />

      <section className="pb-8">
        <Container>
          <Reveal
            stagger
            className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
          >
            {t.services.map((service) => (
              <Card key={service.title}>
                <Badge>{service.badge}</Badge>
                <h2 className="mt-4 font-display text-xl font-medium text-cream">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {service.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-cream-dim"
                    >
                      <span aria-hidden className="mt-1 text-amber">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path
                            d="m3.5 8.5 3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
              {t.included.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-cream text-balance md:text-3xl">
              {t.included.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-dim md:text-base">
              {t.included.body}
            </p>
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
