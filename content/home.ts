import type { Differentiator, HowItWorksStep } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

const en = {
  hero: {
    eyebrow: "Booking software you own",
    headline: "Your own booking system, built around how your business runs.",
    subhead:
      "We design and build a complete booking system around your services, your team, your hours, and your rules, branded as your business. Clients book direct, you pay one flat price with no commission, and every client relationship remains yours.",
  },
  problems: {
    title: "There is no reason to send your clients elsewhere to book a cut or a colour.",
    items: [
      {
        title: "Booking apps own your clients",
        body: "Apps like Fresha and Booksy position themselves between you and your clients. They retain the client emails and the booking history, and you are left paying to reach the regulars you already cut every month.",
      },
      {
        title: "You pay commission on your own regulars",
        body: "Marketplaces charge you every time a client books, including the regulars who already sit in your chair. The busier your stylists are, the more you pay, and your most loyal clients become your most expensive channel.",
      },
      {
        title: "The booking page is not yours",
        body: "You have invested considerable care in your salon and your brand, yet the moment clients go to book, they arrive on a generic page that bears no resemblance to your studio.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Live demo",
    title: "This is your salon booking page. We invite you to try it.",
    subhead:
      "A genuine, working salon booking page is running here. Pick a service, choose a stylist, and book an appointment exactly as your clients would, then publish it live as your own branded booking page.",
    caption: "One booking engine, tailored to your salon, live as your own branded page.",
  },
  howItWorks: {
    title: "Taking bookings within a matter of days.",
    subhead: "You run the business, and we manage everything else, from design to launch.",
    steps: [
      {
        title: "We build your booking system",
        body: "Our team designs and builds your booking system to match your brand, from typography to tone of voice, and launches it on a branded guestoverflow.com address. You are never required to handle code.",
      },
      {
        title: "Clients book in seconds",
        body: "Clients pick a service, choose a time, and confirm in a few taps. The entire process performs equally well on a mobile device and on a laptop.",
      },
      {
        title: "You own every booking",
        body: "Bookings, client details, and preferences all arrive in your dashboard. They are yours to retain, export, and build upon, with no intermediary involved.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Why guest-facing businesses choose Guest Overflow.",
    ctaLine: "Book a demo and see your booking system",
    items: [
      {
        icon: "brand",
        title: "Genuinely yours",
        body: "Guest Overflow carries your brand: your logo, colours, and tone. Clients book with you directly. On Premium, it moves to your own custom domain, with no trace of us.",
      },
      {
        icon: "commission",
        title: "No per-booking commission",
        body: "You pay a flat monthly price that remains the same regardless of how busy you become. A fully booked Saturday costs you exactly what a quiet Tuesday does.",
      },
      {
        icon: "data",
        title: "Own your clients and bring them back",
        body: "Every booking, preference, and contact is yours to retain and export. You keep the relationship and rebook clients yourself, without paying commission again to reach the clients you have already won.",
      },
      {
        icon: "concierge",
        title: "Concierge setup, individual results",
        body: "We design, build, and launch everything. You receive a founder as your direct contact, design revisions until the booking system genuinely matches your brand, and a quarterly review covering your bookings, no-shows, and repeat clients.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Configured for the way your business operates.",
    subhead:
      "Services, staff, schedules, and rules. Guest Overflow adapts to the way your business genuinely operates.",
    explore: "Explore →",
  },
  noWebsite: {
    eyebrow: "Getting found",
    title: "How clients find you.",
    subhead:
      "Marketplaces sell you discovery, then charge a fee on every appointment in return. We help you get found on your own terms, and you keep the booking and the client. These operate alongside the booking page, never ahead of it.",
    ctaLine: "Explore our services",
    paths: [
      {
        title: "Google Business Profile",
        body: "We optimize your Google profile and activate Reserve with Google, so people searching nearby find your business and book directly from Google and Maps, with no marketplace involved.",
        badge: "The starting point",
      },
      {
        title: "A website with booking built in",
        body: "When you require a home of your own on the web, we design and build a complete website with your booking page built in from day one.",
        badge: "The full picture",
      },
    ],
  },
  promiseStrip: {
    eyebrow: "How we work",
    title: "Our promise: a close relationship and real support.",
    body: "We work as a true partner to your salon, not a faceless platform. You have a direct line to us whenever you need it, and we stay close to make sure your booking system keeps working for you. We want the best for our clients, and we measure our success by yours.",
  },
  builtFor: {
    line: "Built for independent, guest-facing businesses that live by their bookings.",
    credibility:
      "We have spent years building high-converting websites for guest-facing businesses. Guest Overflow is everything our clients consistently requested.",
  },
  rateParity: {
    eyebrow: "Direct booking",
    title:
      "Every booking on your own page is yours, with no marketplace cut.",
    body: "Marketplaces like Fresha and Booksy take a slice of new-client bookings and a share of every payment. Your own booking page takes the reservation directly, with no commission and no payment take-rate, so the full price stays with you.",
  },
  homePricing: {
    eyebrow: "Pricing",
    title: "Flat pricing. Your regular clients carry no additional cost.",
    subhead:
      "Compare what a marketplace would charge you as you grow against one flat price that never changes. You retain every appointment thereafter.",
    cta: "See pricing by sector",
  },
  faqTitle: "Questions, answered.",
  problemsEyebrow: "The problem",
  liveDemoEyebrow: "Live demo",
  howItWorksEyebrow: "How it works",
  whyEyebrow: "Why Guest Overflow",
  industriesEyebrow: "Industries",
  footerCta: {
    headline: "Ready to set up your full booking system?",
    subhead:
      "See Guest Overflow set up for a business like yours. The demonstration takes 20 minutes, with no pressure.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Software de reservas que é seu",
    headline: "O seu próprio sistema de reservas, à medida de como o seu negócio funciona.",
    subhead:
      "Desenhamos e construímos um sistema de reservas completo à volta dos seus serviços, da sua equipa, dos seus horários e das suas regras, com a sua marca. Os clientes marcam diretamente, paga um valor fixo sem comissões, e cada relação com o cliente permanece sua.",
  },
  problems: {
    title: "Não há motivo para encaminhar os seus clientes para outro lugar para marcarem um corte ou uma cor.",
    items: [
      {
        title: "As aplicações de marcações ficam com os seus clientes",
        body: "Aplicações como a Fresha e a Booksy posicionam-se entre si e os seus clientes. Retêm os emails e o histórico de marcações, e acaba por pagar para chegar aos clientes habituais que já corta todos os meses.",
      },
      {
        title: "Paga comissão inclusive pelos seus clientes habituais",
        body: "Os marketplaces cobram-lhe sempre que um cliente marca, incluindo os habituais que já se sentam na sua cadeira. Quanto mais ocupados estão os seus profissionais, mais paga, e os seus clientes mais fiéis tornam-se o seu canal mais dispendioso.",
      },
      {
        title: "A página de reservas não é sua",
        body: "Investiu seriamente no seu salão e na sua marca, mas no momento de marcar os clientes deparam-se com uma página genérica que em nada se assemelha ao seu estúdio.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Demo ao vivo",
    title: "Esta é a página de reservas do seu salão. Convidamo-lo a experimentá-la.",
    subhead:
      "Uma página de reservas de salão, real e a funcionar aqui mesmo. Escolha um serviço, escolha um profissional e marque uma marcação tal como os seus clientes fariam, e depois publique-a no ar como a sua própria página de reservas, com a sua marca.",
    caption: "Um único motor de reservas, à medida do seu salão, no ar como a sua própria página com a sua marca.",
  },
  howItWorks: {
    title: "A receber reservas no prazo de poucos dias.",
    subhead: "O cliente gere o negócio, e nós tratamos de tudo o resto, do design ao lançamento.",
    steps: [
      {
        title: "Construímos o seu sistema de reservas",
        body: "A nossa equipa desenha e constrói o seu sistema de reservas à medida da sua marca, da tipografia ao tom de voz, e lança-o num endereço guestoverflow.com com a sua marca. Nunca necessita de mexer em código.",
      },
      {
        title: "Os clientes marcam em segundos",
        body: "Escolhem o serviço e a hora em poucos toques. Todo o processo funciona tão bem no telemóvel como no computador.",
      },
      {
        title: "Cada reserva é sua",
        body: "Reservas, contactos e preferências chegam ao seu painel. São seus para guardar, exportar e desenvolver, sem intermediários.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Porque é que os negócios que vivem de reservas escolhem o Guest Overflow.",
    ctaLine: "Marque uma demonstração e veja o seu sistema de reservas",
    items: [
      {
        icon: "brand",
        title: "Genuinamente seu",
        body: "O Guest Overflow apresenta a sua marca: o seu logótipo, cores e tom. Os clientes marcam consigo diretamente. No Premium, passa para o seu próprio domínio, sem rasto da nossa parte.",
      },
      {
        icon: "commission",
        title: "Sem comissão por reserva",
        body: "Paga um valor mensal fixo que não se altera por ter mais movimento. Um sábado esgotado custa exatamente o mesmo que uma terça-feira calma.",
      },
      {
        icon: "data",
        title: "Os clientes são seus, e regressam",
        body: "Cada reserva, preferência e contacto é seu para guardar e exportar. Mantém a relação e remarca os clientes por si, sem voltar a pagar comissão para chegar a quem já conquistou.",
      },
      {
        icon: "concierge",
        title: "Instalação concierge, resultados individuais",
        body: "Desenhamos, construímos e lançamos tudo. Dispõe de um fundador como contacto direto, revisões de design até o sistema de reservas ficar verdadeiramente com a sua marca, e uma reunião trimestral sobre reservas, faltas e clientes habituais.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Configurado para a forma como o seu negócio funciona.",
    subhead:
      "Serviços, equipa, horários e regras. O Guest Overflow adapta-se à forma como o seu negócio efetivamente funciona.",
    explore: "Explorar →",
  },
  noWebsite: {
    eyebrow: "Ser encontrado",
    title: "Como os clientes o encontram.",
    subhead:
      "Os marketplaces vendem-lhe descoberta e depois cobram comissão por cada marcação. Nós ajudamo-lo a ser encontrado nos seus próprios termos, e fica com a marcação e com o cliente. Isto acompanha a página de reservas, nunca se sobrepõe a ela.",
    ctaLine: "Explorar os nossos serviços",
    paths: [
      {
        title: "Perfil de Empresa no Google",
        body: "Otimizamos o seu perfil no Google e ativamos o Reservar com o Google, para que quem procura por perto encontre o seu negócio e marque diretamente no Google e no Maps, sem marketplace pelo meio.",
        badge: "O ponto de partida",
      },
      {
        title: "Um site com reservas integradas",
        body: "Quando pretender uma casa própria na internet, desenhamos e construímos um site completo com a sua página de reservas integrada desde o primeiro dia.",
        badge: "O quadro completo",
      },
    ],
  },
  promiseStrip: {
    eyebrow: "Como trabalhamos",
    title: "A nossa promessa: uma relação próxima e apoio verdadeiro.",
    body: "Trabalhamos como um verdadeiro parceiro do seu salão, não como uma plataforma sem rosto. Tem uma linha direta connosco sempre que precisar, e mantemo-nos próximos para garantir que o seu sistema de reservas continua a trabalhar para si. Queremos o melhor para os nossos clientes, e medimos o nosso sucesso pelo seu.",
  },
  builtFor: {
    line: "Feito para negócios independentes que vivem de reservas.",
    credibility:
      "Passámos anos a construir sites de alta conversão para negócios que vivem de reservas. O Guest Overflow é tudo o que os nossos clientes nos solicitavam.",
  },
  rateParity: {
    eyebrow: "Reserva direta",
    title:
      "Cada marcação na sua própria página é sua, sem corte de marketplace.",
    body: "Marketplaces como a Fresha e a Booksy levam uma fatia das marcações de novos clientes e uma parte de cada pagamento. A sua própria página de reservas recebe a marcação diretamente, sem comissão e sem margem nos pagamentos, para que o valor integral fique consigo.",
  },
  homePricing: {
    eyebrow: "Preços",
    title: "Preço fixo. Os seus clientes habituais não acarretam custo adicional.",
    subhead:
      "Compare o que um marketplace lhe cobraria à medida que cresce com um preço fixo que não se altera. A partir daí, fica com todas as marcações.",
    cta: "Ver preços por setor",
  },
  faqTitle: "Perguntas, respondidas.",
  problemsEyebrow: "O problema",
  liveDemoEyebrow: "Demo ao vivo",
  howItWorksEyebrow: "Como funciona",
  whyEyebrow: "Porquê o Guest Overflow",
  industriesEyebrow: "Setores",
  footerCta: {
    headline: "Pronto para montar o seu sistema de reservas completo?",
    subhead:
      "Veja o Guest Overflow configurado para um negócio como o seu. A demonstração demora 20 minutos, sem qualquer pressão.",
  },
};

export const homeContent: Record<Locale, typeof en> = { en, pt };
