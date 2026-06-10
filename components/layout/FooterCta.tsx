import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

type FooterCtaProps = {
  headline?: string;
  subhead?: string;
};

export function FooterCta({
  headline = "Your website. Your guests. Your bookings.",
  subhead = "See GuestFlow running on a site like yours — 20 minutes, no commitment.",
}: FooterCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_115%,rgb(217_160_91/0.13),transparent_70%)]"
      />
      <Container className="relative py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight text-cream md:text-5xl text-balance">
            {headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-cream-dim md:text-lg">
            {subhead}
          </p>
          <div className="mt-9">
            <Button
              href={site.cta.primary.href}
              size="lg"
              analyticsLabel="footer_cta_book_demo"
            >
              {site.cta.primary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
