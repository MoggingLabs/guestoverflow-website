import type { Locale } from "@/lib/i18n-shared";

type DemoContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  expectations: { title: string; items: { title: string; body: string }[] };
  reassurance: string;
  tryWidget: { title: string; body: string; caption: string };
};

const en: DemoContent = {
  eyebrow: "Book a demo",
  headline: "See Guest Overflow on a site like your business's, in 20 minutes.",
  subhead:
    "A working session, not a sales pitch. We will show you the booking flow, the dashboard, and what your branded version would look like.",
  expectations: {
    title: "What to expect",
    items: [
      {
        title: "Your booking page, live",
        body: "We will walk through a real booking page tailored to a business like yours, and then discuss how yours would work.",
      },
      {
        title: "Your setup, scoped",
        body: "We will review your current website and explain precisely what launching your booking page would involve, and how quickly.",
      },
      {
        title: "Straight answers",
        body: "Ask us anything about pricing, data ownership, or how your specific setup would work. There is no pressure at the close of the session.",
      },
    ],
  },
  reassurance:
    "There is no pressure. We will confirm your slot within one business day.",
  tryWidget: {
    title: "Try it during your visit",
    body: "This is the booking page we will build for your business. Make an appointment and see how it works.",
    caption: "One booking engine, tailored to your business.",
  },
};

const pt: DemoContent = {
  eyebrow: "Marcar demonstração",
  headline: "Veja o Guest Overflow num site como o do seu negócio, em 20 minutos.",
  subhead:
    "Uma sessão de trabalho, não um discurso de vendas. Mostramos-lhe o fluxo de reservas, o painel e como ficaria a sua versão com a sua marca.",
  expectations: {
    title: "O que esperar",
    items: [
      {
        title: "A sua página de reservas, ao vivo",
        body: "Percorremos uma página de reservas real, à medida de um negócio como o seu, e analisamos consigo como ficaria a sua.",
      },
      {
        title: "A sua instalação, definida",
        body: "Analisamos o seu site atual e indicamos-lhe com precisão o que o lançamento da sua página de reservas envolveria, e em quanto tempo.",
      },
      {
        title: "Respostas diretas",
        body: "Pergunte-nos o que quiser sobre preços, propriedade dos dados ou como funcionaria o seu caso concreto. Sem pressão no final da sessão.",
      },
    ],
  },
  reassurance:
    "Não há pressão. Confirmamos o seu horário no prazo de um dia útil.",
  tryWidget: {
    title: "Experimente durante a sua visita",
    body: "Esta é a página de reservas que vamos construir para o seu negócio. Faça uma marcação e veja como funciona.",
    caption: "Um único motor de reservas, à medida do seu negócio.",
  },
};

export const demoContent: Record<Locale, DemoContent> = { en, pt };
