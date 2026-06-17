import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { getLocale } from "@/lib/i18n";

export async function ProblemStrip() {
  const t = homeContent[await getLocale()];

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.problemsEyebrow} title={t.problems.title} />
        </Reveal>
        {/* Subgrid keeps the title and body rows aligned across all three cards
            even when a title wraps to a different number of lines. */}
        <Reveal
          stagger
          className="mt-14 grid gap-x-5 gap-y-4 md:grid-cols-3 md:grid-rows-[auto_auto]"
        >
          {t.problems.items.map((item) => (
            <Card
              key={item.title}
              className="grid gap-y-4 md:row-span-2 md:grid-rows-subgrid"
            >
              <h3 className="font-display text-lg font-medium text-cream">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream-dim">
                {item.body}
              </p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
