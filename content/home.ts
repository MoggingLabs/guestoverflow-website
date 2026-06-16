import type { Differentiator, HowItWorksStep } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

const en = {
  hero: {
    eyebrow: "Booking software you own",
    headline: "Your own booking page, built around how you operate.",
    subhead:
      "We design a booking page around your services, your hours, and your rules, on your brand and your domain. Guests book direct, you pay one flat price with no commission, and every guest relationship stays yours.",
  },
  problems: {
    title: "Why send your guests somewhere else to book?",
    items: [
      {
        title: "Third-party apps own your guests",
        body: "Booking platforms sit between you and the people you host. They keep the guest emails and the booking history, and you end up paying to reach your own customers.",
      },
      {
        title: "You pay commission on your own regulars",
        body: "Marketplaces bill you every time a guest books, including the regulars you already earned. The busier you are, the more you pay, and your most valuable guests become your most expensive channel.",
      },
      {
        title: "The booking page isn't yours",
        body: "You've put real care into your website, but the moment guests try to book, they land on a generic page that looks nothing like you.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Live demo",
    title: "This is your booking page. Try it.",
    subhead:
      "A real, working booking page running right here. Switch the venue type to watch the same system tailor itself to each operation, then put it live as its own branded page or embedded right on your site.",
    caption: "One booking engine, tailored to each operation. Live as a page, or embedded on your site.",
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
        title: "Own your guests, bring them back",
        body: "Every booking, preference, and contact is yours to keep and export. You keep the relationship and bring guests back yourself, without paying commission again to reach the people you already won.",
      },
      {
        icon: "concierge",
        title: "Concierge setup, personal results",
        body: "We design, build, and install everything, and you get a founder as your direct contact, design revisions until the booking page truly matches your brand, and a quarterly sit-down going over your bookings, no-shows, and repeat guests.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Built for the way you host.",
    subhead:
      "Table reservations, room bookings, treatments, appointments, tour departures. Guest Overflow adapts to how your business actually works.",
    explore: "Explore →",
  },
  noWebsite: {
    eyebrow: "Getting found",
    title: "How guests find you.",
    subhead:
      "Marketplaces sell you discovery, then tax every booking for it. We help you get found on your own terms, and you keep the booking and the guest. These sit alongside the booking page, never in front of it.",
    ctaLine: "Explore our services",
    paths: [
      {
        title: "Google Business Profile",
        body: "We optimize your Google profile and switch on Reserve with Google, so people searching nearby find you and book direct from Google and Maps, with no marketplace in between.",
        badge: "The starting point",
      },
      {
        title: "A website with booking built in",
        body: "When you want a home of your own on the web, we design and build a full website with your booking page built in from day one.",
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
  rateParity: {
    eyebrow: "Direct booking",
    title:
      "By law, you can already sell cheaper on your own site than on Booking.com.",
    body: "Portugal banned rate-parity clauses, so your own site can undercut the OTA. We give you that site, and the booking page that takes the reservation with no commission.",
  },
  homePricing: {
    eyebrow: "Pricing",
    title: "Flat pricing. Your regulars stay free.",
    subhead:
      "See what a marketplace would bill you as you grow, against one flat price that never moves. Keep every cover after that.",
    cta: "See pricing by sector",
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
    eyebrow: "Software de reservas que é seu",
    headline: "A sua própria página de reservas, à medida de como trabalha.",
    subhead:
      "Desenhamos uma página de reservas à volta dos seus serviços, horários e regras, com a sua marca e no seu domínio. Os clientes reservam diretamente, paga um valor fixo sem comissões, e cada relação com o cliente fica sua.",
  },
  problems: {
    title: "Porquê enviar os seus clientes para outro lado para reservar?",
    items: [
      {
        title: "As plataformas ficam com os seus clientes",
        body: "As plataformas de reservas colocam-se entre si e as pessoas que recebe. Ficam com os emails e o histórico de reservas, e acaba a pagar para chegar aos seus próprios clientes.",
      },
      {
        title: "Paga comissão até pelos seus habituais",
        body: "Os marketplaces cobram-lhe sempre que um cliente reserva, incluindo os habituais que já conquistou. Quanto mais trabalha, mais paga, e os seus clientes mais valiosos tornam-se o seu canal mais caro.",
      },
      {
        title: "A página de reservas não é sua",
        body: "Investiu a sério no seu site, mas no momento de reservar os clientes caem numa página genérica que não se parece nada consigo.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Demo ao vivo",
    title: "Esta é a sua página de reservas. Experimente.",
    subhead:
      "Uma página de reservas real, a funcionar aqui mesmo. Mude o tipo de espaço para ver o mesmo sistema adaptar-se a cada operação, e depois coloque-a no ar como página própria com a sua marca ou integrada no seu site.",
    caption: "Um único motor de reservas, à medida de cada operação. No ar como página, ou integrado no seu site.",
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
        title: "Os clientes são seus, e voltam",
        body: "Cada reserva, preferência e contacto é seu para guardar e exportar. Fica com a relação e traz os clientes de volta por si, sem voltar a pagar comissão para chegar a quem já conquistou.",
      },
      {
        icon: "concierge",
        title: "Instalação concierge, resultados pessoais",
        body: "Desenhamos, construímos e instalamos tudo, e tem um fundador como contacto direto, revisões de design até a página de reservas ficar mesmo com a sua marca, e uma reunião trimestral sobre reservas, faltas e clientes habituais.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Feito para a forma como recebe.",
    subhead:
      "Reservas de mesa, quartos, tratamentos, marcações, partidas de tours. O Guest Overflow adapta-se à forma como o seu negócio realmente funciona.",
    explore: "Explorar →",
  },
  noWebsite: {
    eyebrow: "Ser encontrado",
    title: "Como os clientes o encontram.",
    subhead:
      "Os marketplaces vendem-lhe descoberta e depois cobram comissão por cada reserva. Nós ajudamo-lo a ser encontrado nos seus próprios termos, e fica com a reserva e com o cliente. Isto acompanha a página de reservas, nunca fica à frente dela.",
    ctaLine: "Explorar os nossos serviços",
    paths: [
      {
        title: "Perfil de Empresa no Google",
        body: "Otimizamos o seu perfil no Google e ativamos o Reservar com o Google, para que quem procura por perto o encontre e reserve diretamente no Google e no Maps, sem marketplace pelo meio.",
        badge: "O ponto de partida",
      },
      {
        title: "Um site com reservas integradas",
        body: "Quando quiser uma casa própria na internet, desenhamos e construímos um site completo com a sua página de reservas integrada desde o primeiro dia.",
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
  rateParity: {
    eyebrow: "Reserva direta",
    title:
      "Por lei, já pode vender mais barato no seu site do que na Booking.com.",
    body: "Portugal proibiu as cláusulas de paridade, por isso o seu próprio site pode ficar abaixo da OTA. Nós damos-lhe esse site, e a página de reservas que recebe a reserva sem comissão.",
  },
  homePricing: {
    eyebrow: "Preços",
    title: "Preço fixo. Os seus habituais ficam de graça.",
    subhead:
      "Veja o que um marketplace lhe cobraria à medida que cresce, face a um preço fixo que não mexe. A partir daí, fica com todas as reservas.",
    cta: "Ver preços por setor",
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
