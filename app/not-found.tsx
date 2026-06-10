import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-cream md:text-6xl">
          This table doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-cream-dim">
          The page you&apos;re looking for was moved, renamed, or never made
          it onto the floor plan.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href={site.cta.primary.href} variant="secondary">
            {site.cta.primary.label}
          </Button>
        </div>
      </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
