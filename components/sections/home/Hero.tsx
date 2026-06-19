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
    <section className="relative overflow-hidden bg-navy pt-24 pb-16 md:pt-28 md:pb-20">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <HeroParticles />
      <Container className="relative text-center">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-mint">
            {t.hero.eyebrow}
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.07] tracking-tight text-white md:text-6xl text-balance">
            {t.hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t.hero.subhead}
          </p>
        </Reveal>

        {/* Sector selection — the hero's primary action: pick your business. */}
        <Reveal>
          <p className="mt-9 mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {t.industriesEyebrow}
          </p>
        </Reveal>
        <Reveal
          stagger
          className={cn(
            "grid gap-4",
            industries.length === 1
              ? "max-w-md mx-auto"
              : "mx-auto max-w-5xl sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${publicSlugFor(industry.slug)}`}
              className="group flex h-full flex-col rounded-xl border border-white/20 bg-white/[0.07] p-6 text-left shadow-xl shadow-black/20 transition-colors hover:border-mint hover:bg-white/[0.11]"
            >
              <span className="text-mint">
                <Icon name={industry.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-4 font-display text-lg font-medium text-white">
                {industry.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {industry.cardBlurb}
              </p>
              <span className="mt-auto pt-5 text-sm font-medium text-mint transition-colors group-hover:text-white">
                {t.industriesPreview.explore}
              </span>
            </Link>
          ))}
        </Reveal>

        {/* Book a demo demoted to a secondary action below the picker. */}
        <Reveal>
          <div className="mt-9 flex flex-col items-center justify-center gap-3">
            <Button
              href={cta.primary.href}
              variant="inverse"
              analyticsLabel="hero_book_demo"
            >
              {cta.primary.label}
            </Button>
            {SHOW_LIVE_DEMO && (
              <a
                href={cta.secondary.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {cta.secondary.label} ↓
              </a>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
