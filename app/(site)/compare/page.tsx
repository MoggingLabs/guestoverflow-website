import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { compareContent, getActiveCompareEntries } from "@/content/compare";
import { seoStrings } from "@/content/seo";
import { getLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = seoStrings[await getLocale()].pages.compare;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/compare" },
  };
}

export default async function ComparePage() {
  const locale = await getLocale();
  const t = compareContent[locale];
  const entries = getActiveCompareEntries(locale);

  return (
    <>
      <PageHero
        eyebrow={t.index.eyebrow}
        headline={t.index.title}
        subhead={t.index.subhead}
        showCta={false}
      />

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal
            stagger
            className={cn(
              "grid gap-5",
              entries.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-2",
            )}
          >
            {entries.map((entry) => (
              <Link key={entry.slug} href={`/compare/${entry.slug}`} className="group">
                <Card className="h-full transition-colors group-hover:border-amber-deep/60">
                  <h2 className="font-display text-lg font-medium text-cream">
                    {`Guest Overflow vs ${entry.name}`}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                    {entry.blurb}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-amber">
                    {`${t.detail.seePricing} →`}
                  </span>
                </Card>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
