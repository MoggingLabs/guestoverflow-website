import type { Differentiator, HowItWorksStep } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

const en = {
  hero: {
    eyebrow: "Booking software you own",
    headline: "Your own booking page, built around how your salon runs.",
    subhead:
      "We design a booking page around your services, your chairs, your hours, and your rules, on your brand and your domain. Clients book direct, you pay one flat price with no commission, and every client relationship remains yours.",
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
        body: "You have invested considerable care in your salon and your website, yet the moment clients go to book, they arrive on a generic page that bears no resemblance to your studio.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Live demo",
    title: "This is your salon booking page. We invite you to try it.",
    subhead:
      "A genuine, working salon booking page is running here. Pick a service, choose a stylist, and book an appointment exactly as your clients would, then publish it live as your own branded booking page, on your brand and your domain.",
    caption: "One booking engine, tailored to your salon, live as your own branded page.",
  },
  howItWorks: {
    title: "Taking appointments within a matter of days.",
    subhead: "You provide the salon, and we manage everything else, from design to installation.",
    steps: [
      {
        title: "We integrate it into your site",
        body: "Our team builds the booking experience to match your brand, from typography to tone of voice, and publishes it as your own branded booking page. You are never required to handle code.",
      },
      {
        title: "Clients book in seconds",
        body: "Clients pick a service, choose a stylist or barber, and select a time without leaving your site. The entire process performs equally well on a mobile device and on a laptop.",
      },
      {
        title: "You own every appointment",
        body: "Appointments, client details, and preferences all arrive in your dashboard. They are yours to retain, export, and build upon, with no intermediary involved.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Why salons and barbershops choose Guest Overflow.",
    ctaLine: "Book a demo and see it on your website",
    items: [
      {
        icon: "brand",
        title: "Genuinely yours",
        body: "Guest Overflow operates on your domain and carries your brand. Clients book without leaving your site, and they never see our name.",
      },
      {
        icon: "commission",
        title: "No per-appointment commission",
        body: "You pay a flat monthly price that remains the same regardless of how busy your chairs become. A fully booked Saturday costs you exactly what a quiet Tuesday does.",
      },
      {
        icon: "data",
        title: "Own your clients and bring them back",
        body: "Every appointment, preference, and contact is yours to retain and export. You keep the relationship and rebook clients yourself, without paying commission again to reach the clients you have already won.",
      },
      {
        icon: "concierge",
        title: "Concierge setup, individual results",
        body: "We design, build, and install everything. You receive a founder as your direct contact, design revisions until the booking page genuinely matches your brand, and a quarterly review covering your bookings, no-shows, and repeat clients.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Configured for the way your business operates.",
    subhead:
      "Table reservations, room bookings, treatments, appointments, tour departures. Guest Overflow adapts to the way your business genuinely operates.",
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
        body: "We optimize your Google profile and activate Reserve with Google, so people searching nearby find your salon and book directly from Google and Maps, with no marketplace involved.",
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
    title: "Our promise: complete transparency.",
    body: "Begin with three months at half price. If you do not observe genuine return or genuine usage through your website or your Google Business Profile during that period, you may conclude the engagement cleanly, without explanation and without obligation. We would prefer to conclude an engagement amicably than to retain a client who is not achieving results.",
  },
  builtFor: {
    line: "Built for independent salons, hair salons, barbershops, and beauty studios.",
    credibility:
      "We have spent years building high-converting websites for guest-facing businesses. Guest Overflow is everything our clients consistently requested.",
  },
  rateParity: {
    eyebrow: "Direct booking",
    title:
      "By law, you may already sell at a lower price on your own site than on Booking.com.",
    body: "Portugal prohibited rate-parity clauses, so your own site may price below the OTA. We provide that site, and the booking page that takes the reservation with no commission.",
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
    headline: "Ready to take bookings on your own website?",
    subhead:
      "See Guest Overflow running on a site like yours. The demonstration takes 20 minutes, and there is no commitment.",
  },
};

const pt: typeof en = {
  hero: {
    eyebrow: "Software de reservas que é seu",
    headline: "A sua própria página de reservas, à medida de como o seu salão funciona.",
    subhead:
      "Desenhamos uma página de reservas à volta dos seus serviços, das suas cadeiras, dos seus horários e das suas regras, com a sua marca e no seu domínio. Os clientes marcam diretamente, paga um valor fixo sem comissões, e cada relação com o cliente permanece sua.",
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
        body: "Investiu seriamente no seu salão e no seu site, mas no momento de marcar os clientes deparam-se com uma página genérica que em nada se assemelha ao seu estúdio.",
      },
    ],
  },
  widgetShowcase: {
    eyebrow: "Demo ao vivo",
    title: "Esta é a página de reservas do seu salão. Convidamo-lo a experimentá-la.",
    subhead:
      "Uma página de reservas de salão, real e a funcionar aqui mesmo. Escolha um serviço, escolha um profissional e marque uma marcação tal como os seus clientes fariam, e depois publique-a no ar como a sua própria página de reservas, com a sua marca e no seu domínio.",
    caption: "Um único motor de reservas, à medida do seu salão, no ar como a sua própria página com a sua marca.",
  },
  howItWorks: {
    title: "A receber marcações no prazo de poucos dias.",
    subhead: "O cliente fornece o salão, e nós tratamos de tudo o resto, do design à instalação.",
    steps: [
      {
        title: "Integramos tudo dentro do seu site",
        body: "A nossa equipa constrói a experiência de marcação à medida da sua marca, da tipografia ao tom de voz, e publica-a como a sua própria página de reservas com a sua marca. Nunca necessita de mexer em código.",
      },
      {
        title: "Os clientes marcam em segundos",
        body: "Escolhem o serviço, o profissional e a hora sem sair do seu site. Todo o processo funciona tão bem no telemóvel como no computador.",
      },
      {
        title: "Cada marcação é sua",
        body: "Marcações, contactos e preferências chegam ao seu painel. São seus para guardar, exportar e desenvolver, sem intermediários.",
      },
    ] as HowItWorksStep[],
  },
  differentiators: {
    title: "Porque é que os cabeleireiros e as barbearias escolhem o Guest Overflow.",
    ctaLine: "Marque uma demonstração e veja-o no seu site",
    items: [
      {
        icon: "brand",
        title: "Genuinamente seu",
        body: "O Guest Overflow opera no seu domínio e apresenta a sua marca. Os clientes marcam sem sair do seu site, e nunca veem o nosso nome.",
      },
      {
        icon: "commission",
        title: "Sem comissão por marcação",
        body: "Paga um valor mensal fixo que não se altera por ter as cadeiras mais cheias. Um sábado esgotado custa exatamente o mesmo que uma terça-feira calma.",
      },
      {
        icon: "data",
        title: "Os clientes são seus, e regressam",
        body: "Cada marcação, preferência e contacto é seu para guardar e exportar. Mantém a relação e remarca os clientes por si, sem voltar a pagar comissão para chegar a quem já conquistou.",
      },
      {
        icon: "concierge",
        title: "Instalação concierge, resultados individuais",
        body: "Desenhamos, construímos e instalamos tudo. Dispõe de um fundador como contacto direto, revisões de design até a página de reservas ficar verdadeiramente com a sua marca, e uma reunião trimestral sobre marcações, faltas e clientes habituais.",
      },
    ] as Differentiator[],
  },
  industriesPreview: {
    title: "Configurado para a forma como o seu negócio funciona.",
    subhead:
      "Reservas de mesa, quartos, tratamentos, marcações, partidas de tours. O Guest Overflow adapta-se à forma como o seu negócio efetivamente funciona.",
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
        body: "Otimizamos o seu perfil no Google e ativamos o Reservar com o Google, para que quem procura por perto encontre o seu salão e marque diretamente no Google e no Maps, sem marketplace pelo meio.",
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
    title: "A nossa promessa: transparência total.",
    body: "Comece com três meses a metade do preço. Se nesse período não verificar retorno nem utilização reais através do seu site ou do seu Perfil de Empresa no Google, pode terminar a colaboração de forma limpa, sem necessidade de justificação e sem qualquer obrigação. Preferimos concluir a colaboração de forma cordial a manter um cliente que não está a obter resultados.",
  },
  builtFor: {
    line: "Feito para cabeleireiros independentes, salões de cabeleireiro, barbearias e estúdios de beleza.",
    credibility:
      "Passámos anos a construir sites de alta conversão para negócios que vivem de reservas. O Guest Overflow é tudo o que os nossos clientes nos solicitavam.",
  },
  rateParity: {
    eyebrow: "Reserva direta",
    title:
      "Por lei, já pode vender a um preço inferior no seu site do que na Booking.com.",
    body: "Portugal proibiu as cláusulas de paridade, por isso o seu próprio site pode praticar preços abaixo da OTA. Nós disponibilizamos-lhe esse site, e a página de reservas que recebe a reserva sem comissão.",
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
    headline: "Pronto para receber reservas no seu próprio site?",
    subhead:
      "Veja o Guest Overflow a funcionar num site como o seu. A demonstração demora 20 minutos e não implica qualquer compromisso.",
  },
};

export const homeContent: Record<Locale, typeof en> = { en, pt };
