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
    headline: "Quandoo shuts down in December 2026. Keep your bookings — and your guest data.",
    subhead:
      "New bookings on Quandoo end in September 2026. When it closes, its terms mean your diner data goes with it. We'll move you across for free — onto a booking widget you own, with no commission, ever.",
  },
  stakes: {
    title: "What happens when Quandoo closes",
    body: "Quandoo is winding down with no buyer. After it shuts, the guest history you built there is gone for good. Restaurants that did everything right still lose their list — unless they export it first.",
  },
  stepsTitle: "How the free migration works",
  steps: [
    {
      title: "We export your data",
      body: "We pull your full guest list and booking history out of Quandoo before the deadline, at no cost to you.",
    },
    {
      title: "We rebuild it on your site",
      body: "Your branded booking widget goes live on your own website, themed to your restaurant, with no per-cover fee.",
    },
    {
      title: "You keep everyone",
      body: "Your guests, their history, and every future booking stay yours, exportable at any time, in writing.",
    },
  ],
  cta: { label: "Claim a free Quandoo migration" },
  footer: {
    headline: "Don't let your guest list close with Quandoo.",
    subhead: "Book a 20-minute call and we'll handle the move before the September deadline.",
  },
};

const pt: QuandooContent = {
  hero: {
    eyebrow: "O Quandoo vai fechar",
    headline: "O Quandoo encerra em dezembro de 2026. Fique com as suas reservas — e com os dados dos seus clientes.",
    subhead:
      "As novas reservas no Quandoo terminam em setembro de 2026. Quando fechar, os seus termos significam que os dados dos clientes vão com ele. Mudamo-lo de graça — para um widget de reservas que é seu, sem comissão, nunca.",
  },
  stakes: {
    title: "O que acontece quando o Quandoo fechar",
    body: "O Quandoo está a encerrar sem comprador. Depois de fechar, o histórico de clientes que construiu lá desaparece para sempre. Restaurantes que fizeram tudo certo perdem na mesma a sua lista — a menos que a exportem primeiro.",
  },
  stepsTitle: "Como funciona a migração gratuita",
  steps: [
    {
      title: "Exportamos os seus dados",
      body: "Retiramos a sua lista completa de clientes e o histórico de reservas do Quandoo antes do prazo, sem custos para si.",
    },
    {
      title: "Reconstruímos no seu site",
      body: "O seu widget de reservas com a sua marca fica online no seu próprio site, à imagem do seu restaurante, sem taxa por pessoa.",
    },
    {
      title: "Fica com toda a gente",
      body: "Os seus clientes, o histórico deles e todas as reservas futuras ficam consigo, exportáveis a qualquer momento, por escrito.",
    },
  ],
  cta: { label: "Garantir uma migração gratuita do Quandoo" },
  footer: {
    headline: "Não deixe a sua lista de clientes fechar com o Quandoo.",
    subhead: "Marque uma chamada de 20 minutos e tratamos da mudança antes do prazo de setembro.",
  },
};

export const quandooContent: Record<Locale, QuandooContent> = { en, pt };
