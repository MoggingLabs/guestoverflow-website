import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/sections/demo/DemoForm";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { demoPage } from "@/content/demo";
import { demoFaq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Book a demo",
  description: demoPage.subhead,
};

export default function BookADemoPage() {
  return (
    <>
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber">
              {demoPage.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-cream md:text-5xl text-balance">
              {demoPage.headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-cream-dim md:text-lg">
              {demoPage.subhead}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <h2 className="font-display text-xl font-medium text-cream">
                {demoPage.expectations.title}
              </h2>
              <ul className="mt-7 space-y-7">
                {demoPage.expectations.items.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="font-display text-2xl font-medium text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-medium text-cream">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-9 border-l-2 border-amber-deep pl-4 text-sm text-cream-dim">
                {demoPage.reassurance}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-lg border border-line bg-surface p-7 shadow-card md:p-9">
                <DemoForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection items={demoFaq} title="Before you book" />
    </>
  );
}
