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
    eyebrow: "Booking page",
    headline: "Your booking page does the whole job.",
    subhead:
      "One booking page, built around how your venue operates, handles the entire reservation journey, from the moment a guest arrives on it to the moment they return to book again.",
  },
  features: [
    {
      icon: "widget",
      title: "Your booking page, two ways to go live",
      body: "Run it as its own branded page, the link for your Google profile, Instagram bio, and advertising, or embedded directly on your site, by people who build websites professionally. It is a designed part of your brand, not a themed iframe, with availability, capacity, and blackout dates updating in real time.",
    },
    {
      icon: "compass",
      title: "Booked from Google, Instagram, and WhatsApp",
      body: "Reserve with Google allows people to book directly from your Google listing and Maps, booking links are placed on Instagram and Facebook, and WhatsApp reaches guests within the conversations they already have open.",
    },
    {
      icon: "data",
      title: "Guest CRM & export",
      body: "Every booking builds your guest book with visits, preferences, and notes. It is yours to retain and export as a CSV on any day, and we never use it for any other purpose.",
    },
    {
      icon: "shield",
      title: "Deposits & no-show protection",
      body: "Card guarantees and deposits for the bookings that are most costly to lose, paid into your own Stripe account, with policies you control per service and party size. Guests pay in the manner they already use, with MB WAY, Multibanco, and card, and deposits appear on the final bill rather than in a separate spreadsheet.",
    },
    {
      icon: "bell",
      title: "Confirmations & reminders",
      body: "Branded confirmations and well-timed reminders are sent automatically by email and WhatsApp, which substantially reduces no-shows.",
    },
    {
      icon: "chart",
      title: "Booking analytics",
      body: "See where bookings originate, when demand peaks, and which slots underperform, so your decisions are supported by your own numbers.",
    },
  ],
  ownYourData: {
    eyebrow: "The principle",
    title: "Your guest data is yours, and it stays that way.",
    body: "Marketplace platforms built very large businesses on data that restaurants and hotels generated for them. Guest Overflow is structured so that this cannot occur here: your bookings and your guests reside in your account, and you can export everything at any time. We charge for the software, nothing more.",
    points: [
      "You own everything: your site, your domain, your guest data, your Stripe account",
      "Full data export, at any time, without conditions",
      "No marketing to your guests, ever",
      "Guest data on EU servers, under a Portuguese-law contract, GDPR by design",
    ],
  },
  liveDemo: {
    eyebrow: "Live demo",
    title: "Try your booking page.",
    subhead:
      "This is the same booking page your guests would use. Make a booking, then switch venue types to see it adapt to each operation.",
    caption: "One booking engine, tailored to each operation.",
  },
};

const pt: ProductContent = {
  hero: {
    eyebrow: "Página de reservas",
    headline: "A sua página de reservas faz o trabalho todo.",
    subhead:
      "Uma página de reservas, construída em torno do modo como o seu espaço funciona, trata de todo o percurso da reserva, desde o momento em que o cliente chega até ao momento em que regressa para reservar novamente.",
  },
  features: [
    {
      icon: "widget",
      title: "A sua página de reservas, duas formas de a colocar no ar",
      body: "No ar como página própria com a sua marca, o link para o seu perfil no Google, a bio do Instagram e a publicidade, ou integrada no seu site, por quem constrói sites profissionalmente. É uma parte desenhada da sua marca, não um iframe com um tema, com disponibilidade, capacidade e datas bloqueadas a atualizar em tempo real.",
    },
    {
      icon: "compass",
      title: "Reservas a partir do Google, Instagram e WhatsApp",
      body: "Com o Reserve with Google, as pessoas reservam diretamente a partir da sua ficha no Google e no Maps; os links de reserva são colocados no Instagram e no Facebook; e o WhatsApp chega aos clientes nas conversas que já têm abertas.",
    },
    {
      icon: "data",
      title: "CRM de clientes e exportação",
      body: "Cada reserva enriquece o seu livro de clientes com visitas, preferências e notas. É seu para guardar e exportar em CSV em qualquer dia, e nunca o utilizamos para qualquer outro fim.",
    },
    {
      icon: "shield",
      title: "Sinais e proteção contra faltas",
      body: "Garantias de cartão e sinais para as reservas que mais custam a perder, pagos diretamente na sua conta Stripe, com regras que controla por serviço e tamanho de grupo. Os clientes pagam da forma a que já estão habituados, com MB WAY, Multibanco e cartão, e os sinais aparecem na conta final, não numa folha à parte.",
    },
    {
      icon: "bell",
      title: "Confirmações e lembretes",
      body: "Confirmações com a sua marca e lembretes na hora certa, enviados automaticamente por email e WhatsApp, com um efeito significativo na redução de faltas.",
    },
    {
      icon: "chart",
      title: "Análise de reservas",
      body: "Veja de onde provêm as reservas, quando a procura atinge picos e que horários ficam aquém, para decidir com base nos seus próprios números.",
    },
  ],
  ownYourData: {
    eyebrow: "O princípio",
    title: "Os dados dos seus clientes são seus, e assim permanecem.",
    body: "As plataformas-marketplace construíram negócios enormes com dados que restaurantes e hotéis geraram para elas. O Guest Overflow foi estruturado para que isso não possa acontecer aqui: as suas reservas e os seus clientes residem na sua conta, e pode exportar tudo a qualquer momento. Cobramos pelo software, nada mais.",
    points: [
      "É dono de tudo: o seu site, o seu domínio, os dados dos clientes, a sua conta Stripe",
      "Exportação completa dos dados, a qualquer momento, sem condições",
      "Nunca fazemos marketing aos seus clientes",
      "Dados em servidores na UE, contrato sob lei portuguesa, RGPD desde a base",
    ],
  },
  liveDemo: {
    eyebrow: "Demo ao vivo",
    title: "Experimente a sua página de reservas.",
    subhead:
      "Esta é a mesma página de reservas que os seus clientes usariam. Faça uma reserva e depois mude o tipo de espaço para a ver adaptar-se a cada operação.",
    caption: "Um único motor de reservas, à medida de cada operação.",
  },
};

export const productContent: Record<Locale, ProductContent> = { en, pt };
