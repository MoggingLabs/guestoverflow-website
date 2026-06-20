import type { Locale } from "@/lib/i18n-shared";
import { site } from "@/content/site";

/**
 * Central SEO copy. Titles/descriptions live here (per locale) so every page's
 * search appearance is reviewable in one place. The site targets Portugal, so
 * the PT strings are the ones crawlers index (see the default-locale logic in
 * lib/i18n.ts); EN mirrors the prior English literals so explicit-English
 * visitors see no regression.
 *
 * Per-page `title` values are plain strings: the root `title.template`
 * (`%s | Guest Overflow`) appends the brand automatically. og:title/og:description
 * are derived by Next from the resolved title/description.
 */
export type PageMeta = { title: string; description: string };

type SeoStrings = {
  /** OpenGraph locale tag. */
  ogLocale: string;
  /** Homepage + root default. */
  home: PageMeta;
  /** Services page title (its description is sourced from content/services). */
  servicesTitle: string;
  /** Localized title builders for the dynamic sector/compare pages. */
  industryTitle: (label: string) => string;
  pricingTitle: (label: string) => string;
  /** Static (literal-route) pages. */
  pages: Record<
    | "product"
    | "industries"
    | "pricing"
    | "calculator"
    | "compare"
    | "about"
    | "promises"
    | "bookADemo"
    | "privacy"
    | "terms",
    PageMeta
  >;
};

const en: SeoStrings = {
  ogLocale: "en_US",
  home: {
    title: "Online booking for your own website",
    description: site.description,
  },
  servicesTitle: "Services",
  industryTitle: (label) => `Online booking for ${label.toLowerCase()}`,
  pricingTitle: (label) => `${label} pricing`,
  pages: {
    product: {
      title: "Product",
      description:
        "The full reservation lifecycle: a branded booking page, real-time availability, guest CRM, deposits, reminders, and analytics, all on your own website.",
    },
    industries: {
      title: "Industries",
      description:
        "Guest Overflow powers custom online booking for guest-facing businesses, with one system shaped to how yours runs.",
    },
    pricing: {
      title: "Pricing",
      description:
        "Flat monthly pricing with no commission on your bookings, calibrated for businesses in Portugal.",
    },
    calculator: {
      title: "Commission savings calculator",
      description:
        "See how much commission a booking platform really costs you, and what you keep with Guest Overflow's flat price.",
    },
    compare: {
      title: "Compare Guest Overflow",
      description:
        "An honest side-by-side comparison of Guest Overflow against the booking platforms and marketplaces.",
    },
    about: {
      title: "About",
      description:
        "Guest Overflow is built by a team with years of experience crafting high-converting guest-facing websites.",
    },
    promises: {
      title: "Our promises",
      description:
        "Guest Overflow's contractual commitments: one-click data export, no commission, no surprise add-ons, no rate hikes, and public pricing.",
    },
    bookADemo: {
      title: "Book a demo",
      description:
        "A working session, not a sales pitch. We'll show you the booking flow, the dashboard, and what your branded version would look like.",
    },
    privacy: {
      title: "Privacy policy",
      description:
        "How Guest Overflow collects, uses, and protects personal data, including our cookieless analytics and your rights under the GDPR.",
    },
    terms: {
      title: "Terms of service",
      description:
        "The terms that govern the use of the Guest Overflow website, the interactive demo, and our promotional offers.",
    },
  },
};

const pt: SeoStrings = {
  ogLocale: "pt_PT",
  home: {
    title: "Reservas online no seu próprio site",
    description:
      "O Guest Overflow dá a cada negócio a sua própria página de reservas, com a sua marca. Preço fixo, sem comissões, e cada cliente continua a ser seu.",
  },
  servicesTitle: "Serviços",
  industryTitle: (label) => `Reservas online para ${label.toLowerCase()}`,
  pricingTitle: (label) => `Preços para ${label.toLowerCase()}`,
  pages: {
    product: {
      title: "A sua página de reservas",
      description:
        "O ciclo completo de reservas: página com a sua marca, disponibilidade em tempo real, CRM de clientes, sinais, lembretes e análises, tudo no seu próprio site.",
    },
    industries: {
      title: "Setores",
      description:
        "O Guest Overflow disponibiliza reservas online à medida para negócios que vivem de reservas, com um sistema moldado à forma como o seu trabalha.",
    },
    pricing: {
      title: "Preços",
      description:
        "Preço mensal fixo, sem comissão sobre as suas reservas, calibrado para negócios em Portugal.",
    },
    calculator: {
      title: "Calculadora de poupança em comissões",
      description:
        "Veja quanto lhe custa realmente a comissão de uma plataforma de reservas, e quanto fica consigo com o preço fixo do Guest Overflow.",
    },
    compare: {
      title: "Comparar o Guest Overflow",
      description:
        "Uma comparação honesta, lado a lado, do Guest Overflow face às plataformas e marketplaces de reservas.",
    },
    about: {
      title: "Sobre nós",
      description:
        "O Guest Overflow é criado por uma equipa com anos de experiência a construir sites de alta conversão para negócios que vivem de reservas.",
    },
    promises: {
      title: "As nossas promessas",
      description:
        "Os compromissos contratuais do Guest Overflow: exportação de dados num clique, sem comissões, sem extras-surpresa, sem aumentos de preço e preços públicos.",
    },
    bookADemo: {
      title: "Marcar demo",
      description:
        "Uma sessão de trabalho, não um discurso de vendas. Mostramos-lhe o fluxo de reservas, o painel e como ficaria a sua versão com a sua marca.",
    },
    privacy: {
      title: "Política de privacidade",
      description:
        "Como o Guest Overflow recolhe, utiliza e protege dados pessoais, incluindo a nossa análise sem cookies e os seus direitos ao abrigo do RGPD.",
    },
    terms: {
      title: "Termos de serviço",
      description:
        "Os termos que regem a utilização do site do Guest Overflow, da demo interativa e das nossas ofertas promocionais.",
    },
  },
};

export const seoStrings: Record<Locale, SeoStrings> = { en, pt };
