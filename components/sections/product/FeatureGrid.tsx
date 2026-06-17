import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { productContent } from "@/content/product";
import { getLocale } from "@/lib/i18n";

export async function FeatureGrid() {
  const t = productContent[await getLocale()];

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal stagger className="grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => (
            <Card
              key={feature.title}
              className="grid gap-y-4 sm:row-span-3 sm:grid-rows-subgrid"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-amber-deep/50 bg-amber/10 text-amber">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-medium text-cream">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream-dim">
                {feature.body}
              </p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
