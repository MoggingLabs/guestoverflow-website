import type { PricingTier } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

type PricingContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  tiers: PricingTier[];
  tierUi: {
    monthly: string;
    annual: string;
    annualBadge: string;
    mostPopular: string;
    letsTalk: string;
    fromPerMonth: (eur: number) => string;
    billedAnnually: string;
    monthlyWord: string;
    orAnnually: (eur: number) => string;
  };
  comparison: { title: string; body: string };
  foundingPartner: { badge: string; title: string; body: string; cta: string };
  offerDisclaimer: { before: string; linkLabel: string; after: string };
  noWebsiteOffer: { eyebrow: string; title: string; body: string; points: string[] };
  transparency: { eyebrow: string; title: string; body: string };
};

// Placeholder price points — confirm real numbers before launch.
const en: PricingContent = {
  hero: {
    eyebrow: "Pricing",
    headline: "Flat pricing. No per-cover commission.",
    subhead:
      "Whatever your volume, your price doesn't move, and the prices are right here on a public page. Final quotes depend on your setup, so every plan below starts with a demo.",
  },
  tiers: [
    {
      name: "Essential",
      monthlyEur: 99,
      priceNote: "For a single venue getting started",
      blurb: "The branded booking widget on your site, with the core toolkit.",
      features: [
        "White-label booking widget on your website",
        "Real-time availability & capacity management",
        "Branded confirmations & reminders",
        "Guest list with full export",
        "Email support",
      ],
    },
    {
      name: "Premium",
      monthlyEur: 249,
      priceNote: "For venues that live on bookings",
      blurb: "Everything in Essential, plus protection and intelligence.",
      featured: true,
      features: [
        "Everything in Essential",
        "Deposits, card guarantees & no-show protection",
        "Booking analytics & demand insights",
        "Custom flow design (multi-service, practitioners, sessions)",
        "Concierge setup included",
        "Priority support",
      ],
    },
    {
      name: "Custom",
      monthlyEur: null,
      priceNote: "Groups & multi-location",
      blurb:
        "Multiple venues, custom integrations, or something we haven't thought of yet.",
      features: [
        "Everything in Premium",
        "Multi-location dashboard",
        "Custom integrations (PMS, POS, CRM)",
        "Dedicated account manager",
      ],
    },
  ],
  tierUi: {
    monthly: "Monthly",
    annual: "Annual",
    annualBadge: "a third off",
    mostPopular: "Most popular",
    letsTalk: "Let's talk",
    fromPerMonth: (eur) => `from €${eur}/mo`,
    billedAnnually: "billed annually",
    monthlyWord: "monthly",
    orAnnually: (eur) => `or €${eur}/mo billed annually`,
  },
  comparison: {
    title: "What commission really costs",
    body: "A restaurant seating 1,000 covers a month at €2–3 commission per cover pays €24,000–36,000 a year, for a booking page that isn't even theirs. Guest Overflow replaces that with a flat subscription that stays the same even in your busiest month.",
  },
  foundingPartner: {
    badge: "Founding offer",
    title: "Three months at half price, and a clean way out",
    body: "Join as a founding venue and pay half price for your first three months. If you don't see real return or real usage through your website or your Google Business Profile in that time, you can end the relationship cleanly. No questions asked, no exit fees, and everything stays good between us. We only want clients who are genuinely winning with this.",
    cta: "Claim the founding offer",
  },
  offerDisclaimer: {
    before: "Subject to eligibility and a separate written agreement. See the ",
    linkLabel: "Terms of Service",
    after: ".",
  },
  noWebsiteOffer: {
    eyebrow: "No website yet?",
    title: "Start with your Google Business Profile",
    body: "If you don't have a website, we begin by optimizing your Google Business Profile so people can actually find and book you. Don't rent your visibility on Google, own it. When you're ready for more, we design and build a full website with booking built in. That's our higher-level offering, and there's no pressure to get there on day one.",
    points: [
      "Google Business Profile optimization as the affordable starting point",
      "Bookings working without a website of your own",
      "A full custom website with built-in booking when you're ready to level up",
    ],
  },
  transparency: {
    eyebrow: "How we work",
    title: "Complete transparency, in writing",
    body: "We measure everything together. Every month you see exactly what came through your website or your Google profile, what we changed, and whether it worked. If the numbers don't justify the relationship after the three-month pilot, ending it takes one sentence in an email. No questions, no hard feelings.",
  },
};

