import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FooterCta } from "@/components/layout/FooterCta";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { aboutHero, principles, story } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "GuestFlow is built by MoggingLabs — a studio with years of experience crafting high-converting hospitality websites.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        headline={aboutHero.headline}
        subhead={aboutHero.subhead}
        showCta={false}
      />

      <section className="border-t border-line py-24 md:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-cream">
              {story.title}
            </h2>
            <div className="mt-7 space-y-5">
              {story.paragraphs.map((paragraph) => (
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
            <SectionHeading eyebrow="Principles" title={principles.title} />
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.items.map((item) => (
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

      <FooterCta />
    </>
  );
}
