import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { getLocale } from "@/lib/i18n";

export async function HowItWorks() {
  const t = homeContent[await getLocale()];

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.howItWorksEyebrow}
            title={t.howItWorks.title}
            subhead={t.howItWorks.subhead}
          />
        </Reveal>
        {/* Subgrid keeps the number / title / body rows aligned across all three
            columns even when titles wrap to different line counts. */}
        <Reveal
          stagger
          className="mt-14 grid gap-x-10 gap-y-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]"
        >
          {t.howItWorks.steps.map((step, i) => (
            <div
              key={step.title}
              className="grid gap-y-3 md:row-span-3 md:grid-rows-subgrid"
            >
              <span className="font-display text-4xl font-medium text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-medium text-cream">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream-dim">
                {step.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
