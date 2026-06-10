import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { industriesPreview } from "@/content/home";
import { industries } from "@/content/industries";

export function IndustriesPreview() {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Industries"
            title={industriesPreview.title}
            subhead={industriesPreview.subhead}
          />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-line bg-surface p-7 shadow-card transition-colors hover:border-amber-deep"
            >
              <span className="text-amber">
                <Icon name={industry.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-cream">
                {industry.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {industry.cardBlurb}
              </p>
              <span className="mt-5 inline-block text-sm text-amber transition-colors group-hover:text-amber-bright">
                Explore →
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
