import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";
import { siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";

export async function Differentiators() {
  const locale = await getLocale();
  const t = homeContent[locale];

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.whyEyebrow} title={t.differentiators.title} />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-x-5 gap-y-4 sm:grid-cols-2">
          {t.differentiators.items.map((item) => (
            <Card
              key={item.title}
              className="grid gap-y-4 sm:row-span-3 sm:grid-rows-subgrid"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-amber-deep/50 bg-amber/10 text-amber">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-medium text-cream sm:min-h-[3.5rem]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream-dim">
                {item.body}
              </p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-12 text-center">
          <Button
            href={siteStrings[locale].cta.primary.href}
            variant="secondary"
            analyticsLabel="differentiators_book_demo"
          >
            {t.differentiators.ctaLine}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
