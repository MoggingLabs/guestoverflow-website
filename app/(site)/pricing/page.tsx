import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import {
  comparison,
  foundingPartner,
  noWebsiteOffer,
  pricingHero,
  tiers,
  transparency,
} from "@/content/pricing";
import { pricingFaq } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly pricing with no per-cover commission. Essential, Premium, and custom plans for restaurants, hotels, spas, and experiences.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow={pricingHero.eyebrow}
        headline={pricingHero.headline}
        subhead={pricingHero.subhead}
        showCta={false}
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal stagger className="grid items-start gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-lg border bg-surface p-8 shadow-card",
                  tier.featured
                    ? "border-amber-deep shadow-glow"
                    : "border-line",
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-medium text-cream">
                    {tier.name}
                  </h2>
                  {tier.featured && <Badge>Most popular</Badge>}
                </div>
                <p className="mt-5 font-display text-3xl font-medium text-cream">
                  {tier.price}
                </p>
                <p className="mt-1 text-xs text-cream-faint">{tier.priceNote}</p>
                <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                  {tier.blurb}
                </p>
                <ul className="mt-7 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href={site.cta.primary.href}
                  variant={tier.featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                  analyticsLabel={`pricing_${tier.name.toLowerCase()}`}
                >
                  {site.cta.primary.label}
                </Button>
              </div>
            ))}
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium text-cream">
              {comparison.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              {comparison.body}
            </p>
          </Reveal>

          <Reveal className="mt-16">
            <div className="relative overflow-hidden rounded-lg border border-amber-deep/60 bg-surface p-9 text-center shadow-glow md:p-12">
              <Badge>{foundingPartner.badge}</Badge>
              <h2 className="mt-5 font-display text-2xl font-medium text-cream md:text-3xl">
                {foundingPartner.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-dim">
                {foundingPartner.body}
              </p>
              <div className="mt-8">
                <Button
                  href={site.cta.primary.href}
                  size="lg"
                  analyticsLabel="pricing_founding_partner"
                >
                  {foundingPartner.cta}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
                {noWebsiteOffer.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-cream">
                {noWebsiteOffer.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {noWebsiteOffer.body}
              </p>
              <ul className="mt-6 space-y-3">
                {noWebsiteOffer.points.map((point) => (
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
            </div>
            <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
                {transparency.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-cream">
                {transparency.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {transparency.body}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection items={pricingFaq} title="Pricing questions" />
      <FooterCta />
    </>
  );
}
