import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How GuestFlow collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy" updated="June 10, 2026">
      <p>
        This policy describes how {site.name} (&quot;we&quot;, &quot;us&quot;)
        handles information collected through this website. It is a working
        draft for the pre-launch period and will be expanded with counsel
        before commercial launch.
      </p>

      <h2>What we collect</h2>
      <p>
        When you request a demo we collect the details you submit: your name,
        work email, business name and type, optional scheduling preferences,
        and any message you include. We also use privacy-friendly, aggregated
        analytics to understand how the site is used.
      </p>

      <h2>How we use it</h2>
      <p>
        Demo request details are used solely to respond to your enquiry and
        arrange the demo you asked for. We do not sell your information, share
        it with third parties for their marketing, or add you to mailing lists
        you didn&apos;t ask for.
      </p>

      <h2>The interactive demo widget</h2>
      <p>
        The booking demo on this site is exactly that — a demo. Names or
        emails typed into it are processed only in your browser and are never
        transmitted or stored.
      </p>

      <h2>Data retention and your rights</h2>
      <p>
        We keep demo request details for as long as needed to handle your
        enquiry and any resulting relationship. You can ask us to access,
        correct, or delete your information at any time by emailing{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: {site.email}. {site.name} is a{" "}
        {site.company} product.
      </p>
    </LegalLayout>
  );
}
