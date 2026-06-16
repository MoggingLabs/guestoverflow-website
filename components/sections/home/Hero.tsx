import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroParticles } from "@/components/sections/home/HeroParticles";
import { homeContent } from "@/content/home";
import { siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";

export async function Hero() {
  const locale = await getLocale();
  const t = homeContent[locale];
  const cta = siteStrings[locale].cta;

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy pt-28 pb-20 md:pt-32 md:pb-24">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <HeroParticles />
      <Container className="relative text-center">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-mint">
            {t.hero.eyebrow}
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl text-balance">
            {t.hero.headline}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t.hero.subhead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={cta.primary.href}
              variant="inverse"
              size="lg"
              analyticsLabel="hero_book_demo"
            >
              {cta.primary.label}
            </Button>
            <Button
              href={cta.secondary.href}
              variant="inverseSecondary"
              size="lg"
              analyticsLabel="hero_try_demo"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
