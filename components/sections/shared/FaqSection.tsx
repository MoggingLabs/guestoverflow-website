import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/types/content";

export function FaqSection({
  items,
  title = "Questions, answered.",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title={title} />
        </Reveal>
        <Reveal className="mt-12">
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
