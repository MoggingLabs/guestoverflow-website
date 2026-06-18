import type { Locale } from "@/lib/i18n-shared";

type PricingContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  tierUi: {
    monthly: string;
    annual: string;
    annualBadge: string;
    mostPopular: string;
    letsTalk: string;
    fromPerMonth: (eur: number) => string;
    perMonth: (eur: number) => string;
    flatMonthly: string;
    billedAnnually: string;
    monthlyWord: string;
    orAnnually: (eur: number) => string;
    setupFee: (eur: number) => string;
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
      "However busy you get, your price never rises with your bookings — there is no commission and no per-booking fee. Every plan's price is published right here, and each one begins with a demo.",
  },
  tierUi: {
    monthly: "Monthly",
    annual: "Annual",
    annualBadge: "15% off",
    mostPopular: "Most popular",
    letsTalk: "Contact us",
    fromPerMonth: (eur) => `from €${eur}/mo`,
    perMonth: (eur) => `€${eur}/mo`,
    flatMonthly: "Flat monthly price",
    billedAnnually: "billed annually",
    monthlyWord: "monthly",
    orAnnually: (eur) => `or €${eur}/mo billed annually`,
    setupFee: (eur) => `+ €${eur} one-time setup`,
  },
  comparison: {
    title: "What commission really costs",
    body: "A salon taking 800 appointments a month at €2-3 commission per appointment pays €19,200-28,800 a year, for a booking page that does not even belong to it. Guest Overflow replaces that with a flat subscription that remains constant even in your busiest month.",
  },
  foundingPartner: {
    badge: "Founding offer",
    title: "Three months at half price",
    body: "Join as a founding salon and pay half price for your first three months. We work closely with you to make the platform deliver measurable results through your website and your Google Business Profile, and you see exactly what it produces every month.",
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
    title: "A close relationship, real support",
    body: "We work as a true partner, not a faceless platform. You have a direct line to us whenever you need it, with people who know your salon and answer quickly. We want the best for the businesses we serve, and we measure our own success by yours, so when something is not working we are already on it with you.",
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
      "Por mais movimento que tenha, o preço nunca sobe com as suas marcações — não há comissão nem taxa por marcação. O preço de cada plano está publicado aqui mesmo, e cada um começa com uma demonstração.",
  },
  tierUi: {
    monthly: "Mensal",
    annual: "Anual",
    annualBadge: "15% de desconto",
    mostPopular: "Mais popular",
    letsTalk: "Contacte-nos",
    fromPerMonth: (eur) => `desde ${eur} €/mês`,
    perMonth: (eur) => `${eur} €/mês`,
    flatMonthly: "Preço fixo mensal",
    billedAnnually: "faturado anualmente",
    monthlyWord: "mensal",
    orAnnually: (eur) => `ou ${eur} €/mês com faturação anual`,
    setupFee: (eur) => `+ ${eur} € de instalação única`,
  },
  comparison: {
    title: "O que a comissão custa realmente",
    body: "Um salão com 800 marcações por mês a 2 a 3 € de comissão por marcação paga 19.200 a 28.800 € por ano, por uma página de reservas que nem sequer é sua. O Guest Overflow substitui isso por uma subscrição fixa que se mantém constante mesmo no mês de maior procura.",
  },
  foundingPartner: {
    badge: "Oferta de lançamento",
    title: "Três meses a metade do preço",
    body: "Junte-se como salão fundador e pague metade do preço nos primeiros três meses. Trabalhamos de perto consigo para que a plataforma produza resultados mensuráveis através do seu site e do seu Perfil de Empresa no Google, e vê exatamente o que produz todos os meses.",
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
    title: "Uma relação próxima, com apoio a sério",
    body: "Trabalhamos como um verdadeiro parceiro, não como uma plataforma sem rosto. Tem uma linha direta connosco sempre que precisar, com pessoas que conhecem o seu salão e respondem com rapidez. Queremos o melhor para os negócios que servimos, e medimos o nosso sucesso pelo seu, por isso, quando algo não está a resultar, já estamos a tratar disso consigo.",
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
