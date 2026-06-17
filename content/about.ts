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
    headline: "Built by the people who build guest-facing websites.",
    subhead:
      'Guest Overflow comes from a team that has spent years building high-converting websites for restaurants, contractors, and local businesses. Every client conversation ended with the same question: "can the booking look like the rest of the site?" It now can.',
  },
  story: {
    title: "Why Guest Overflow exists",
    paragraphs: [
      "We were delivering well-designed websites that failed at the most important moment: the booking. Owners were paying commissions to platforms that concealed their brand, retained their guest lists, and bore no resemblance to the sites we had built for them.",
      "Guest Overflow is our response. It is a reservation system that integrates into the venue's own website, so the guest experiences your brand from the first click to the confirmation email, and you retain every relationship the booking creates.",
      "We are starting deliberately small, with a founding group of venues we can onboard personally. We would rather the product be shaped by the people who run venues than by a feature checklist.",
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "What we believe",
    items: [
      {
        title: "The brand is the venue's",
        body: "Software should be invisible. If a guest notices Guest Overflow, we have designed it incorrectly.",
      },
      {
        title: "Data belongs to the host",
        body: "Guest relationships are the most valuable asset a venue owns. We will never position ourselves between you and them.",
      },
      {
        title: "Flat beats percentage",
        body: "We do not believe you should pay more simply because your business is performing well. Our incentive is your renewal, not your volume.",
      },
    ],
  },
};

const pt: AboutContent = {
  hero: {
    eyebrow: "Sobre nós",
    headline: "Feito por quem constrói sites para negócios que vivem de reservas.",
    subhead:
      "O Guest Overflow nasce de uma equipa que passou anos a desenvolver sites de alta conversão para restaurantes e negócios locais. Todas as conversas com clientes terminavam com a mesma pergunta: “a reserva pode ficar com o aspeto do resto do site?” Agora pode.",
  },
  story: {
    title: "Porque é que o Guest Overflow existe",
    paragraphs: [
      "Entregávamos sites bem concebidos que falhavam no momento mais importante: a reserva. Os proprietários pagavam comissões a plataformas que ocultavam a sua marca, retinham as suas listas de clientes e em nada se assemelhavam aos sites que tínhamos construído.",
      "O Guest Overflow é a nossa resposta. É um sistema de reservas concebido para se integrar com o site do próprio espaço, para que o cliente experiencie a sua marca do primeiro clique ao email de confirmação, e cada relação criada pela reserva permaneça consigo.",
      "Estamos a começar deliberadamente pequenos, com um grupo fundador de espaços que conseguimos acompanhar pessoalmente. Preferimos um produto moldado por quem gere espaços a um produto definido por uma lista de funcionalidades.",
    ],
  },
  principles: {
    eyebrow: "Princípios",
    title: "Aquilo em que acreditamos",
    items: [
      {
        title: "A marca é do espaço",
        body: "O software deve ser invisível. Se um cliente reparar no Guest Overflow, concebemo-lo incorretamente.",
      },
      {
        title: "Os dados pertencem ao anfitrião",
        body: "As relações com os clientes são o ativo mais valioso de um espaço. Nunca nos colocaremos entre si e eles.",
      },
      {
        title: "Fixo ganha à percentagem",
        body: "Não consideramos que deva pagar mais apenas porque o seu negócio está a ter bom desempenho. O nosso incentivo é a sua renovação, não o seu volume.",
      },
    ],
  },
};

export const aboutContent: Record<Locale, AboutContent> = { en, pt };
