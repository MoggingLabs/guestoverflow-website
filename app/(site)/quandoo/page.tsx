import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PromisesStrip } from "@/components/sections/shared/PromisesStrip";
import { FooterCta } from "@/components/layout/FooterCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quandooContent } from "@/content/quandoo";
import { siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Switch from Quandoo before it closes",
  description:
    "Quandoo shuts down in December 2026. Guest Overflow migrates your bookings and guest data for free, onto a commission-free booking page you own.",
};

export default async function QuandooPage() {
  const locale = await getLocale();
  const t = quandooContent[locale];
  const cta = siteStrings[locale].cta.primary;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
        showCta={false}
      />

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium text-cream">
              {t.stakes.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              {t.stakes.body}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading title={t.stepsTitle} />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {t.steps.map((step, i) => (
              <div key={step.title}>
                <span className="font-display text-4xl font-medium text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-14 text-center">
            <Button href={cta.href} size="lg" analyticsLabel="quandoo_migration">
              {t.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>

      <PromisesStrip limit={4} />

      <FooterCta headline={t.footer.headline} subhead={t.footer.subhead} />
    </>
  );
}
