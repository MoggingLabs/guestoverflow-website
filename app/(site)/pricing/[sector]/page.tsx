import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { PricingTiers } from "@/components/sections/pricing/PricingTiers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  getIndustry,
  industriesContent,
  industrySlugs,
} from "@/content/industries";
import { seoStrings } from "@/content/seo";
import { getLocale } from "@/lib/i18n";
import { sectorForPublicSlug, publicSlugFor } from "@/lib/sectors";
import { SHOW_CALCULATOR } from "@/lib/features";
import { cn } from "@/lib/utils";

// `sector` is the public URL slug (e.g. "salons"); translate to the internal
// key before content lookup.
type Params = { sector: string };

export function generateStaticParams(): Params[] {
  return industrySlugs.map((sector) => ({ sector: publicSlugFor(sector) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { sector } = await params;
  const key = sectorForPublicSlug(sector);
  const locale = await getLocale();
  const industry = key ? getIndustry(locale, key) : undefined;
  if (!industry) return {};
  return {
    title: seoStrings[locale].pricingTitle(industry.label),
    description: industry.pricing.hero.subhead,
    alternates: { canonical: `/pricing/${sector}` },
  };
}

export default async function SectorPricingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const locale = await getLocale();
  const key = sectorForPublicSlug((await params).sector);
  const industry = key ? getIndustry(locale, key) : undefined;
  if (!industry) notFound();

  const t = industriesContent[locale].detail;
  const { hero, tiers, comparison, addOns } = industry.pricing;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subhead={hero.subhead}
        showCta={false}
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <PricingTiers
              tiers={tiers}
              analyticsPrefix={`pricing_${industry.slug}`}
            />
          </Reveal>

          {addOns && addOns.length > 0 && (
            <Reveal className="mx-auto mt-12 max-w-3xl">
              <h2 className="text-center font-display text-xl font-medium text-cream">
                {t.pricingAddOnsTitle}
              </h2>
              <div
                className={cn(
                  "mt-6 grid gap-5",
                  addOns.length === 1 ? "max-w-md mx-auto" : "sm:grid-cols-2",
                )}
              >
                {addOns.map((addOn) => (
                  <div
                    key={addOn.name}
                    className="rounded-lg border border-line bg-surface p-6 shadow-card"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-base font-medium text-cream">
                        {addOn.name}
                      </h3>
                      <span className="shrink-0 text-sm font-medium text-amber">
                        {addOn.priceNote}
                      </span>
                    </div>
                    {addOn.included && (
                      <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                        {addOn.included}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium text-cream">
              {comparison.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              {comparison.body}
            </p>
            {SHOW_CALCULATOR && (
              <div className="mt-8">
                <Button
                  href={`/pricing/calculator?sector=${industry.slug}`}
                  analyticsLabel={`pricing_${industry.slug}_calculator`}
                >
                  {t.pricingCalcCta}
                </Button>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
