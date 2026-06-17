import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { getActiveIndustries } from "@/content/industries";
import { getLocale } from "@/lib/i18n";

/**
 * Honest social proof for a pre-customer product: positioning plus
 * credibility transfer from the studio behind it. No fake logos.
 */
export async function BuiltForStrip() {
  const locale = await getLocale();
  const t = homeContent[locale].builtFor;
  const industries = getActiveIndustries(locale);

  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-24">
      <Container className="text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-6 text-cream-faint">
            {industries.map((industry) => (
              <span key={industry.slug} title={industry.label}>
                <Icon name={industry.icon} className="h-7 w-7" />
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl font-display text-xl text-cream text-balance">
            {t.line}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream-dim">
            {t.credibility}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
