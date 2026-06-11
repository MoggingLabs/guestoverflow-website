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
        title: "The widget, live",
        body: "We walk through a real booking flow themed to a venue like yours, then talk through what your own version would look like.",
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
    body: "This is the widget we'll theme for your venue. Make a booking, switch the style.",
    caption: "One booking system, styled to match each venue.",
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
        title: "O widget, ao vivo",
        body: "Percorremos um fluxo de reserva real com o tema de um espaço como o seu e conversamos sobre como ficaria a sua própria versão.",
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
    body: "Este é o widget que vamos adaptar ao seu espaço. Faça uma reserva, mude o estilo.",
    caption: "Um único sistema de reservas, à medida de cada espaço.",
  },
};

export const demoContent: Record<Locale, DemoContent> = { en, pt };
