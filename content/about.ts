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
    headline: "Built by the people who build websites for salons and barbershops.",
    subhead:
      'Guest Overflow comes from a team that has spent years building high-converting websites for local businesses. Every client conversation ended with the same question: "can the booking look and feel like my own brand?" It now can, and now we build it for salons and barbershops.',
  },
  story: {
    title: "Why Guest Overflow exists",
    paragraphs: [
      "We were delivering well-designed websites that failed at the most important moment: the booking. Owners were paying commissions to platforms that concealed their brand, retained their client lists, and bore no resemblance to the sites we had built for them.",
      "Guest Overflow is our response. It is a custom booking system we build for the salon, on its own brand and domain, so the client experiences your brand from the first click to the confirmation email, and you retain every relationship the appointment creates.",
      "We are starting deliberately small, with a founding group of salons and barbershops we can onboard personally. We would rather the product be shaped by the people who run a chair than by a feature checklist.",
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "What we believe",
    items: [
      {
        title: "The brand is the salon's",
        body: "Software should be invisible. If a client notices Guest Overflow, we have designed it incorrectly.",
      },
      {
        title: "Data belongs to the salon",
        body: "Client relationships are the most valuable asset a salon owns. We will never position ourselves between you and them.",
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
    headline: "Feito por quem constrói sites para salões e barbearias.",
    subhead:
      "O Guest Overflow nasce de uma equipa que passou anos a desenvolver sites de alta conversão para negócios locais. Todas as conversas com clientes terminavam com a mesma pergunta: “a reserva pode ficar com o aspeto e a identidade da minha própria marca?” Agora pode, e agora construímo-lo para salões e barbearias.",
  },
  story: {
    title: "Porque é que o Guest Overflow existe",
    paragraphs: [
      "Entregávamos sites bem concebidos que falhavam no momento mais importante: a marcação. Os proprietários pagavam comissões a plataformas que ocultavam a sua marca, retinham as suas listas de clientes e em nada se assemelhavam aos sites que tínhamos construído.",
      "O Guest Overflow é a nossa resposta. É um sistema de reservas à medida que construímos para o salão, na sua própria marca e domínio, para que o cliente experiencie a sua marca do primeiro clique ao email de confirmação, e cada relação criada pela marcação permaneça consigo.",
      "Estamos a começar deliberadamente pequenos, com um grupo fundador de salões e barbearias que conseguimos acompanhar pessoalmente. Preferimos um produto moldado por quem gere uma cadeira a um produto definido por uma lista de funcionalidades.",
    ],
  },
  principles: {
    eyebrow: "Princípios",
    title: "Aquilo em que acreditamos",
    items: [
      {
        title: "A marca é do salão",
        body: "O software deve ser invisível. Se um cliente reparar no Guest Overflow, concebemo-lo incorretamente.",
      },
      {
        title: "Os dados pertencem ao salão",
        body: "As relações com os clientes são o ativo mais valioso de um salão. Nunca nos colocaremos entre si e eles.",
      },
      {
        title: "Fixo ganha à percentagem",
        body: "Não consideramos que deva pagar mais apenas porque o seu negócio está a ter bom desempenho. O nosso incentivo é a sua renovação, não o seu volume.",
      },
    ],
  },
};

export const aboutContent: Record<Locale, AboutContent> = { en, pt };
