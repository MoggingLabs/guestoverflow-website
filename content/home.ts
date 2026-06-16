import type { Differentiator, HowItWorksStep } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

const en = {
  hero: {
    eyebrow: "White-label online booking",
    headline: "Booking that belongs on your website.",
    subhead:
      "Guest Overflow is a reservation system we design into your own website, so it looks and feels like your brand. Guests book directly with you, and every guest relationship stays yours.",
  },
  problems: {
    title: "Why send your guests somewhere else to book?",
    items: [
      {
        title: "Third-party apps own your guests",
        body: "Booking platforms sit between you and the people you host. They keep the guest emails and the booking history, and you end up paying to reach your own customers.",
      },
      {
        title: "You pay commission per cover",
        body: "With per-booking fees, the busier you are, the more you pay. It adds up fast, especially on the nights you work hardest.",
      },
      {
        title: "The booking page isn't yours",
        body: "You've put real care into your website, but the moment guests try to book, they land on a generic page that looks nothing like you.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Live demo",
    title: "See for yourself. Try booking a table.",
    subhead:
      "This is a real Guest Overflow widget running right here on the page. Switch the venue type to see how the same system looks when it's styled for a different business.",
    caption: "One booking system, styled to match each venue.",
  },
  howItWorks: {
    title: "Up and running in days.",
    subhead: "You bring the venue, and we take care of the rest, from design to installation.",
    steps: [
      {
        title: "We design it into your site",
        body: "Our team builds the booking experience to match your brand, from typography to tone of voice, and installs it on your existing website. You never have to touch code.",
      },
      {
        title: "Guests book in seconds",
        body: "Guests pick a date, a party size, and a time without ever leaving your site. The whole flow works just as well on a phone as it does on a laptop.",
      },
      {
        title: "You own every reservation",
        body: "Bookings, guest details, and preferences all land in your dashboard. They're yours to keep, export, and build on, with nobody in between.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Why venues choose Guest Overflow.",
    ctaLine: "Book a demo and see it on your website",
    items: [
      {
        icon: "brand",
        title: "Truly yours",
        body: "Guest Overflow lives on your domain and wears your brand. Guests book without ever leaving your site, and they never see our name.",
      },
      {
        icon: "commission",
        title: "No per-cover commission",
        body: "You pay a flat monthly price that stays the same however busy you get. A full Saturday costs you exactly what a quiet Tuesday does.",
      },
      {
        icon: "data",
        title: "Own your guest data",
        body: "Every booking, preference, and email address is yours, and you can export it all whenever you like. There's no marketplace between you and your guests.",
      },
      {
        icon: "concierge",
        title: "Concierge setup, personal results",
        body: "We design, build, and install everything, and you get a founder as your direct contact, design revisions until the widget truly matches your brand, and a quarterly sit-down going over your bookings, no-shows, and repeat guests.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Built for the way you host.",
    subhead:
      "Whether you take table reservations, room bookings, treatments, appointments, or tour departures, Guest Overflow adapts to how your business actually works.",
    explore: "Explore →",
  },
  noWebsite: {
    eyebrow: "No website yet?",
    title: "You can still take bookings.",
    subhead:
      "Plenty of great venues run on word of mouth and a Google listing. That's a fine place to start, and we meet you there.",
    ctaLine: "Not sure where you fit? Let's talk it through",
    paths: [
      {
        title: "Start with your Google Business Profile",
        body: "We optimize your Google Business Profile so people searching for a place like yours actually find you, see the right photos and hours, and book you directly. It's the fastest and most affordable way to get online bookings working.",
        badge: "The starting point",
      },
      {
        title: "Ready for more? We build your website",
        body: "When you want a home of your own on the web, we design and build a full website with booking built in from day one. It's our higher-level offering, and most venues grow into it after seeing what an optimized profile alone brings in.",
        badge: "The full picture",
      },
    ],
  },
  promiseStrip: {
    eyebrow: "How we work",
    title: "Our promise: complete transparency.",
    body: "Start with three months at half price. If you don't see real return or real usage through your website or your Google Business Profile in that time, you can end the relationship cleanly, no questions asked and no hard feelings. We'd rather part as friends than keep a client who isn't winning.",
  },
  builtFor: {
    line: "Built for independent restaurants, boutique hotels, spas, salons, and tour operators.",
    credibility:
      "We've spent years building high-converting websites for guest-facing businesses. Guest Overflow is everything our clients kept asking for.",
  },
  faqTitle: "Questions, answered.",
  problemsEyebrow: "The problem",
  liveDemoEyebrow: "Live demo",
  howItWorksEyebrow: "How it works",
  whyEyebrow: "Why Guest Overflow",
  industriesEyebrow: "Industries",
  footerCta: {
    headline: "Ready to take bookings on your own website?",
    subhead:
      "See Guest Overflow running on a site like yours. The demo takes 20 minutes, and there's no commitment.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Reservas online white-label",
    headline: "Reservas que pertencem ao seu site.",
    subhead:
      "O Guest Overflow é um sistema de reservas que desenhamos dentro do seu próprio site, com o aspeto e a voz da sua marca. Os clientes reservam diretamente consigo, e cada relação fica sua.",
  },
  problems: {
    title: "Porquê enviar os seus clientes para outro lado para reservar?",
    items: [
      {
        title: "As plataformas ficam com os seus clientes",
        body: "As plataformas de reservas colocam-se entre si e as pessoas que recebe. Ficam com os emails e o histórico de reservas, e acaba a pagar para chegar aos seus próprios clientes.",
      },
      {
        title: "Paga comissão por reserva",
        body: "Com taxas por reserva, quanto mais trabalha, mais paga. A conta cresce depressa, sobretudo nas noites em que mais se esforça.",
      },
      {
        title: "A página de reservas não é sua",
        body: "Investiu a sério no seu site, mas no momento de reservar os clientes caem numa página genérica que não se parece nada consigo.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Demo ao vivo",
    title: "Veja por si mesmo. Experimente reservar uma mesa.",
    subhead:
      "Este é um widget Guest Overflow real, a funcionar aqui na página. Mude o tipo de espaço para ver como o mesmo sistema fica com outra marca.",
    caption: "Um único sistema de reservas, à medida de cada espaço.",
  },
  howItWorks: {
    title: "A funcionar em poucos dias.",
    subhead: "Traz o seu espaço, e nós tratamos do resto, do design à instalação.",
    steps: [
      {
        title: "Desenhamos tudo dentro do seu site",
        body: "A nossa equipa constrói a experiência de reserva à medida da sua marca, da tipografia ao tom de voz, e instala-a no seu site atual. Nunca precisa de tocar em código.",
      },
      {
        title: "Os clientes reservam em segundos",
        body: "Escolhem a data, o número de pessoas e a hora sem sair do seu site. Todo o processo funciona tão bem no telemóvel como no computador.",
      },
      {
        title: "Cada reserva é sua",
        body: "Reservas, contactos e preferências chegam ao seu painel. São seus para guardar, exportar e fazer crescer, sem intermediários.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Porque é que os espaços escolhem o Guest Overflow.",
    ctaLine: "Marque uma demonstração e veja-o no seu site",
    items: [
      {
        icon: "brand",
        title: "Verdadeiramente seu",
        body: "O Guest Overflow vive no seu domínio e veste a sua marca. Os clientes reservam sem sair do seu site, e nunca veem o nosso nome.",
      },
      {
        icon: "commission",
        title: "Sem comissão por reserva",
        body: "Paga um valor mensal fixo que não muda por estar mais cheio. Um sábado esgotado custa exatamente o mesmo que uma terça-feira calma.",
      },
      {
        icon: "data",
        title: "Os dados dos clientes são seus",
        body: "Cada reserva, preferência e email é seu, e pode exportar tudo quando quiser. Não há nenhum marketplace entre si e os seus clientes.",
      },
      {
        icon: "concierge",
        title: "Instalação concierge, resultados pessoais",
        body: "Desenhamos, construímos e instalamos tudo, e tem um fundador como contacto direto, revisões de design até o widget ficar mesmo com a sua marca, e uma reunião trimestral sobre reservas, faltas e clientes habituais.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Feito para a forma como recebe.",
    subhead:
      "Quer trabalhe com reservas de mesa, quartos, tratamentos, marcações ou partidas de tours, o Guest Overflow adapta-se à forma como o seu negócio realmente funciona.",
    explore: "Explorar →",
  },
  noWebsite: {
    eyebrow: "Ainda sem site?",
    title: "Mesmo assim pode receber reservas.",
    subhead:
      "Muitos espaços excelentes vivem do passa-palavra e de uma ficha no Google. É um ótimo ponto de partida, e nós vamos ter consigo aí.",
    ctaLine: "Não sabe onde encaixa? Falamos sobre isso",
    paths: [
      {
        title: "Comece pelo seu Perfil de Empresa no Google",
        body: "Otimizamos o seu Perfil de Empresa no Google para que quem procura um espaço como o seu o encontre de facto, veja as fotos e horários certos, e reserve diretamente. É a forma mais rápida e acessível de pôr as reservas online a funcionar.",
        badge: "O ponto de partida",
      },
      {
        title: "Pronto para mais? Construímos o seu site",
        body: "Quando quiser uma casa própria na internet, desenhamos e construímos um site completo com reservas integradas desde o primeiro dia. É a nossa oferta de nível superior, e a maioria dos espaços chega lá depois de ver o que um perfil otimizado consegue sozinho.",
        badge: "O quadro completo",
      },
    ],
  },
  promiseStrip: {
    eyebrow: "Como trabalhamos",
    title: "A nossa promessa: transparência total.",
    body: "Comece com três meses a metade do preço. Se nesse período não vir retorno nem utilização reais através do seu site ou do seu Perfil de Empresa no Google, pode terminar a relação de forma limpa, sem perguntas e sem ressentimentos. Preferimos despedir-nos como amigos a manter um cliente que não está a ganhar.",
  },
  builtFor: {
    line: "Feito para restaurantes independentes, hotéis boutique, spas, cabeleireiros e operadores de tours.",
    credibility:
      "Passámos anos a construir sites de alta conversão para negócios que vivem de reservas. O Guest Overflow é tudo o que os nossos clientes nos pediam.",
  },
  faqTitle: "Perguntas, respondidas.",
  problemsEyebrow: "O problema",
  liveDemoEyebrow: "Demo ao vivo",
  howItWorksEyebrow: "Como funciona",
  whyEyebrow: "Porquê o Guest Overflow",
  industriesEyebrow: "Setores",
  footerCta: {
    headline: "Pronto para receber reservas no seu próprio site?",
    subhead:
      "Veja o Guest Overflow a funcionar num site como o seu. A demonstração demora 20 minutos e não tem qualquer compromisso.",
  },
};

export const homeContent: Record<Locale, typeof en> = { en, pt };
