import type { FaqItem } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

type FaqContent = {
  home: FaqItem[];
  product: FaqItem[];
  pricing: FaqItem[];
  demo: FaqItem[];
  productTitle: string;
  pricingTitle: string;
  demoTitle: string;
};

const en: FaqContent = {
  home: [
    {
      question: "How is Guest Overflow priced?",
      answer:
        "A flat monthly subscription, with no per-appointment or per-booking commission, ever. Pricing depends on the plan and the level of customization your business requires; see the pricing page for tiers, or book a demo for an exact quote.",
    },
    {
      question: "How long does setup take?",
      answer:
        "Most businesses go live within days of kickoff. Our team designs and builds your booking system, branded with your name, logo, and colours on your own guestoverflow.com address (your own custom domain on Premium). You review and approve before it goes live.",
    },
    {
      question: "Do I need an existing website?",
      answer:
        "No. We build your custom booking system, branded as yours, at your own guestoverflow.com address, and it is the destination clients reach. If you already have a site or social profiles, on any platform, including custom-built sites, WordPress, Squarespace, and Webflow, you simply point them to it, so clients move straight to your branded booking page. On Premium, it runs on your own custom domain.",
    },
    {
      question: "Who owns the client data?",
      answer:
        "You do, unambiguously. Every appointment, email, and preference collected through your booking page belongs to your business and is exportable at any time. We never market to your clients or share their data.",
    },
    {
      question: "Can it match my brand exactly?",
      answer:
        "Yes; that is the core of what we do. Colours, typography, copy, and flow are tailored to each business, so your booking page looks like your brand, not a generic app. We show you exactly how it will look in your demo.",
    },
    {
      question: "Will Guest Overflow bring me new customers?",
      answer:
        "Yes. We help the right clients find you and book you directly. Reserve with Google, your Google Business Profile, and a booking system built around your brand all bring people to you on your own terms, commission-free, and we set them up for you. And the clients you already have, the regulars, the direct traffic, and word of mouth, stop costing you a commission every time they come back.",
    },
    {
      question: "I do not have a website. Can I still use Guest Overflow?",
      answer:
        "Yes. We begin by optimizing your Google Business Profile so that people can find and book you directly from Google. When you are ready for a website of your own, we design and build one with booking built in, though there is no obligation to start there.",
    },
    {
      question: "What if it does not work for us?",
      answer:
        "We work closely with you and measure the results together: every month you see exactly what came through your website and your Google profile. If something is not working, we would rather fix it with you than let it slide, so you never have to rely on our word alone.",
    },
    {
      question: "What happens after I book a demo?",
      answer:
        "A 20-minute call in which we show Guest Overflow running on a site like yours and scope what your setup would involve. No pressure, and no discussion of setup fees unless you wish to have it.",
    },
  ],
  product: [
    {
      question: "Does Guest Overflow handle deposits and no-shows?",
      answer:
        "Yes. You can require card details or take deposits for specific services, staff, or dates, with automated reminders that reduce no-shows considerably.",
    },
    {
      question: "Can I manage availability myself?",
      answer:
        "Fully. Open and close slots, set per-service durations, block dates, and adjust team availability in a dashboard built for busy businesses, and changes go live instantly.",
    },
    {
      question: "Does it support multiple locations?",
      answer:
        "Yes. Groups can run several locations from one dashboard with separate availability, branding, and client lists per location.",
    },
    {
      question: "Which channels and integrations do you support?",
      answer:
        "Reserve with Google (booking directly from your Google listing and Maps), Instagram and Facebook booking links, WhatsApp and email for confirmations and reminders, and deposits paid into your own account. POS integration begins with Lightspeed, so deposits are applied to the final bill rather than a separate spreadsheet. We configure all of this for you during setup.",
    },
    {
      question: "Where does our data live, and under which law?",
      answer:
        "Client data is stored on servers in the European Union, your contract is governed by Portuguese law, and the entire system is built GDPR-first. Two questions worth asking any booking vendor: under which jurisdiction is my contract governed, and where exactly does my client data reside?",
    },
  ],
  pricing: [
    {
      question: "Is there really no per-booking fee?",
      answer:
        "Correct. Your subscription remains flat regardless of how many bookings you take. We do not believe you should pay more for being busy.",
    },
    {
      question: "Is the booking page on my own domain?",
      answer:
        "By default your booking page lives at a branded guestoverflow.com address (for example, yourbusiness.guestoverflow.com), with your logo, colours, and name throughout. On Premium, it moves to your own custom domain as a true white-label, where clients never see our name.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "Yes. Every plan includes a one-time setup fee, because our team builds and configures everything for you before launch: €299 on Starter, €499 on Essential, and €999 on Premium (Custom is quoted). The fee is published up front, so you know it before you commit.",
    },
    {
      question: "Is there a discount for paying annually?",
      answer:
        "Yes. Choose annual billing and you pay 15% less than the monthly price, so Essential decreases from €59 to €50 a month. Use the toggle above the plans to compare both.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your client data remains exportable for 90 days after cancellation, in a clean file you own.",
    },
    {
      question: "I only have a Google Business Profile. Where do I start?",
      answer:
        "There precisely. We optimize your profile so that people find and book you from Google. It is the affordable entry point. A full website with built-in booking is our higher-level offering, for when you are ready.",
    },
  ],
  demo: [
    {
      question: "How long is the demo?",
      answer:
        "Approximately 20 minutes. We show the booking flow, the dashboard, and what your branded version would look like, and we will answer any question you may have.",
    },
    {
      question: "Do I need anything prepared?",
      answer:
        "Only your website address. It is helpful to know approximately how you take bookings today (phone, email, another platform), but it is not required.",
    },
    {
      question: "Is this a sales call?",
      answer:
        "It is a working session. If Guest Overflow is not the right fit for your business, we will say so and direct you to a more suitable option.",
    },
  ],
  productTitle: "Product questions",
  pricingTitle: "Pricing questions",
  demoTitle: "Before you book",
};

