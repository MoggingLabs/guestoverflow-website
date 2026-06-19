import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { CostCalculator } from "@/components/sections/pricing/CostCalculator";
import { SHOW_CALCULATOR, SHOW_FOUNDING_OFFER } from "@/lib/features";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingContent } from "@/content/pricing";
import { getActiveIndustries, sectorPrices } from "@/content/industries";
import { faqContent } from "@/content/faq";
import { siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";
import { publicSlugFor } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly pricing with no commission on your bookings, calibrated for salons and barbershops.",
};

export default async function PricingPage() {
  const locale = await getLocale();
  const t = pricingContent[locale];
  const faq = faqContent[locale];
  const cta = siteStrings[locale].cta.primary;
  const industries = getActiveIndustries(locale);

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
        showCta={false}
      />

      {/* Sector picker */}
      <section className="pb-8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t.sectorPicker.eyebrow}
              title={t.sectorPicker.title}
              subhead={t.sectorPicker.subhead}
            />
          </Reveal>
          <Reveal
            stagger
            className={cn(
              "mt-12 grid gap-5",
              industries.length === 1
                ? "max-w-sm mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/pricing/${publicSlugFor(industry.slug)}`}
                className="group"
              >
                <Card className="h-full transition-colors group-hover:border-amber-deep/60">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-medium text-cream">
                      {industry.label}
                    </h3>
                    <span className="shrink-0 text-sm font-medium text-amber">
                      {t.sectorPicker.from(sectorPrices[industry.slug].starter)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                    {industry.cardBlurb}
                  </p>
                </Card>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Savings calculator (stashed for a future addition) */}
      {SHOW_CALCULATOR && (
        <section className="py-20 md:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={t.sectorPicker.eyebrow}
                title={t.calc.title}
                subhead={t.calc.subhead}
              />
            </Reveal>
            <Reveal className="mt-12">
              <CostCalculator compact />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Founding offer (stashed) + getting-found / transparency cards */}
      <section className="pb-24 md:pb-32">
        <Container>
          {SHOW_FOUNDING_OFFER && (
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-amber-deep/60 bg-surface p-9 text-center shadow-glow md:p-12">
              <Badge>{t.foundingPartner.badge}</Badge>
              <h2 className="mt-5 font-display text-2xl font-medium text-cream md:text-3xl">
                {t.foundingPartner.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-dim">
                {t.foundingPartner.body}
              </p>
              <div className="mt-8">
                <Button
                  href={cta.href}
                  size="lg"
                  analyticsLabel="pricing_founding_partner"
                >
                  {t.foundingPartner.cta}
                </Button>
              </div>
              <p className="mt-5 text-xs text-cream-faint">
                {t.offerDisclaimer.before}
                <Link
                  href="/terms"
                  className="underline underline-offset-2 hover:text-cream"
                >
                  {t.offerDisclaimer.linkLabel}
                </Link>
                {t.offerDisclaimer.after}
              </p>
            </div>
          </Reveal>
          )}

          <Reveal className="mt-16 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
                {t.noWebsiteOffer.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-cream">
                {t.noWebsiteOffer.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {t.noWebsiteOffer.body}
              </p>
              <ul className="mt-6 space-y-3">
                {t.noWebsiteOffer.points.map((point) => (
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
              <Link
                href="/services"
                className="mt-6 inline-block text-sm text-amber transition-colors hover:text-amber-bright"
              >
                {locale === "pt"
                  ? "Explorar os nossos serviços"
                  : "Explore our services"}{" "}
                →
              </Link>
            </div>
            <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
                {t.transparency.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-cream">
                {t.transparency.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {t.transparency.body}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection items={faq.pricing} title={faq.pricingTitle} />
      <FooterCta />
    </>
  );
}
