import { Hero } from "@/components/sections/home/Hero";
import { BuiltForStrip } from "@/components/sections/home/BuiltForStrip";
import { ProblemStrip } from "@/components/sections/home/ProblemStrip";
import { WidgetShowcase } from "@/components/sections/shared/WidgetShowcase";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Differentiators } from "@/components/sections/home/Differentiators";
import { RateParityStrip } from "@/components/sections/home/RateParityStrip";
import { HomePricing } from "@/components/sections/home/HomePricing";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { PromisesStrip } from "@/components/sections/shared/PromisesStrip";
import { NoWebsitePath } from "@/components/sections/home/NoWebsitePath";
import { PromiseStrip } from "@/components/sections/home/PromiseStrip";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { homeContent } from "@/content/home";
import { faqContent } from "@/content/faq";
import { getLocale } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const t = homeContent[locale];

  return (
    <>
      <Hero />
      {/* Proof bar moved up: honest credibility + sectors served. */}
      <BuiltForStrip />
      <ProblemStrip />
      {/* The booking page, playable. Centerpiece kept high, reframed from "widget". */}
      <WidgetShowcase
        eyebrow={t.widgetShowcase.eyebrow}
        title={t.widgetShowcase.title}
        subhead={t.widgetShowcase.subhead}
        caption={t.widgetShowcase.caption}
      />
      <HowItWorks />
      <Differentiators />
      <RateParityStrip />
      {/* Pricing + savings calculator pulled onto the home page. */}
      <HomePricing />
      <IndustriesPreview />
      {/* Contractual promises mapped to competitor failures. */}
      <PromisesStrip limit={4} />
      {/* Side products (GBP + website build), demoted as the discovery answer. */}
      <NoWebsitePath />
      {/* Founding half-price guarantee sits next to the closing CTA. */}
      <PromiseStrip />
      <FaqSection items={faqContent[locale].home} title={t.faqTitle} />
      <FooterCta />
    </>
  );
}
