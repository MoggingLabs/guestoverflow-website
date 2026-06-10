import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { problems } from "@/content/home";

export function ProblemStrip() {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="The problem" title={problems.title} />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.items.map((item) => (
            <Card key={item.title}>
              <h3 className="font-display text-lg font-medium text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {item.body}
              </p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
