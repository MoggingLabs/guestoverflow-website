import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  compareContent,
  competitorSlugs,
  getCompareEntry,
} from "@/content/compare";
import { getLocale } from "@/lib/i18n";

type Params = { competitor: string };

export function generateStaticParams(): Params[] {
  return competitorSlugs.map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const entry = getCompareEntry("en", (await params).competitor);
  if (!entry) return {};
  return { title: entry.headline, description: entry.subhead };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const locale = await getLocale();
  const entry = getCompareEntry(locale, (await params).competitor);
  if (!entry) notFound();

  const t = compareContent[locale].detail;

  return (
    <>
      <PageHero
        eyebrow={compareContent[locale].index.eyebrow}
        headline={entry.headline}
        subhead={entry.subhead}
        showCta={false}
      />

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal className="grid gap-5 lg:grid-cols-2">
            <Card>
              <h2 className="font-display text-lg font-medium text-cream">
                {t.theirTitle(entry.name)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {entry.theirModel}
              </p>
              <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-amber">
                {t.painsTitle}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {entry.theirPains.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-cream-dim">
                    {p}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="rounded-lg border border-amber-deep/60 bg-surface p-8 shadow-glow">
              <h2 className="font-display text-lg font-medium text-cream">
                {t.ourTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {entry.ourAnswer.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-cream-dim"
                  >
                    <span aria-hidden className="mt-1 shrink-0 text-amber">
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
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={`/pricing/${entry.sector}`}
                  analyticsLabel={`compare_${entry.slug}_pricing`}
                >
                  {t.seePricing}
                </Button>
                <Button
                  href={`/pricing/calculator?sector=${entry.sector}`}
                  variant="secondary"
                  analyticsLabel={`compare_${entry.slug}_calculator`}
                >
                  {t.calcCta}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
