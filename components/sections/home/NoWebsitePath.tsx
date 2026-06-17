import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";
import { getLocale } from "@/lib/i18n";

export async function NoWebsitePath() {
  const locale = await getLocale();
  const t = homeContent[locale].noWebsite;

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subhead={t.subhead} />
        </Reveal>
        <Reveal stagger className="mx-auto mt-14 grid max-w-4xl gap-x-5 gap-y-4 md:grid-cols-2 md:grid-rows-[auto_auto_auto]">
          {t.paths.map((path) => (
            <Card
              key={path.title}
              className="grid gap-y-4 md:row-span-3 md:grid-rows-subgrid"
            >
              <Badge>{path.badge}</Badge>
              <h3 className="font-display text-lg font-medium text-cream">
                {path.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream-dim">
                {path.body}
              </p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <Button
            href="/services"
            variant="secondary"
            analyticsLabel="no_website_services"
          >
            {t.ctaLine}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
