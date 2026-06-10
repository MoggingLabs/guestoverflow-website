import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { noWebsite } from "@/content/home";
import { site } from "@/content/site";

export function NoWebsitePath() {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={noWebsite.eyebrow}
            title={noWebsite.title}
            subhead={noWebsite.subhead}
          />
        </Reveal>
        <Reveal stagger className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {noWebsite.paths.map((path) => (
            <Card key={path.title}>
              <Badge>{path.badge}</Badge>
              <h3 className="mt-4 font-display text-lg font-medium text-cream">
                {path.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {path.body}
              </p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <Button
            href={site.cta.primary.href}
            variant="secondary"
            analyticsLabel="no_website_book_demo"
          >
            Not sure where you fit? Let&apos;s talk it through
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
