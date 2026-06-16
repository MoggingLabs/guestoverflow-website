import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/content/home";
import { siteStrings } from "@/content/site";
import { getLocale } from "@/lib/i18n";

type FooterCtaProps = {
  headline?: string;
  subhead?: string;
};

export async function FooterCta({ headline, subhead }: FooterCtaProps) {
  const locale = await getLocale();
  const defaults = homeContent[locale].footerCta;
  const cta = siteStrings[locale].cta.primary;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_115%,rgb(8_105_107/0.3),transparent_70%)]"
      />
      <Container className="relative py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight text-white md:text-5xl text-balance">
            {headline ?? defaults.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">
            {subhead ?? defaults.subhead}
          </p>
          <div className="mt-9">
            <Button href={cta.href} variant="inverse" size="lg" analyticsLabel="footer_cta_book_demo">
              {cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
