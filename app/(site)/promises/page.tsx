import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { promisesContent } from "@/content/promises";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our promises",
  description:
    "Guest Overflow's contractual commitments: one-click data export, no commission, no surprise add-ons, no rate hikes, and public pricing.",
};

export default async function PromisesPage() {
  const locale = await getLocale();
  const t = promisesContent[locale];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
      />

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal stagger className="grid gap-x-5 gap-y-4 md:grid-cols-2">
            {t.promises.map((p) => (
              <Card
                key={p.title}
                className="grid gap-y-4 md:row-span-3 md:grid-rows-subgrid"
              >
                <h2 className="font-display text-lg font-medium text-cream">
                  {p.title}
                </h2>
                <p className="text-sm leading-relaxed text-cream-dim">
                  {p.body}
                </p>
                <p className="border-t border-line pt-4 text-xs leading-relaxed text-cream-faint">
                  {p.vs}
                </p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
