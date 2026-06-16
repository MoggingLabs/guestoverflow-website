import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  getIndustry,
  industriesContent,
  sectorPrices,
} from "@/content/industries";
import { getLocale } from "@/lib/i18n";

/**
 * Static "us vs the named rival" card for a sector page. Reuses the sector's
 * own `pricing.comparison` block and links into the savings calculator.
 */
export async function ComparisonCallout({ slug }: { slug: string }) {
  const locale = await getLocale();
  const industry = getIndustry(locale, slug);
  if (!industry) return null;

  const t = industriesContent[locale].detail;
  const { comparison } = industry.pricing;
  const from = sectorPrices[slug]?.starter;
  const fromText =
    from == null
      ? ""
      : locale === "pt"
        ? `desde ${from} €/mês`
        : `from €${from}/mo`;

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
            <h2 className="font-display text-xl font-medium text-cream">
              {comparison.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              {comparison.body}
            </p>
          </div>
          <div className="flex flex-col rounded-lg border border-amber-deep/60 bg-surface p-8 shadow-glow">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
              Guest Overflow
            </p>
            {fromText && (
              <p className="mt-3 font-display text-3xl font-medium text-cream">
                {fromText}
              </p>
            )}
            <p className="mt-2 text-sm text-cream-dim">{t.comparisonFlat}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button
                href={`/pricing/${slug}`}
                analyticsLabel={`comparison_${slug}_pricing`}
              >
                {t.seePricing}
              </Button>
              <Button
                href={`/pricing/calculator?sector=${slug}`}
                variant="secondary"
                analyticsLabel={`comparison_${slug}_calculator`}
              >
                {t.pricingCalcCta}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
