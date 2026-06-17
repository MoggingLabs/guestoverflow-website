import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { CostCalculator } from "@/components/sections/pricing/CostCalculator";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { calculatorContent, type FeeSector } from "@/content/competitors";
import { getLocale } from "@/lib/i18n";
import { isActiveSector } from "@/lib/sectors";
import { SHOW_CALCULATOR } from "@/lib/features";

export const metadata: Metadata = {
  title: "Commission savings calculator",
  description:
    "See how much commission a booking platform really costs you, and what you keep with Guest Overflow's flat price.",
};

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>;
}) {
  if (!SHOW_CALCULATOR) notFound();
  const locale = await getLocale();
  const c = calculatorContent[locale];
  // Honour ?sector= only for live verticals; otherwise fall back to the
  // calculator's default active sector. See lib/sectors.ts.
  const requested = (await searchParams).sector;
  const initialSector: FeeSector | undefined =
    requested && isActiveSector(requested)
      ? (requested as FeeSector)
      : undefined;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        headline={c.title}
        subhead={c.subhead}
        showCta={false}
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <CostCalculator initialSector={initialSector} />
          </Reveal>
        </Container>
      </section>

      <FooterCta />
    </>
  );
}
