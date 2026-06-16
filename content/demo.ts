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
  headline: "See Guest Overflow on a site like yours, in 20 minutes.",
  subhead:
    "A working session, not a sales pitch. We'll show you the booking flow, the dashboard, and what your branded version would look like.",
  expectations: {
    title: "What to expect",
    items: [
      {
        title: "Your booking page, live",
        body: "We walk through a real booking page tailored to a venue like yours, then talk through how yours would work.",
      },
      {
        title: "Your setup, scoped",
        body: "We look at your current website and tell you exactly what installing Guest Overflow would involve, and how fast.",
      },
      {
        title: "Straight answers",
        body: "Ask us anything about pricing, data ownership, or how your specific setup would work. There's no commitment and no pressure at the end.",
      },
    ],
  },
  reassurance:
    "There's no commitment. If we do work together, you start with three months at half price and a clean way out if it isn't earning its keep. We'll confirm your slot within one business day.",
  tryWidget: {
    title: "Try it while you're here",
    body: "This is the booking page we'll build for your venue. Make a booking, switch the venue type.",
    caption: "One booking engine, tailored to each operation.",
  },
};

const pt: DemoContent = {
  eyebrow: "Marcar demonstração",
  headline: "Veja o Guest Overflow num site como o seu, em 20 minutos.",
  subhead:
    "Uma sessão de trabalho, não um discurso de vendas. Mostramos-lhe o fluxo de reservas, o painel e como ficaria a sua versão com a sua marca.",
  expectations: {
    title: "O que esperar",
    items: [
      {
        title: "A sua página de reservas, ao vivo",
        body: "Percorremos uma página de reservas real, à medida de um espaço como o seu, e conversamos sobre como ficaria a sua.",
      },
      {
        title: "A sua instalação, definida",
        body: "Olhamos para o seu site atual e dizemos-lhe exatamente o que a instalação do Guest Overflow envolveria, e em quanto tempo.",
      },
      {
        title: "Respostas diretas",
        body: "Pergunte-nos o que quiser sobre preços, propriedade dos dados ou como funcionaria o seu caso concreto. Sem compromisso e sem pressão no fim.",
      },
    ],
  },
  reassurance:
    "Não há compromisso. Se viermos a trabalhar juntos, começa com três meses a metade do preço e uma saída limpa se não estiver a compensar. Confirmamos o seu horário no prazo de um dia útil.",
  tryWidget: {
    title: "Experimente enquanto está aqui",
    body: "Esta é a página de reservas que vamos construir para o seu espaço. Faça uma reserva, mude o tipo de espaço.",
    caption: "Um único motor de reservas, à medida de cada operação.",
  },
};

export const demoContent: Record<Locale, DemoContent> = { en, pt };
