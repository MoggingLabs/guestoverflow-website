import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern the use of the Guest Overflow website, the interactive demo, and our promotional offers.",
};

const UL = "list-disc space-y-1.5 pl-5";

export default async function TermsPage() {
  const { getLocale } = await import("@/lib/i18n");
  const locale = await getLocale();

  return (
    <LegalLayout title="Terms of service" updated="June 10, 2026">
      {locale === "pt" && (
        <p className="rounded-md border border-amber-deep/50 bg-amber/10 px-4 py-3 text-xs leading-relaxed text-amber">
          Este documento legal é disponibilizado em inglês. Em caso de dúvida
          ou conflito, prevalece a versão inglesa. Se precisar de
          esclarecimentos em português, escreva-nos e teremos todo o gosto em
          ajudar.
        </p>
      )}
      <h2>1. Who operates this website</h2>
      <p>
        This website is operated by [LEGAL ENTITY NAME], a company registered
        in Portugal, commercial registry and NIPC number [NUMBER], with
        registered office at [REGISTERED ADDRESS] (&quot;we&quot;,
        &quot;us&quot;, &quot;MoggingLabs&quot;). Guest Overflow is our trade name
        for the services described on this website. Contact:{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>

      <h2>2. Acceptance of these terms</h2>
      <p>
        By accessing or using this website you agree to these Terms. If you do
        not agree, please do not use the website.
      </p>

      <h2>3. Business use only</h2>
      <p>
        This website and our services are directed exclusively at businesses
        and professionals acting in the course of their trade (B2B). By using
        this website you confirm that you are acting for purposes relating to
        your trade, business, or profession and, where you act for a company,
        that you are authorised to bind it. The website is not intended for
        consumers. If, despite this, you access the website as a consumer,
        nothing in these Terms limits any rights you have under mandatory
        consumer protection law, and sections 13 to 15 apply to you only to
        the extent permitted by such law.
      </p>

      <h2>4. These terms cover the website only</h2>
      <p>
        These Terms govern your use of this website. Any provision of services
        by us is subject to a separate written service agreement. Nothing on
        this website constitutes an offer capable of acceptance, a quotation,
        or a commitment to provide services, and in case of any conflict
        between this website and a signed service agreement, the service
        agreement prevails.
      </p>

      <h2>5. The interactive booking demo</h2>
      <p>
        The booking demo on this website is a simulation provided for
        demonstration and evaluation purposes only. All venues, names,
        availability, and other data shown are fictional, and any resemblance
        to real businesses is coincidental. No real reservation, booking,
        payment, or other transaction is created, transmitted, or processed,
        and no message is sent to any venue. The demo illustrates the kind of
        functionality we offer and does not represent, and is not a warranty
        of, the features, performance, appearance, or behaviour of any service
        we may actually provide, which may differ. The demo is provided as is,
        may be changed or removed at any time, and may not be used for
        benchmarking, load testing, or any production purpose.
      </p>

      <h2>6. Forward-looking information</h2>
      <p>
        This website may describe capabilities, features, integrations, or
        services that are under development or planned. Such descriptions
        reflect our current intentions, are subject to change or withdrawal at
        any time without notice, and do not constitute a commitment,
        obligation, or promise to develop or deliver any functionality. Only
        what is expressly set out in a signed service agreement is committed.
        Statistics, examples, and pricing indications shown on this website
        are for general information, may be illustrative, and results vary by
        venue and are not guaranteed.
      </p>

      <h2>7. Promotional offers, including the founding offer</h2>
      <p>
        From time to time we advertise promotional terms, including our
        founding offer (a period at a reduced price with an option to end the
        engagement if agreed usage or return indicators are not met). Any such
        promotion:
      </p>
      <ul className={UL}>
        <li>
          is an invitation to discuss our services and not a binding offer;
        </li>
        <li>
          is subject to eligibility, availability, and capacity, and may be
          limited in number;
        </li>
        <li>
          becomes binding only when reflected in a separate written service
          agreement signed by both parties, which will define the applicable
          metrics (including how usage or return through your website or
          Google Business Profile is measured), duration, pricing, and exit
          mechanics;
        </li>
        <li>
          may be modified, suspended, or withdrawn by us at any time before
          such an agreement is signed, without liability; and
        </li>
        <li>
          cannot be combined with other promotions unless we state otherwise.
        </li>
      </ul>
      <p>
        Descriptions of offers on this website are summaries only; in case of
        conflict, the signed service agreement prevails.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The website and everything on it, including the Guest Overflow name, logo,
        design, text, the demo widget and its code, and the fictional venue
        content, belong to us or our licensors. We grant you a limited,
        revocable, non-exclusive, non-transferable licence to access and view
        the website for internal business evaluation purposes. No other
        licence is granted or implied, and our name and marks may not be used
        without our written consent.
      </p>

      <h2>9. Acceptable use</h2>
      <p>When using this website you must not:</p>
      <ul className={UL}>
        <li>
          access or collect content through automated means (robots, spiders,
          scrapers, crawlers) or any data mining or extraction method;
        </li>
        <li>
          submit forms by automated means, or submit false, misleading, or
          third-party information;
        </li>
        <li>
          decompile, reverse engineer, or otherwise attempt to derive the
          source code or underlying logic of the website or the demo widget;
        </li>
        <li>
          interfere with, probe, overload, or send fabricated or manipulated
          requests to the website or its analytics or telemetry endpoints;
        </li>
        <li>
          carry out security testing without our prior written authorisation;
          or
        </li>
        <li>
          use website content to train machine-learning or AI models.
        </li>
      </ul>

      <h2>10. Demo requests and communications</h2>
      <p>
        When you submit a demo request you confirm the information you provide
        is accurate and relates to your own business. We will make reasonable
        efforts to respond promptly, but we are not obliged to respond to,
        accept, or act on any request.
      </p>

      <h2>11. Third-party links</h2>
      <p>
        Links to third-party websites or services are provided for convenience
        only. We do not endorse them and are not responsible for their
        content, terms, or privacy practices.
      </p>

      <h2>12. Privacy</h2>
      <p>
        Our processing of personal data in connection with this website,
        including the demo request form and website analytics, is described in
        our{" "}
        <Link href="/privacy" className="text-amber underline underline-offset-2">
          Privacy Policy
        </Link>
        . Please review it; it explains your rights under the GDPR. The
        Privacy Policy is an information notice and is not part of these
        Terms.
      </p>

      <h2>13. Disclaimer of warranties</h2>
      <p>
        The website is provided on an &quot;as is&quot; and &quot;as
        available&quot; basis. To the extent permitted by law, we make no
        warranty that the website will be uninterrupted, error-free, or
        secure, and no warranty as to the accuracy or completeness of its
        content, which is general marketing information and not professional
        advice.
      </p>

      <h2>14. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or
        consequential damages arising from the use of this website, including
        lost profits, lost revenue, lost data, or lost business opportunity,
        even if advised of the possibility. Our total aggregate liability
        arising from or related to the use of this free website is limited to
        one hundred euros (€100). Nothing in these Terms excludes or limits
        liability for wilful misconduct (dolo) or gross negligence (culpa
        grave), for death or personal injury, or for any liability that
        cannot be excluded under applicable law.
      </p>

      <h2>15. Indemnification</h2>
      <p>
        You will indemnify us against claims, damages, and reasonable costs
        arising from your breach of these Terms, your misuse of the website,
        or information you submit through it.
      </p>

      <h2>16. Suspension and termination of access</h2>
      <p>
        We may suspend, restrict, or terminate your access to the website at
        any time, with or without notice, including for breach of these
        Terms. Sections 8, 13, 14, 15, and 18 survive any termination.
      </p>

      <h2>17. Changes to these terms</h2>
      <p>
        We may amend these Terms at any time by posting the updated version
        here with a new date. Continued use of the website after changes are
        posted constitutes acceptance of the updated Terms.
      </p>

      <h2>18. Governing law and jurisdiction</h2>
      <p>
        These Terms, and any non-contractual obligations arising from them,
        are governed by the laws of Portugal. The courts of the district of
        Lisbon, Portugal have exclusive jurisdiction, without prejudice to
        mandatory rules conferring jurisdiction elsewhere.
      </p>

      <h2>19. General</h2>
      <p>
        If any provision of these Terms is found invalid, the remainder stays
        in force. A failure to enforce a provision is not a waiver of it.
        These Terms are drawn up in English. For questions about these Terms,
        contact{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
