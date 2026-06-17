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
      "One booking page, built around how your salon operates, handles the entire appointment journey, from the moment a client arrives on it to the moment they rebook their next visit.",
  },
  features: [
    {
      icon: "widget",
      title: "Your own branded booking page",
      body: "It runs as its own branded page on your domain, the link for your Google profile, Instagram bio, and advertising, designed and built by people who build websites professionally. It is a considered part of your salon's brand, with chair availability, service durations, and blackout dates updating in real time.",
    },
    {
      icon: "compass",
      title: "Booked from Google, Instagram, and WhatsApp",
      body: "Reserve with Google allows people to book directly from your Google listing and Maps, booking links are placed on Instagram and Facebook, and WhatsApp reaches clients within the conversations they already have open.",
    },
    {
      icon: "data",
      title: "Client CRM & export",
      body: "Every appointment builds your client book with visits, service history, and notes. It is yours to retain and export as a CSV on any day, and we never use it for any other purpose.",
    },
    {
      icon: "shield",
      title: "Deposits & no-show protection",
      body: "Card guarantees and deposits for the appointments that are most costly to lose, paid into your own account, with policies you control per service and appointment. Clients pay in the manner they already use, with MB WAY, Multibanco, and card, and deposits appear on the final bill rather than in a separate spreadsheet.",
    },
    {
      icon: "bell",
      title: "Confirmations & reminders",
      body: "Branded confirmations and well-timed reminders are sent automatically by email and WhatsApp, which substantially reduces no-shows and keeps chairs filled.",
    },
    {
      icon: "chart",
      title: "Booking analytics",
      body: "See where appointments originate, when demand peaks, and which slots underperform, so your decisions are supported by your own numbers.",
    },
  ],
  ownYourData: {
    eyebrow: "The principle",
    title: "Your client data is yours, and it stays that way.",
    body: "Marketplace platforms like Fresha and Booksy built very large businesses on data that salons and barbershops generated for them. Guest Overflow is structured so that this cannot occur here: your appointments and your clients reside in your account, and you can export everything at any time. We charge for the software, nothing more.",
    points: [
      "You own everything: your site, your domain, your client data, your payment account",
      "Full data export, at any time, without conditions",
      "No marketing to your clients, ever",
      "Client data on EU servers, under a Portuguese-law contract, GDPR by design",
    ],
  },
  liveDemo: {
    eyebrow: "Live demo",
    title: "Try your booking page.",
    subhead:
      "This is the same booking page your clients would use. Make an appointment and see how it fits the way a salon takes bookings.",
    caption: "One booking engine, tailored to your salon.",
  },
};

const pt: ProductContent = {
  hero: {
    eyebrow: "Página de reservas",
    headline: "A sua página de reservas faz o trabalho todo.",
    subhead:
      "Uma página de reservas, construída em torno do modo como o seu salão funciona, trata de todo o percurso da marcação, desde o momento em que o cliente chega até ao momento em que marca a sua próxima visita.",
  },
  features: [
    {
      icon: "widget",
      title: "A sua própria página de reservas com a sua marca",
      body: "No ar como página própria com a sua marca, no seu domínio, o link para o seu perfil no Google, a bio do Instagram e a publicidade, desenhada e construída por quem constrói sites profissionalmente. É uma parte pensada da marca do seu salão, com disponibilidade de cadeiras, durações de serviço e datas bloqueadas a atualizar em tempo real.",
    },
    {
      icon: "compass",
      title: "Reservas a partir do Google, Instagram e WhatsApp",
      body: "Com o Reserve with Google, as pessoas marcam diretamente a partir da sua ficha no Google e no Maps; os links de reserva são colocados no Instagram e no Facebook; e o WhatsApp chega aos clientes nas conversas que já têm abertas.",
    },
    {
      icon: "data",
      title: "CRM de clientes e exportação",
      body: "Cada marcação enriquece o seu livro de clientes com visitas, histórico de serviços e notas. É seu para guardar e exportar em CSV em qualquer dia, e nunca o utilizamos para qualquer outro fim.",
    },
    {
      icon: "shield",
      title: "Sinais e proteção contra faltas",
      body: "Garantias de cartão e sinais para as marcações que mais custam a perder, pagos diretamente na sua conta, com regras que controla por serviço e por marcação. Os clientes pagam da forma a que já estão habituados, com MB WAY, Multibanco e cartão, e os sinais aparecem na conta final, não numa folha à parte.",
    },
    {
      icon: "bell",
      title: "Confirmações e lembretes",
      body: "Confirmações com a sua marca e lembretes na hora certa, enviados automaticamente por email e WhatsApp, com um efeito significativo na redução de faltas e em manter as cadeiras ocupadas.",
    },
    {
      icon: "chart",
      title: "Análise de reservas",
      body: "Veja de onde provêm as marcações, quando a procura atinge picos e que horários ficam aquém, para decidir com base nos seus próprios números.",
    },
  ],
  ownYourData: {
    eyebrow: "O princípio",
    title: "Os dados dos seus clientes são seus, e assim permanecem.",
    body: "As plataformas-marketplace como a Fresha e a Booksy construíram negócios enormes com dados que salões e barbearias geraram para elas. O Guest Overflow foi estruturado para que isso não possa acontecer aqui: as suas marcações e os seus clientes residem na sua conta, e pode exportar tudo a qualquer momento. Cobramos pelo software, nada mais.",
    points: [
      "É dono de tudo: o seu site, o seu domínio, os dados dos clientes, a sua conta de pagamentos",
      "Exportação completa dos dados, a qualquer momento, sem condições",
      "Nunca fazemos marketing aos seus clientes",
      "Dados em servidores na UE, contrato sob lei portuguesa, RGPD desde a base",
    ],
  },
  liveDemo: {
    eyebrow: "Demo ao vivo",
    title: "Experimente a sua página de reservas.",
    subhead:
      "Esta é a mesma página de reservas que os seus clientes usariam. Faça uma marcação e veja como se ajusta à forma como um salão recebe reservas.",
    caption: "Um único motor de reservas, à medida do seu salão.",
  },
};

export const productContent: Record<Locale, ProductContent> = { en, pt };
