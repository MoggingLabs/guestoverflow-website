import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/sections/demo/DemoForm";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { demoContent } from "@/content/demo";
import { faqContent } from "@/content/faq";
import { seoStrings } from "@/content/seo";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = seoStrings[await getLocale()].pages.bookADemo;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/book-a-demo" },
  };
}

export default async function BookADemoPage() {
  const locale = await getLocale();
  const t = demoContent[locale];
  const faq = faqContent[locale];

  return (
    <>
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber">
              {t.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-cream md:text-5xl text-balance">
              {t.headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-cream-dim md:text-lg">
              {t.subhead}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Left: what to expect */}
            <div className="space-y-12">
              <Reveal>
                <h2 className="font-display text-xl font-medium text-cream">
                  {t.expectations.title}
                </h2>
                <ul className="mt-7 space-y-6">
                  {t.expectations.items.map((item, i) => (
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
                <p className="mt-8 border-l-2 border-amber-deep pl-4 text-sm text-cream-dim">
                  {t.reassurance}
                </p>
              </Reveal>
            </div>

            {/* Right: the form, vertical */}
            <Reveal delay={0.15}>
              <div className="rounded-lg border border-line bg-surface p-7 shadow-card md:p-9 lg:sticky lg:top-24">
                <DemoForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection items={faq.demo} title={faq.demoTitle} />
    </>
  );
}
