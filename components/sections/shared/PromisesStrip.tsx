import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { promisesContent } from "@/content/promises";
import { getLocale } from "@/lib/i18n";

/** Condensed promises grid for reuse on the pricing hub and campaign pages. */
export async function PromisesStrip({ limit }: { limit?: number }) {
  const locale = await getLocale();
  const t = promisesContent[locale];
  const items = limit ? t.promises.slice(0, limit) : t.promises;

  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.hero.eyebrow} title={t.stripTitle} />
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {items.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-base font-medium text-cream">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
