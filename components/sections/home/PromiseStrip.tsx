import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { promiseStrip } from "@/content/home";

export function PromiseStrip() {
  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-24">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber">
            How we work
          </p>
          <h2 className="font-display text-2xl font-medium tracking-tight text-cream md:text-3xl text-balance">
            {promiseStrip.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream-dim">
            {promiseStrip.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
