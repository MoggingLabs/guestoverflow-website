import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FeatureGrid } from "@/components/sections/product/FeatureGrid";
import { OwnYourData } from "@/components/sections/product/OwnYourData";
import { WidgetShowcase } from "@/components/sections/shared/WidgetShowcase";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { productContent } from "@/content/product";
import { faqContent } from "@/content/faq";
import { getLocale } from "@/lib/i18n";
import { SHOW_LIVE_DEMO } from "@/lib/features";

export const metadata: Metadata = {
  title: "Product",
  description:
    "The full reservation lifecycle: a branded booking page, real-time availability, guest CRM, deposits, reminders, and analytics, all on your own website.",
};

export default async function ProductPage() {
  const locale = await getLocale();
  const t = productContent[locale];
  const faq = faqContent[locale];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
      />
      <FeatureGrid />
      <OwnYourData />
      {SHOW_LIVE_DEMO && (
        <WidgetShowcase
          eyebrow={t.liveDemo.eyebrow}
          title={t.liveDemo.title}
          subhead={t.liveDemo.subhead}
          caption={t.liveDemo.caption}
          initialTheme="salon"
          showThemeSwitcher={false}
        />
      )}
      <FaqSection items={faq.product} title={faq.productTitle} />
      <FooterCta />
    </>
  );
}
