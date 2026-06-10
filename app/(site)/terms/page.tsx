import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms governing the use of the GuestFlow website.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of service" updated="June 10, 2026">
      <p>
        These terms govern your use of this website. They are a working draft
        for the pre-launch period; service terms for the GuestFlow product
        will be provided separately to customers.
      </p>

      <h2>Use of this site</h2>
      <p>
        You may browse this site and use the interactive demo for evaluating
        GuestFlow. You agree not to misuse the site, attempt to disrupt it, or
        submit false or automated demo requests.
      </p>

      <h2>Demo content</h2>
      <p>
        Venues shown in the interactive demo (such as &quot;Maison Adler&quot;
        or &quot;The Larkspur Hotel&quot;) are fictional. Demo bookings are
        simulations and create no reservation, obligation, or service of any
        kind.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, logo, design, and site content belong to{" "}
        {site.company}. You may not reproduce them without permission.
      </p>

      <h2>No warranties</h2>
      <p>
        This site is provided &quot;as is&quot;. Product descriptions reflect
        the roadmap for the GuestFlow service and may evolve before launch.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
