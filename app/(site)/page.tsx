import { Hero } from "@/components/sections/home/Hero";
import { BuiltForStrip } from "@/components/sections/home/BuiltForStrip";
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
 * mini-site via the sector picker, which lives inside the `Hero`.
 * Sector-specific sections (the salon problem strip, salon pricing teaser,
 * salon live-demo) now live on the spoke at `/industries/[slug]` and
 * `/pricing/[slug]`.
 *
 * Hub copy is sector-neutral (covers every vertical) — sourced from
 * content/home.ts, content/faq.ts (`home`), content/promises.ts and
 * content/site.ts. Sector-specific language belongs on the spoke, not here.
 */
export default async function HomePage() {
  const locale = await getLocale();
  const t = homeContent[locale];

  return (
    <>
      {/* Hero carries the sector picker — the hub's hand-off to each
          vertical's mini-site at /industries/[slug]. */}
      <Hero />
      {/* Proof bar: honest credibility + the sectors served (active only). */}
      <BuiltForStrip />
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
