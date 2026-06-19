import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { HeroParticles } from "@/components/sections/home/HeroParticles";
import { homeContent } from "@/content/home";
import { siteStrings } from "@/content/site";
import { getActiveIndustries } from "@/content/industries";
import { getLocale } from "@/lib/i18n";
import { publicSlugFor } from "@/lib/sectors";
import { SHOW_LIVE_DEMO } from "@/lib/features";
import { cn } from "@/lib/utils";

export async function Hero() {
  const locale = await getLocale();
  const t = homeContent[locale];
  const cta = siteStrings[locale].cta;
  // Sector picker lives in the hero: each card hands off to that vertical's
  // mini-site at /industries/{publicSlug}. Active sectors only; the grid
  // collapses to a single centered card while one vertical is live.
  const industries = getActiveIndustries(locale);

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
          </div>
          {SHOW_LIVE_DEMO && (
            <a
              href={cta.secondary.href}
              className="mt-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
            >
              {cta.secondary.label} ↓
            </a>
          )}
        </Reveal>

        {/* Sector selection */}
        <Reveal>
          <p className="mt-16 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {t.industriesEyebrow}
          </p>
        </Reveal>
        <Reveal
          stagger
          className={cn(
            "grid gap-4",
            industries.length === 1
              ? "max-w-sm mx-auto"
              : "mx-auto max-w-5xl sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${publicSlugFor(industry.slug)}`}
              className="group flex h-full flex-col rounded-xl border border-white/12 bg-white/[0.04] p-6 text-left backdrop-blur-sm transition-colors hover:border-mint/50 hover:bg-white/[0.07]"
            >
              <span className="text-mint">
                <Icon name={industry.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-4 font-display text-lg font-medium text-white">
                {industry.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {industry.cardBlurb}
              </p>
              <span className="mt-auto pt-5 text-sm text-mint transition-colors group-hover:text-mint/80">
                {t.industriesPreview.explore}
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
