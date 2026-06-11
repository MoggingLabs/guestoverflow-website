import type { Feature } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

type ProductContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  features: Feature[];
  ownYourData: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  liveDemo: { eyebrow: string; title: string; subhead: string; caption: string };
};

const en: ProductContent = {
  hero: {
    eyebrow: "Product",
    headline: "Everything you need to take bookings on your own website.",
    subhead:
      "Guest Overflow handles the whole reservation journey, from the moment a guest lands on your site to the moment they come back to book again.",
  },
  features: [
    {
      icon: "widget",
      title: "A widget designed into your site",
      body: "Typography, colors, copy, and flow tailored to your venue by people who build websites for a living. It's a designed part of your site, not a themed iframe, with availability, capacity, and blackout dates updating in real time.",
    },
    {
      icon: "compass",
      title: "Booked from Google, Instagram, and WhatsApp",
      body: "Reserve with Google lets people book straight from your Google listing and Maps, booking links go on Instagram and Facebook, and WhatsApp reaches guests in the conversations they already have open.",
    },
    {
      icon: "data",
      title: "Guest CRM & export",
      body: "Every booking builds your guest book with visits, preferences, and notes. It's yours to keep and export as a CSV any day, and we never use it for anything else.",
    },
    {
      icon: "shield",
      title: "Deposits & no-show protection",
      body: "Card guarantees and deposits for the bookings that hurt most to lose, paid into your own Stripe account, with policies you control per service and party size. Deposits show up on the final bill, not in a side spreadsheet.",
    },
    {
      icon: "bell",
      title: "Confirmations & reminders",
      body: "Branded confirmations and well-timed reminders go out automatically by email and WhatsApp, which makes a real dent in no-shows.",
    },
    {
      icon: "chart",
      title: "Booking analytics",
      body: "See where bookings come from, when demand peaks, and which slots underperform, so your decisions are backed by your own numbers.",
    },
  ],
  ownYourData: {
    eyebrow: "The principle",
    title: "Your guest data is yours, and it stays that way.",
    body: "Marketplace platforms built very large businesses on data that restaurants and hotels generated for them. Guest Overflow is set up so that can't happen here: your bookings and your guests live in your account, and you can export everything at any time. We charge for the software, nothing more.",
    points: [
      "You own everything: your site, your domain, your guest data, your Stripe account",
      "Full data export, any time, no questions",
      "No marketing to your guests, ever",
      "Guest data on EU servers, under a Portuguese-law contract, GDPR by design",
    ],
  },
  liveDemo: {
    eyebrow: "Live demo",
    title: "Try it for yourself.",
    subhead:
      "This is the same widget your guests would use. Make a booking, then switch venue types to see it restyled.",
    caption: "One booking system, styled to match each venue.",
  },
};

const pt: ProductContent = {
  hero: {
    eyebrow: "Produto",
    headline: "Tudo o que precisa para receber reservas no seu próprio site.",
    subhead:
      "O Guest Overflow trata de todo o percurso da reserva, desde o momento em que o cliente chega ao seu site até ao momento em que volta para reservar de novo.",
  },
  features: [
    {
      icon: "widget",
      title: "Um widget desenhado dentro do seu site",
      body: "Tipografia, cores, textos e fluxo à medida do seu espaço, feitos por quem constrói sites profissionalmente. É uma parte desenhada do seu site, não um iframe com um tema, com disponibilidade, capacidade e datas bloqueadas a atualizar em tempo real.",
    },
    {
      icon: "compass",
      title: "Reservas a partir do Google, Instagram e WhatsApp",
      body: "Com o Reserve with Google, as pessoas reservam diretamente a partir da sua ficha no Google e no Maps; os links de reserva vão para o Instagram e o Facebook; e o WhatsApp chega aos clientes nas conversas que já têm abertas.",
    },
    {
      icon: "data",
      title: "CRM de clientes e exportação",
      body: "Cada reserva enriquece o seu livro de clientes com visitas, preferências e notas. É seu para guardar e exportar em CSV em qualquer dia, e nunca o usamos para mais nada.",
    },
    {
      icon: "shield",
      title: "Sinais e proteção contra faltas",
      body: "Garantias de cartão e sinais para as reservas que mais custam a perder, pagos diretamente na sua conta Stripe, com regras que controla por serviço e tamanho de grupo. Os sinais aparecem na conta final, não numa folha à parte.",
    },
    {
      icon: "bell",
      title: "Confirmações e lembretes",
      body: "Confirmações com a sua marca e lembretes na hora certa, enviados automaticamente por email e WhatsApp, com um efeito real na redução de faltas.",
    },
    {
      icon: "chart",
      title: "Análise de reservas",
      body: "Veja de onde vêm as reservas, quando a procura atinge picos e que horários ficam aquém, para decidir com base nos seus próprios números.",
    },
  ],
  ownYourData: {
    eyebrow: "O princípio",
    title: "Os dados dos seus clientes são seus, e assim ficam.",
    body: "As plataformas-marketplace construíram negócios enormes com dados que restaurantes e hotéis geraram para elas. O Guest Overflow foi montado para que isso não possa acontecer aqui: as suas reservas e os seus clientes vivem na sua conta, e pode exportar tudo a qualquer momento. Cobramos pelo software, nada mais.",
    points: [
      "É dono de tudo: o seu site, o seu domínio, os dados dos clientes, a sua conta Stripe",
      "Exportação completa dos dados, a qualquer momento, sem perguntas",
      "Nunca fazemos marketing aos seus clientes",
      "Dados em servidores na UE, contrato sob lei portuguesa, RGPD desde a base",
    ],
  },
  liveDemo: {
    eyebrow: "Demo ao vivo",
    title: "Experimente por si mesmo.",
    subhead:
      "Este é o mesmo widget que os seus clientes usariam. Faça uma reserva e depois mude o tipo de espaço para o ver com outra imagem.",
    caption: "Um único sistema de reservas, à medida de cada espaço.",
  },
};

export const productContent: Record<Locale, ProductContent> = { en, pt };
