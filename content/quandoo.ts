import type { Locale } from "@/lib/i18n-shared";

type QuandooContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  stakes: { title: string; body: string };
  stepsTitle: string;
  steps: { title: string; body: string }[];
  cta: { label: string };
  footer: { headline: string; subhead: string };
};

const en: QuandooContent = {
  hero: {
    eyebrow: "Quandoo is closing",
    headline: "Quandoo shuts down in December 2026. Retain your bookings and your guest data.",
    subhead:
      "New bookings on Quandoo end in September 2026. When it closes, its terms mean your diner data is lost with it. We will migrate you at no cost, onto a booking page you own, with no commission, ever.",
  },
  stakes: {
    title: "What happens when Quandoo closes",
    body: "Quandoo is winding down with no buyer. After it shuts down, the guest history you built there is permanently lost. Restaurants that did everything correctly still lose their list, unless they export it beforehand.",
  },
  stepsTitle: "How the free migration works",
  steps: [
    {
      title: "We export your data",
      body: "We extract your full guest list and booking history from Quandoo before the deadline, at no cost to you.",
    },
    {
      title: "We rebuild it on your site",
      body: "Your branded booking page goes live on your own website, themed to your restaurant, with no per-cover fee.",
    },
    {
      title: "You retain everyone",
      body: "Your guests, their history, and every future booking remain yours, exportable at any time, in writing.",
    },
  ],
  cta: { label: "Claim a free Quandoo migration" },
  footer: {
    headline: "Preserve your guest list before Quandoo closes.",
    subhead: "Book a 20-minute call and we will manage the migration before the September deadline.",
  },
};

const pt: QuandooContent = {
  hero: {
    eyebrow: "O Quandoo vai fechar",
    headline: "O Quandoo encerra em dezembro de 2026. Mantenha as suas reservas e os dados dos seus clientes.",
    subhead:
      "As novas reservas no Quandoo terminam em setembro de 2026. Quando encerrar, os seus termos significam que os dados dos clientes se perdem com ele. Procedemos à migração sem qualquer custo, para uma página de reservas que é sua, sem comissão, nunca.",
  },
  stakes: {
    title: "O que acontece quando o Quandoo encerrar",
    body: "O Quandoo está a encerrar sem comprador. Após o encerramento, o histórico de clientes que aí construiu perde-se de forma permanente. Os restaurantes que fizeram tudo corretamente perdem igualmente a sua lista, a menos que a exportem previamente.",
  },
  stepsTitle: "Como funciona a migração gratuita",
  steps: [
    {
      title: "Exportamos os seus dados",
      body: "Extraímos a sua lista completa de clientes e o histórico de reservas do Quandoo antes do prazo, sem custos para si.",
    },
    {
      title: "Reconstruímos no seu site",
      body: "A sua página de reservas com a sua marca fica online no seu próprio site, à imagem do seu restaurante, sem taxa por pessoa.",
    },
    {
      title: "Mantém todos os clientes",
      body: "Os seus clientes, o histórico deles e todas as reservas futuras permanecem consigo, exportáveis a qualquer momento, por escrito.",
    },
  ],
  cta: { label: "Garantir uma migração gratuita do Quandoo" },
  footer: {
    headline: "Preserve a sua lista de clientes antes do encerramento do Quandoo.",
    subhead: "Marque uma chamada de 20 minutos e tratamos da migração antes do prazo de setembro.",
  },
};

export const quandooContent: Record<Locale, QuandooContent> = { en, pt };