const pt: PricingContent = {
  hero: {
    eyebrow: "Preços",
    headline: "Preço fixo. Sem comissão por reserva.",
    subhead:
      "Seja qual for o seu volume, o preço não mexe, e está aqui mesmo, numa página pública. O orçamento final depende da sua instalação, por isso cada plano abaixo começa com uma demonstração.",
  },
  tiers: [
    {
      name: "Essential",
      monthlyEur: 99,
      priceNote: "Para um espaço a começar",
      blurb: "O widget de reservas com a sua marca no seu site, com as ferramentas essenciais.",
      features: [
        "Widget de reservas white-label no seu site",
        "Disponibilidade e capacidade geridas em tempo real",
        "Confirmações e lembretes com a sua marca",
        "Lista de clientes com exportação completa",
        "Suporte por email",
      ],
    },
    {
      name: "Premium",
      monthlyEur: 249,
      priceNote: "Para espaços que vivem de reservas",
      blurb: "Tudo o que está no Essential, mais proteção e inteligência.",
      featured: true,
      features: [
        "Tudo o que está no Essential",
        "Sinais, garantias de cartão e proteção contra faltas",
        "Análise de reservas e tendências de procura",
        "Fluxos à medida (multi-serviço, terapeutas, sessões)",
        "Instalação concierge incluída",
        "Suporte prioritário",
      ],
    },
    {
      name: "À medida",
      monthlyEur: null,
      priceNote: "Grupos e várias localizações",
      blurb:
        "Vários espaços, integrações à medida, ou algo em que ainda não pensámos.",
      features: [
        "Tudo o que está no Premium",
        "Painel multi-localização",
        "Integrações à medida (PMS, POS, CRM)",
        "Gestor de conta dedicado",
      ],
    },
  ],
  tierUi: {
    monthly: "Mensal",
    annual: "Anual",
    annualBadge: "um terço de desconto",
    mostPopular: "Mais popular",
    letsTalk: "Vamos falar",
    fromPerMonth: (eur) => `desde ${eur} €/mês`,
    billedAnnually: "faturado anualmente",
    monthlyWord: "mensal",
    orAnnually: (eur) => `ou ${eur} €/mês com faturação anual`,
  },
  comparison: {
    title: "O que a comissão custa realmente",
    body: "Um restaurante com 1.000 reservas por mês a 2–3 € de comissão por pessoa paga 24.000 a 36.000 € por ano, por uma página de reservas que nem sequer é sua. O Guest Overflow substitui isso por uma subscrição fixa que não muda nem no seu mês mais cheio.",
  },
  foundingPartner: {
    badge: "Oferta de lançamento",
    title: "Três meses a metade do preço, e uma saída limpa",
    body: "Junte-se como espaço fundador e pague metade do preço nos primeiros três meses. Se nesse período não vir retorno nem utilização reais através do seu site ou do seu Perfil de Empresa no Google, pode terminar a relação de forma limpa. Sem perguntas, sem custos de saída, e tudo fica bem entre nós. Só queremos clientes que estejam genuinamente a ganhar com isto.",
    cta: "Garantir a oferta de lançamento",
  },
  offerDisclaimer: {
    before: "Sujeito a elegibilidade e a um contrato escrito separado. Consulte os ",
    linkLabel: "Termos de Serviço",
    after: ".",
  },
  noWebsiteOffer: {
    eyebrow: "Ainda sem site?",
    title: "Comece pelo seu Perfil de Empresa no Google",
    body: "Se não tem site, começamos por otimizar o seu Perfil de Empresa no Google para que as pessoas o encontrem e reservem de facto. Não alugue a sua visibilidade no Google, seja dono dela. Quando quiser mais, desenhamos e construímos um site completo com reservas integradas. É a nossa oferta de nível superior, e não há pressa de lá chegar no primeiro dia.",
    points: [
      "Otimização do Perfil de Empresa no Google como porta de entrada acessível",
      "Reservas a funcionar sem precisar de site próprio",
      "Um site completo à medida com reservas integradas quando quiser dar o salto",
    ],
  },
  transparency: {
    eyebrow: "Como trabalhamos",
    title: "Transparência total, por escrito",
    body: "Medimos tudo em conjunto. Todos os meses vê exatamente o que chegou através do seu site ou do seu perfil no Google, o que alterámos e se resultou. Se os números não justificarem a relação no fim do piloto de três meses, terminá-la é uma frase num email. Sem perguntas, sem ressentimentos.",
  },
};

export const pricingContent: Record<Locale, PricingContent> = { en, pt };
