import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { getLocale } from "@/lib/i18n";

/**
 * Slim PT-specific hook: by law (rate-parity ban + EU DMA) a venue can already
 * undercut the OTA on its own site. Framed as a permission, not legal advice.
 */
export async function RateParityStrip() {
  const t = homeContent[await getLocale()].rateParity;

  return (
    <section className="border-t border-line py-20 md:py-24">
      <Container className="text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
            {t.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-medium tracking-tight text-cream text-balance md:text-3xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-dim md:text-base">
            {t.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
