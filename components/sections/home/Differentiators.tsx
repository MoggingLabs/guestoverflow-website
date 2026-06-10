import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { differentiators } from "@/content/home";
import { site } from "@/content/site";

export function Differentiators() {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Why GuestFlow" title={differentiators.title} />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {differentiators.items.map((item) => (
            <Card key={item.title}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-amber-deep/50 bg-amber/10 text-amber">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {item.body}
              </p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-12 text-center">
          <Button
            href={site.cta.primary.href}
            variant="secondary"
            analyticsLabel="differentiators_book_demo"
          >
            Book a demo and see it on your website
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
