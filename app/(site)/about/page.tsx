import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { aboutContent } from "@/content/about";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Guest Overflow is built by a team with years of experience crafting high-converting guest-facing websites.",
};

export default async function AboutPage() {
  const t = aboutContent[await getLocale()];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        subhead={t.hero.subhead}
        showCta={false}
      />

      <section className="border-t border-line py-24 md:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-cream">
              {t.story.title}
            </h2>
            <div className="mt-7 space-y-5">
              {t.story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-cream-dim"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t.principles.eyebrow}
              title={t.principles.title}
            />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-x-5 gap-y-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
            {t.principles.items.map((item) => (
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

      <FooterCta />
    </>
  );
}
