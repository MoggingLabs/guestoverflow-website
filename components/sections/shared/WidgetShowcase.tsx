import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BookingWidget } from "@/components/widget/BookingWidget";
import type { VenueThemeId } from "@/types/content";

type WidgetShowcaseProps = {
  eyebrow?: string;
  title: string;
  subhead?: string;
  caption?: string;
  initialTheme?: VenueThemeId;
  showThemeSwitcher?: boolean;
};

/**
 * The live booking widget inside a sales narrative. Reused on home,
 * product, and industry pages with different intros and theme locks.
 */
export function WidgetShowcase({
  eyebrow,
  title,
  subhead,
  caption,
  initialTheme,
  showThemeSwitcher = true,
}: WidgetShowcaseProps) {
  return (
    <section id="live-demo" className="scroll-mt-24 py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} />
        </Reveal>
        <Reveal delay={0.15} className="mt-12">
          <BookingWidget
            initialTheme={initialTheme}
            showThemeSwitcher={showThemeSwitcher}
            caption={caption}
          />
        </Reveal>
      </Container>
    </section>
  );
}
