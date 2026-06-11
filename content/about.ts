import type { Locale } from "@/lib/i18n-shared";

type AboutContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  story: { title: string; paragraphs: string[] };
  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
};

const en: AboutContent = {
  hero: {
    eyebrow: "About",
    headline: "Built by the people who build hospitality websites.",
    subhead:
      'Guest Overflow comes from MoggingLabs, a studio that has spent years crafting high-converting websites for restaurants, contractors, and local businesses. Every client conversation ended the same way: "can the booking look like the rest of the site?" Now it can.',
  },
  story: {
    title: "Why Guest Overflow exists",
    paragraphs: [
      "We kept shipping beautiful hospitality websites that fell apart at the most important moment: the booking. Owners were paying commissions to platforms that hid their brand, kept hold of their guest lists, and looked nothing like the sites we'd built for them.",
      "Guest Overflow is our answer. It's a reservation system designed to blend into the venue's own website, so the guest experiences your brand from the first click to the confirmation email, and you keep every relationship the booking creates.",
      "We're starting deliberately small, with a founding group of venues we can onboard personally. We'd rather have the product shaped by the people who run venues than by a feature checklist.",
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "What we believe",
    items: [
      {
        title: "The brand is the venue's",
        body: "Software should be invisible. If a guest notices Guest Overflow, we've designed it wrong.",
      },
      {
        title: "Data belongs to the host",
        body: "Guest relationships are the most valuable thing a venue owns. We will never sit between you and them.",
      },
      {
        title: "Flat beats percentage",
        body: "We don't think you should pay more just because you're doing well. Our incentive is your renewal, not your volume.",
      },
    ],
  },
};

const pt: AboutContent = {
  hero: {
    eyebrow: "Sobre nós",
    headline: "Feito por quem constrói sites para hotelaria e restauração.",
    subhead:
      "O Guest Overflow nasce da MoggingLabs, um estúdio que passou anos a criar sites de alta conversão para restaurantes e negócios locais. Todas as conversas com clientes acabavam da mesma forma: “a reserva pode ficar com o aspeto do resto do site?” Agora pode.",
  },
  story: {
    title: "Porque é que o Guest Overflow existe",
    paragraphs: [
      "Entregávamos sites bonitos para restauração e hotelaria que se desmanchavam no momento mais importante: a reserva. Os donos pagavam comissões a plataformas que escondiam a sua marca, guardavam as suas listas de clientes e não se pareciam nada com os sites que tínhamos construído.",
      "O Guest Overflow é a nossa resposta. É um sistema de reservas desenhado para se fundir com o site do próprio espaço, para que o cliente viva a sua marca do primeiro clique ao email de confirmação, e cada relação criada pela reserva fique consigo.",
      "Estamos a começar deliberadamente pequenos, com um grupo fundador de espaços que conseguimos acompanhar pessoalmente. Preferimos um produto moldado por quem gere espaços do que por uma lista de funcionalidades.",
    ],
  },
  principles: {
    eyebrow: "Princípios",
    title: "Aquilo em que acreditamos",
    items: [
      {
        title: "A marca é do espaço",
        body: "O software deve ser invisível. Se um cliente reparar no Guest Overflow, desenhámo-lo mal.",
      },
      {
        title: "Os dados pertencem ao anfitrião",
        body: "As relações com os clientes são o ativo mais valioso de um espaço. Nunca nos colocaremos entre si e eles.",
      },
      {
        title: "Fixo ganha a percentagem",
        body: "Não achamos que deva pagar mais só porque as coisas estão a correr bem. O nosso incentivo é a sua renovação, não o seu volume.",
      },
    ],
  },
};

export const aboutContent: Record<Locale, AboutContent> = { en, pt };
