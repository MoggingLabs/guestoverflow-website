import { Hero } from "@/components/sections/home/Hero";
import { ProblemStrip } from "@/components/sections/home/ProblemStrip";
import { WidgetShowcase } from "@/components/sections/shared/WidgetShowcase";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Differentiators } from "@/components/sections/home/Differentiators";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { BuiltForStrip } from "@/components/sections/home/BuiltForStrip";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FooterCta } from "@/components/layout/FooterCta";
import { widgetShowcase } from "@/content/home";
import { homeFaq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemStrip />
      <WidgetShowcase
        eyebrow={widgetShowcase.eyebrow}
        title={widgetShowcase.title}
        subhead={widgetShowcase.subhead}
        caption={widgetShowcase.caption}
      />
      <HowItWorks />
      <Differentiators />
      <IndustriesPreview />
      <BuiltForStrip />
      <FaqSection items={homeFaq} />
      <FooterCta />
    </>
  );
}
