import type { Locale } from "@/lib/i18n-shared";

type DemoContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  expectations: { title: string; items: { title: string; body: string }[] };
  reassurance: string;
};

const en: DemoContent = {
  eyebrow: "Book a demo",
  headline: "See Guest Overflow built for a business like yours, in 20 minutes.",
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
        body: "We will explain precisely what launching your branded booking page would involve, and how quickly, whether or not you have a website today.",
      },
      {
        title: "Straight answers",
        body: "Ask us anything about pricing, data ownership, or how your specific setup would work. There is no pressure at the close of the session.",
      },
    ],
  },
  reassurance:
    "There is no pressure. We will confirm your slot within one business day.",
};

const pt: DemoContent = {
  eyebrow: "Marcar demonstração",
  headline: "Veja o Guest Overflow criado para um negócio como o seu, em 20 minutos.",
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
        body: "Explicamos-lhe com precisão o que o lançamento da sua página de reservas com a sua marca envolveria, e em quanto tempo, quer tenha ou não um site hoje.",
      },
      {
        title: "Respostas diretas",
        body: "Pergunte-nos o que quiser sobre preços, propriedade dos dados ou como funcionaria o seu caso concreto. Sem pressão no final da sessão.",
      },
    ],
  },
  reassurance:
    "Não há pressão. Confirmamos o seu horário no prazo de um dia útil.",
};

export const demoContent: Record<Locale, DemoContent> = { en, pt };
