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
  sectorPicker: { eyebrow: string; title: string; subhead: string; from: (eur: number) => string };
  calc: { title: string; subhead: string };
};

// Placeholder price points. Confirm real numbers before launch.
const en: PricingContent = {
  hero: {
    eyebrow: "Pricing",
    headline: "Flat pricing. No commission on your bookings.",
    subhead:
      "Whatever your chair count or how busy you get, your price does not change, and the prices are published here on a public page. Final quotes depend on your setup, so every plan below begins with a demo.",
  },
  tiers: [
    {
      name: "Essential",
      monthlyEur: 99,
      priceNote: "For a single venue beginning with the platform",
      blurb: "The branded booking page on your site, with the core toolkit.",
      features: [
        "White-label booking page on your website",
        "Real-time availability & capacity management",
        "Branded confirmations & reminders",
        "Guest list with full export",
        "Email support",
      ],
    },
    {
      name: "Premium",
      monthlyEur: 249,
      priceNote: "For venues that depend on bookings",
      blurb: "Everything in Essential, plus protection and analytics.",
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
        "Multiple venues, custom integrations, or a requirement we have not yet anticipated.",
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
    annualBadge: "one third off",
    mostPopular: "Most popular",
    letsTalk: "Contact us",
    fromPerMonth: (eur) => `from €${eur}/mo`,
    billedAnnually: "billed annually",
    monthlyWord: "monthly",
    orAnnually: (eur) => `or €${eur}/mo billed annually`,
  },
  comparison: {
    title: "What commission really costs",
    body: "A salon taking 800 appointments a month at €2-3 commission per appointment pays €19,200-28,800 a year, for a booking page that does not even belong to it. Guest Overflow replaces that with a flat subscription that remains constant even in your busiest month.",
  },
  foundingPartner: {
    badge: "Founding offer",
    title: "Three months at half price, with a straightforward exit",
    body: "Join as a founding salon and pay half price for your first three months. If you do not observe genuine return or genuine usage through your website or your Google Business Profile during that period, you may end the relationship without complication. No justification is required and no exit fees apply. We seek only clients for whom the platform delivers measurable results.",
    cta: "Claim the founding offer",
  },
  offerDisclaimer: {
    before: "Subject to eligibility and a separate written agreement. See the ",
    linkLabel: "Terms of Service",
    after: ".",
  },
  noWebsiteOffer: {
    eyebrow: "Getting found",
    title: "Start with your Google Business Profile",
    body: "If you do not have a website, we begin by optimizing your Google Business Profile so that clients can find and book you. Rather than renting your visibility on Google, you retain ownership of it. When you are ready for more, we design and build a full website with booking included. That is our higher-level offering, and there is no obligation to reach it on day one.",
    points: [
      "Google Business Profile optimization as the affordable starting point",
      "Bookings operating without a website of your own",
      "A full custom website with built-in booking when you are ready to expand",
    ],
  },
  transparency: {
    eyebrow: "How we work",
    title: "Complete transparency, in writing",
    body: "We measure everything together. Every month you see exactly what came through your website or your Google profile, how many appointments it booked, what we changed, and whether it succeeded. If the figures do not justify the relationship after the three-month pilot, ending it requires one sentence in an email. No justification is required, and the relationship concludes amicably.",
  },
  sectorPicker: {
    eyebrow: "Pricing for salons & barbers",
    title: "Pricing built for salons and barbershops",
    subhead:
      "Plans and prices framed for how salons and barbershops actually take bookings.",
    from: (eur) => `from €${eur}/mo`,
  },
  calc: {
    title: "See what commission really costs you",
    subhead: "A flat price against the rising fee a marketplace like Fresha or Booksy bills as you grow.",
  },
};

const pt: PricingContent = {
  hero: {
    eyebrow: "Preços",
    headline: "Preço fixo. Sem comissão nas suas marcações.",
    subhead:
      "Seja qual for o número de cadeiras ou a procura que tiver, o preço mantém-se, e encontra-se publicado nesta página pública. O orçamento final depende da sua instalação, por isso cada plano abaixo começa com uma demonstração.",
  },
  tiers: [
    {
      name: "Essential",
      monthlyEur: 99,
      priceNote: "Para um espaço a começar",
      blurb: "A página de reservas com a sua marca no seu site, com as ferramentas essenciais.",
      features: [
        "Página de reservas white-label no seu site",
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
        "Vários espaços, integrações à medida, ou um requisito que ainda não tenhamos previsto.",
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
    letsTalk: "Contacte-nos",
    fromPerMonth: (eur) => `desde ${eur} €/mês`,
    billedAnnually: "faturado anualmente",
    monthlyWord: "mensal",
    orAnnually: (eur) => `ou ${eur} €/mês com faturação anual`,
  },
  comparison: {
    title: "O que a comissão custa realmente",
    body: "Um salão com 800 marcações por mês a 2 a 3 € de comissão por marcação paga 19.200 a 28.800 € por ano, por uma página de reservas que nem sequer é sua. O Guest Overflow substitui isso por uma subscrição fixa que se mantém constante mesmo no mês de maior procura.",
  },
  foundingPartner: {
    badge: "Oferta de lançamento",
    title: "Três meses a metade do preço, com uma saída simples",
    body: "Junte-se como salão fundador e pague metade do preço nos primeiros três meses. Se nesse período não verificar retorno nem utilização reais através do seu site ou do seu Perfil de Empresa no Google, pode terminar a relação sem complicações. Não é exigida qualquer justificação e não se aplicam custos de saída. Procuramos apenas clientes para quem a plataforma produz resultados mensuráveis.",
    cta: "Garantir a oferta de lançamento",
  },
  offerDisclaimer: {
    before: "Sujeito a elegibilidade e a um contrato escrito separado. Consulte os ",
    linkLabel: "Termos de Serviço",
    after: ".",
  },
  noWebsiteOffer: {
    eyebrow: "Ser encontrado",
    title: "Comece pelo seu Perfil de Empresa no Google",
    body: "Se não tem site, começamos por otimizar o seu Perfil de Empresa no Google para que os clientes o encontrem e marquem efetivamente. Em vez de alugar a sua visibilidade no Google, mantém a sua propriedade. Quando pretender mais, desenhamos e construímos um site completo com reservas integradas. É a nossa oferta de nível superior, e não existe obrigação de a atingir no primeiro dia.",
    points: [
      "Otimização do Perfil de Empresa no Google como porta de entrada acessível",
      "Reservas a funcionar sem precisar de site próprio",
      "Um site completo à medida com reservas integradas quando pretender expandir",
    ],
  },
  transparency: {
    eyebrow: "Como trabalhamos",
    title: "Transparência total, por escrito",
    body: "Medimos tudo em conjunto. Todos os meses vê exatamente o que chegou através do seu site ou do seu perfil no Google, quantas marcações gerou, o que alterámos e se resultou. Se os números não justificarem a relação no fim do piloto de três meses, terminá-la é uma frase num email. Não é exigida qualquer justificação, e a relação termina de forma cordial.",
  },
  sectorPicker: {
    eyebrow: "Preços para salões e barbearias",
    title: "Preços feitos para salões e barbearias",
    subhead:
      "Planos e preços pensados para a forma como os salões e as barbearias recebem marcações.",
    from: (eur) => `desde ${eur} €/mês`,
  },
  calc: {
    title: "Veja o que a comissão lhe custa realmente",
    subhead: "Um preço fixo face à taxa crescente que um marketplace como a Fresha ou a Booksy cobra à medida que cresce.",
  },
};

export const pricingContent: Record<Locale, PricingContent> = { en, pt };
