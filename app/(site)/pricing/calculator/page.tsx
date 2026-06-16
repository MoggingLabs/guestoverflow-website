import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { CostCalculator } from "@/components/sections/pricing/CostCalculator";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { calculatorContent, feeSectors, type FeeSector } from "@/content/competitors";
import { getLocale } from "@/lib/i18n";

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
  const locale = await getLocale();
  const c = calculatorContent[locale];
  const requested = (await searchParams).sector;
  const initialSector: FeeSector = feeSectors.includes(requested as FeeSector)
    ? (requested as FeeSector)
    : "restaurants";

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
