import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Guest Overflow collects, uses, and protects personal data, including our cookieless analytics and your rights under the GDPR.",
};

const UL = "list-disc space-y-1.5 pl-5";

export default async function PrivacyPage() {
  const { getLocale } = await import("@/lib/i18n");
  const locale = await getLocale();

  return (
    <LegalLayout title="Privacy policy" updated="June 10, 2026">
      {locale === "pt" && (
        <p className="rounded-md border border-amber-deep/50 bg-amber/10 px-4 py-3 text-xs leading-relaxed text-amber">
          Este documento legal é disponibilizado em inglês. Em caso de dúvida
          ou conflito, prevalece a versão inglesa. Se precisar de
          esclarecimentos em português, escreva-nos e teremos todo o gosto em
          ajudar.
        </p>
      )}
      <h2>1. Who we are</h2>
      <p>
        Guest Overflow is a service operated by [LEGAL ENTITY NAME], a company
        registered in Portugal with registered office at [REGISTERED ADDRESS]
        and commercial registry / NIPC number [NUMBER] (&quot;we&quot;,
        &quot;us&quot;). We are the controller of the personal data described
        in this policy. You can reach us about anything in this policy at{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        . We are not required to appoint a Data Protection Officer; the email
        above is our privacy contact.
      </p>

      <h2>2. What this policy covers</h2>
      <p>
        This policy covers this website only. When we provide booking,
        website, or Google Business Profile services to a client venue, that
        processing is governed by the service agreement and data processing
        terms we sign with the client, not by this policy.
      </p>

      <h2>3. What we collect and why</h2>
      <p>
        <strong className="text-cream">Demo request form.</strong> If you ask
        for a demo we collect your full name, work email, business name and
        business type (including the description you give if you choose
        &quot;Other&quot;), and, only if you provide them, the channels where
        guests find you, a preferred date and time slots, and your message. We
        use this information solely to respond to your request, schedule the
        demo, and send you a confirmation email. We do not add you to any
        marketing list and we do not send newsletters. When you submit the
        form we also process your IP address in memory only, to prevent spam
        and abuse; it is not stored.
      </p>
      <p>
        <strong className="text-cream">Cookieless website analytics.</strong>{" "}
        We measure how this website is used with a privacy-first analytics
        system we built ourselves. It uses no cookies, no localStorage, and no
        third-party trackers. To count unique visitors, our server computes a
        one-way hash (SHA-256) of a secret salt, your IP address, and your
        browser&apos;s user-agent string. The raw IP address and user-agent
        are never stored. The salt changes every day and old salts are
        deleted, which makes it impossible for us to recognize you across days
        or link your visits together. Your country is derived from a
        network-level header provided by our hosting platform, not from a
        stored IP address. The events we record are things like page views,
        scroll depth, clicks on our own buttons, interactions with the booking
        demo, and JavaScript errors. For our demo form we record which fields
        were completed or abandoned and how long they took, never the values
        you type. Traffic that identifies itself as automated (bots, crawlers)
        is discarded.
      </p>
      <p>
        <strong className="text-cream">The interactive booking demo.</strong>{" "}
        Anything you type into the booking demo widget, including any name or
        email, is processed entirely in your browser. It is never transmitted
        to our servers and never stored anywhere.
      </p>
      <p>
        <strong className="text-cream">Email.</strong> When you submit a demo
        request we send a confirmation to you and a notification to ourselves
        through our email provider, Resend. These are transactional emails
        related to your request, not marketing.
      </p>
      <p>
        <strong className="text-cream">Hosting and logs.</strong> Our hosting
        provider processes standard technical data (such as IP addresses and
        request metadata) to deliver the website and keep it secure. Such
        server logs are kept for a short period, typically under 30 days.
      </p>

      <h2>4. Legal bases</h2>
      <ul className={UL}>
        <li>
          Demo requests and related emails: taking steps at your request prior
          to entering into a contract (Article 6(1)(b) GDPR) where you act on
          your own behalf; otherwise our legitimate interest in responding to
          business enquiries (Article 6(1)(f)).
        </li>
        <li>
          Spam prevention and rate limiting: our legitimate interest in
          keeping the website secure (Article 6(1)(f), Recital 49).
        </li>
        <li>
          Website analytics: our legitimate interest in understanding
          aggregate website usage and improving the site (Article 6(1)(f)).
          The system is deliberately designed so that the resulting statistics
          cannot identify you.
        </li>
        <li>
          Hosting and server logs: our legitimate interest in operating and
          securing the website (Article 6(1)(f)).
        </li>
      </ul>

      <h2>5. Cookies and similar technologies</h2>
      <p>
        This website does not use cookies for visitors, and we do not show a
        cookie banner because there is nothing to ask consent for: no
        advertising, no cross-site tracking, no third-party analytics. There
        are two narrow technical exceptions. First, when our own staff log in
        to the administration area, a strictly necessary session cookie is set
        for that staff member only. Second, we use sessionStorage, a small
        piece of browser memory that is automatically deleted when you close
        the tab, to hold a random session identifier so we can count a visit
        as one session. It contains no personal information and cannot be used
        to track you across sessions or across sites.
      </p>

      <h2>6. Who we share data with</h2>
      <p>
        We never sell personal data and we never share it for anyone
        else&apos;s marketing. We use a small number of service providers who
        process data on our instructions under data processing agreements:
      </p>
      <ul className={UL}>
        <li>Vercel Inc. (website hosting and delivery)</li>
        <li>Resend (transactional email delivery)</li>
      </ul>
      <p>
        We may also disclose data where the law requires it or to protect our
        legal rights.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Our lead database is hosted in the European Union. Where our providers
        process data in the United States, the transfer is protected by the
        EU-US Data Privacy Framework for certified providers (Vercel and
        Resend are certified) and by the European Commission&apos;s Standard
        Contractual Clauses, supplemented by technical measures.
      </p>

      <h2>8. How long we keep data</h2>
      <ul className={UL}>
        <li>
          Demo request details: up to 24 months from our last meaningful
          contact with you, after which they are deleted. If you become a
          client, your data moves to the client relationship and is kept as
          required by contract and by Portuguese accounting law (up to 10
          years for invoicing records).
        </li>
        <li>
          Analytics events: up to 26 months, after which they are deleted or
          reduced to aggregate statistics. Because of the daily salt rotation,
          stored events cannot be linked back to you at any point.
        </li>
        <li>Server logs: a short period, typically under 30 days.</li>
        <li>
          Rate-limiting IP data: held in memory only, for minutes, and never
          written to disk.
        </li>
      </ul>

      <h2>9. How we protect data</h2>
      <p>
        We use encryption in transit, access controls on our systems, an
        EU-region database, and pseudonymization of analytics data by design.
        If a personal data breach occurs we will notify the supervisory
        authority within 72 hours where required, and affected people where
        the law requires it. No method of transmission or storage is
        completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>10. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul className={UL}>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data erased;</li>
        <li>restrict how we process it;</li>
        <li>receive your data in a portable format; and</li>
        <li>
          <strong className="text-cream">
            object at any time to processing based on our legitimate
            interests, including the analytics described above.
          </strong>
        </li>
      </ul>
      <p>
        One honest note: our analytics is designed so that we cannot identify
        you. In most cases we are therefore unable to locate analytics data
        about a specific person (Article 11 GDPR), and rights requests will in
        practice concern demo request data.
      </p>

      <h2>11. How to exercise your rights</h2>
      <p>
        Email{" "}
        <a href={`mailto:${site.email}`} className="text-amber underline underline-offset-2">
          {site.email}
        </a>
        . We may ask you to verify your identity before acting on a request.
        We respond within one month, extendable by two further months for
        complex requests, and requests are free of charge unless they are
        manifestly unfounded or excessive.
      </p>

      <h2>12. Complaints</h2>
      <p>
        You have the right to lodge a complaint with a supervisory authority,
        in particular in the EU member state where you live or work. Our lead
        authority is the Portuguese supervisory authority: Comissão Nacional
        de Proteção de Dados (CNPD), Av. D. Carlos I, 134, 1.º, 1200-651
        Lisboa, Portugal, www.cnpd.pt, geral@cnpd.pt.
      </p>

      <h2>13. Children</h2>
      <p>
        This website and our services are directed at businesses. We do not
        knowingly collect personal data from anyone under 16.
      </p>

      <h2>14. Do you have to provide your data?</h2>
      <p>
        Providing your details in the demo form is not a statutory or
        contractual requirement, but without your name and work email we
        cannot respond to your request. All other fields are optional.
      </p>

      <h2>15. No profiling, no automated decisions, no selling</h2>
      <p>
        We do not carry out profiling or automated decision-making, we do not
        build marketing lists, and we never sell personal data. If we ever
        introduce a newsletter, it will be strictly opt-in.
      </p>

      <h2>16. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will post the new
        version here and update the date at the top. For material changes
        affecting people who have submitted a demo request, we will notify you
        by email where feasible. See also our{" "}
        <Link href="/terms" className="text-amber underline underline-offset-2">
          Terms of Service
        </Link>
        .
      </p>
    </LegalLayout>
  );
}