const pt: FaqContent = {
  home: [
    {
      question: "Como funciona o preço do Guest Overflow?",
      answer:
        "Uma subscrição mensal fixa, sem comissão por marcação, nunca. O valor depende do plano e do nível de personalização de que o seu negócio necessita; veja os planos na página de preços ou marque uma demonstração para um orçamento exato.",
    },
    {
      question: "Quanto tempo demora a instalação?",
      answer:
        "A maioria dos negócios fica online poucos dias após o arranque. A nossa equipa desenha e constrói o seu sistema de reservas, com o seu nome, logótipo e cores, num endereço guestoverflow.com próprio (no seu próprio domínio no Premium). O cliente revê e aprova antes de ficar no ar.",
    },
    {
      question: "Preciso de ter um site?",
      answer:
        "Não. Construímos o seu sistema de reservas à medida, com a sua marca, num endereço guestoverflow.com, e é esse o destino a que os clientes chegam. Se já tiver um site ou perfis nas redes sociais, seja qual for a plataforma, incluindo sites à medida, WordPress, Squarespace e Webflow, basta apontá-los para ele, para que os clientes sigam diretamente para a sua página de reservas com a sua marca. No Premium, a página corre no seu próprio domínio.",
    },
    {
      question: "De quem são os dados dos clientes?",
      answer:
        "Seus, sem ambiguidade. Cada marcação, email e preferência recolhidos através da sua página de reservas pertencem ao seu negócio e podem ser exportados a qualquer momento. Nunca fazemos marketing aos seus clientes nem partilhamos os seus dados.",
    },
    {
      question: "Consegue ficar exatamente com a minha marca?",
      answer:
        "Sim; é esse o centro do que fazemos. Cores, tipografia, textos e fluxo são feitos à medida de cada negócio, para que a sua página de reservas se pareça com a sua marca e não com uma app genérica. Mostramos-lhe exatamente como ficará na sua demonstração.",
    },
    {
      question: "O Guest Overflow traz-me novos clientes?",
      answer:
        "Sim. Ajudamos os clientes certos a encontrá-lo e a marcar consigo diretamente. O Reservar com o Google, o seu Perfil de Empresa no Google e um sistema de reservas construído à volta da sua marca trazem pessoas até si, nos seus próprios termos e sem comissão, e tratamos de configurar tudo. E os clientes que já tem, os habituais, o tráfego direto e o passa-a-palavra, deixam de lhe custar uma comissão sempre que regressam.",
    },
    {
      question: "Não tenho site. Ainda assim posso usar o Guest Overflow?",
      answer:
        "Sim. Começamos por otimizar o seu Perfil de Empresa no Google para que as pessoas o encontrem e reservem diretamente a partir do Google. Quando pretender um site próprio, desenhamos e construímos um com reservas integradas, embora sem qualquer obrigação de começar por aí.",
    },
    {
      question: "E se não resultar para nós?",
      answer:
        "Trabalhamos de perto consigo e medimos os resultados em conjunto: todos os meses vê exatamente o que chegou através do seu site e do seu perfil no Google. Se algo não estiver a funcionar, preferimos resolvê-lo consigo a deixá-lo andar, por isso nunca terá de confiar apenas na nossa palavra.",
    },
    {
      question: "O que acontece depois de marcar a demonstração?",
      answer:
        "Uma chamada de 20 minutos em que mostramos o Guest Overflow a funcionar num site como o seu e definimos o que a sua instalação envolveria. Sem pressão, e sem discussão de custos de instalação a menos que a pretenda ter.",
    },
  ],
  product: [
    {
      question: "O Guest Overflow trata de sinais e faltas (no-shows)?",
      answer:
        "Sim. Pode pedir dados de cartão ou cobrar sinais para serviços, equipa ou datas específicos, com lembretes automáticos que reduzem consideravelmente as faltas.",
    },
    {
      question: "Posso gerir a disponibilidade sozinho?",
      answer:
        "Totalmente. Abra e feche horários, defina durações por serviço, bloqueie datas e ajuste a disponibilidade num painel concebido para negócios com muito movimento, e as alterações ficam ativas de imediato.",
    },
    {
      question: "Suporta vários espaços?",
      answer:
        "Sim. Grupos podem gerir vários espaços a partir de um único painel, com disponibilidade, marca e listas de clientes separadas por localização.",
    },
    {
      question: "Que canais e integrações suportam?",
      answer:
        "Reserve with Google (reservas diretamente a partir da sua ficha no Google e no Maps), links de reserva no Instagram e Facebook, WhatsApp e email para confirmações e lembretes, e sinais pagos diretamente na sua conta. A integração com POS inicia-se pelo Lightspeed, para que os sinais sejam aplicados na conta final em vez de numa folha à parte. Configuramos tudo isto por si durante a instalação.",
    },
    {
      question: "Onde ficam os nossos dados, e sob que lei?",
      answer:
        "Os dados dos clientes ficam em servidores na União Europeia, o seu contrato é regido pela lei portuguesa, e todo o sistema foi construído com o RGPD como ponto de partida. Duas perguntas que vale a pena colocar a qualquer fornecedor de reservas: por que lei é regido o meu contrato, e onde residem exatamente os dados dos meus clientes?",
    },
  ],
  pricing: [
    {
      question: "Não há mesmo taxa por reserva?",
      answer:
        "Não, de facto. A sua subscrição mantém-se fixa independentemente do número de reservas. Não consideramos que deva pagar mais por ter muito movimento.",
    },
    {
      question: "A página de marcações fica no meu próprio domínio?",
      answer:
        "Por defeito, a sua página de marcações fica num endereço guestoverflow.com com a sua marca (por exemplo, oseunegocio.guestoverflow.com), com o seu logótipo, cores e nome em todo o lado. No Premium, passa para o seu próprio domínio como white-label completo, onde os clientes nunca veem o nosso nome.",
    },
    {
      question: "Há custo de instalação?",
      answer:
        "Sim. Todos os planos incluem um custo único de instalação, porque a nossa equipa constrói e configura tudo por si antes do lançamento: 299 € no Starter, 499 € no Essential e 999 € no Premium (o À medida é orçamentado). O valor é publicado à partida, para que o conheça antes de se comprometer.",
    },
    {
      question: "Há desconto por pagamento anual?",
      answer:
        "Sim. Com faturação anual paga menos 15% face ao preço mensal, pelo que o Essential desce de 59 € para 50 € por mês. Utilize o seletor acima dos planos para comparar.",
    },
    {
      question: "O que acontece aos meus dados se cancelar?",
      answer:
        "Os dados dos seus clientes continuam exportáveis durante 90 dias após o cancelamento, num ficheiro limpo que é seu.",
    },
    {
      question: "Só tenho um Perfil de Empresa no Google. Por onde começo?",
      answer:
        "Precisamente por aí. Otimizamos o seu perfil para que as pessoas o encontrem e reservem a partir do Google. É a porta de entrada acessível. Um site completo com reservas integradas é a nossa oferta de nível superior, para quando estiver pronto.",
    },
  ],
  demo: [
    {
      question: "Quanto tempo demora a demonstração?",
      answer:
        "Cerca de 20 minutos. Mostramos o fluxo de reservas, o painel e como ficaria a sua versão com a sua marca, e respondemos a qualquer questão que pretenda colocar.",
    },
    {
      question: "Preciso de preparar alguma coisa?",
      answer:
        "Apenas o endereço do seu site. É útil saber, de forma aproximada, como recebe reservas atualmente (telefone, email, outra plataforma), mas não é obrigatório.",
    },
    {
      question: "Isto é uma chamada de vendas?",
      answer:
        "É uma sessão de trabalho. Se o Guest Overflow não for adequado para o seu negócio, dizemos-lho e indicamos-lhe uma opção mais apropriada.",
    },
  ],
  productTitle: "Perguntas sobre o produto",
  pricingTitle: "Perguntas sobre preços",
  demoTitle: "Antes de marcar",
};

export const faqContent: Record<Locale, FaqContent> = { en, pt };
