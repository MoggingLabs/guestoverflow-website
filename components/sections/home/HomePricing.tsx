import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CostCalculator } from "@/components/sections/pricing/CostCalculator";
import { homeContent } from "@/content/home";
import { getLocale } from "@/lib/i18n";
import { SHOW_CALCULATOR } from "@/lib/features";

/**
 * Pulls the savings calculator onto the home page (loss-aversion + intent),
 * reusing the same compact CostCalculator that powers /pricing.
 */
export async function HomePricing() {
  const t = homeContent[await getLocale()].homePricing;

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            subhead={t.subhead}
          />
        </Reveal>
        {SHOW_CALCULATOR && (
          <Reveal className="mt-12">
            <CostCalculator compact />
          </Reveal>
        )}
        <Reveal className="mt-10 text-center">
          <Button href="/pricing" analyticsLabel="home_see_pricing">
            {t.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
