import { Hero } from "@/components/sections/home/Hero";
import { BuiltForStrip } from "@/components/sections/home/BuiltForStrip";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Differentiators } from "@/components/sections/home/Differentiators";
import { PromisesStrip } from "@/components/sections/shared/PromisesStrip";
import { NoWebsitePath } from "@/components/sections/home/NoWebsitePath";
import { PromiseStrip } from "@/components/sections/home/PromiseStrip";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { homeContent } from "@/content/home";
import { faqContent } from "@/content/faq";
import { getLocale } from "@/lib/i18n";
import { SHOW_FOUNDING_OFFER } from "@/lib/features";

/**
 * The brand hub. `/` introduces Guest Overflow and hands off to a per-sector
 * mini-site via the sector picker (`IndustriesPreview`). Sector-specific
 * sections (the salon problem strip, salon pricing teaser, salon live-demo)
 * now live on the spoke at `/industries/[slug]` and `/pricing/[slug]`.
 *
 * COPY TODO (flagged, follow-up pass): the Hero, HowItWorks, Differentiators,
 * NoWebsitePath and home FAQ copy are still salon-narrowed from the
 * single-vertical era. They should be rewritten brand-neutral (multi-sector)
 * now that `/` is the hub rather than the salon landing page.
 */
export default async function HomePage() {
  const locale = await getLocale();
  const t = homeContent[locale];

  return (
    <>
      <Hero />
      {/* Proof bar: honest credibility + the sectors served (active only). */}
      <BuiltForStrip />
      {/* Sector picker — the hub's hand-off to each vertical's mini-site. */}
      <IndustriesPreview />
      <HowItWorks />
      <Differentiators />
      {/* Contractual promises mapped to competitor failures. */}
      <PromisesStrip limit={4} />
      {/* Side products (GBP + website build), demoted as the discovery answer. */}
      <NoWebsitePath />
      {/* Founding half-price guarantee, stashed for now. */}
      {SHOW_FOUNDING_OFFER && <PromiseStrip />}
      <FaqSection items={faqContent[locale].home} title={t.faqTitle} />
      <FooterCta />
    </>
  );
}
