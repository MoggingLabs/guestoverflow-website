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
        "A flat monthly subscription, with no per-cover or per-booking commission, ever. Pricing depends on the plan and how much customization your venue needs; see the pricing page for tiers, or book a demo for an exact quote.",
    },
    {
      question: "How long does setup take?",
      answer:
        "Most venues go live within days of kickoff. Our team handles design, build, and installation on your existing website. You review and approve, and we ship it.",
    },
    {
      question: "Does it work with my existing website?",
      answer:
        "Yes. Guest Overflow installs on any modern website platform, including custom-built sites, WordPress, Squarespace, and Webflow. If you can edit your site, we can install Guest Overflow on it.",
    },
    {
      question: "Who owns the guest data?",
      answer:
        "You do, unambiguously. Every booking, email, and preference collected through your booking page belongs to your business and is exportable at any time. We never market to your guests or share their data.",
    },
    {
      question: "Can it match my brand exactly?",
      answer:
        "Yes, that's the heart of what we do. Colors, typography, copy, and flow are tailored to each venue. Try the live demo above and switch venue types to see how different the same system can look.",
    },
    {
      question: "Will Guest Overflow bring me new customers?",
      answer:
        "We're honest about this: we don't replace the discovery a marketplace gives you. If you need new strangers to find you, that's what Reserve with Google, your Google Business Profile, and a great website do, and we set all three up. What we replace is paying commission on the guests who already chose you, the regulars, the direct traffic, and word of mouth.",
    },
    {
      question: "I don't have a website. Can I still use Guest Overflow?",
      answer:
        "Yes. We start by optimizing your Google Business Profile so people can find and book you straight from Google. When you're ready for a website of your own, we design and build one with booking built in, but there's no pressure to start there.",
    },
    {
      question: "What if it doesn't work for us?",
      answer:
        "Then you walk away cleanly. Our founding offer is three months at half price, and if you don't see real return or usage through your website or Google profile in that time, you can end the relationship with no questions asked. We track the numbers together, so you'll never have to take our word for it.",
    },
    {
      question: "What happens after I book a demo?",
      answer:
        "A 20-minute call where we show Guest Overflow running on a site like yours and scope what your setup would involve. No commitment, and no setup-fee talk unless you want it.",
    },
  ],
  product: [
    {
      question: "Does Guest Overflow handle deposits and no-shows?",
      answer:
        "Yes. You can require card details or take deposits for specific services, party sizes, or dates, with automated reminders that cut no-shows dramatically.",
    },
    {
      question: "Can I manage availability myself?",
      answer:
        "Fully. Open and close slots, set per-service durations, block dates, and adjust capacity in a dashboard built for busy operators, and changes go live on your site instantly.",
    },
    {
      question: "Does it support multiple locations?",
      answer:
        "Yes. Groups can run several venues from one dashboard with separate availability, branding, and guest lists per location.",
    },
    {
      question: "Which channels and integrations do you support?",
      answer:
        "Reserve with Google (booking straight from your Google listing and Maps), Instagram and Facebook booking links, WhatsApp and email for confirmations and reminders, and Stripe for deposits paid into your own account. POS integration starts with Lightspeed, so deposits land on the final bill instead of a side spreadsheet. We wire all of this up for you during setup.",
    },
    {
      question: "Where does our data live, and under which law?",
      answer:
        "Guest data is stored on servers in the European Union, your contract is governed by Portuguese law, and the whole system is built GDPR-first. Two questions worth asking any booking vendor: where is my contract governed, and where exactly does my guest data live?",
    },
  ],
  pricing: [
    {
      question: "Is there really no per-booking fee?",
      answer:
        "Really. Your subscription stays flat regardless of how many bookings you take. We don't think you should pay more for being busy.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "Setup is included in Premium. For Essential, a one-time installation fee may apply depending on your website platform. We'll tell you exactly what it is before you commit.",
    },
    {
      question: "Is there a discount for paying annually?",
      answer:
        "Yes. Choose annual billing and you pay a third less than the monthly price, so Essential drops from €99 to €66 a month. Use the toggle above the plans to compare both.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Monthly plans cancel anytime. Your guest data remains exportable for 90 days after cancellation.",
    },
    {
      question: "What does the founding offer include?",
      answer:
        "Half price for your first three months, hands-on onboarding directly with the founding team, and a clean exit if it isn't working: if you see no return or usage through your website or Google profile in that time, you can end it, no questions asked.",
    },
    {
      question: "I only have a Google Business Profile. Where do I start?",
      answer:
        "Right there. We optimize your profile so people find and book you from Google. It's the affordable entry point. A full website with built-in booking is our higher-level offering, for when you're ready.",
    },
  ],
  demo: [
    {
      question: "How long is the demo?",
      answer:
        "About 20 minutes. We show the booking flow, the dashboard, and what your branded version would look like, and we'll answer anything you throw at us.",
    },
    {
      question: "Do I need anything prepared?",
      answer:
        "Just your website address. It helps to know roughly how you take bookings today (phone, email, another platform), but it's not required.",
    },
    {
      question: "Is this a sales call?",
      answer:
        "It's a working session. If Guest Overflow isn't right for your venue, we'll say so and point you somewhere better.",
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
        "Uma subscrição mensal fixa, sem comissão por reserva, nunca. O valor depende do plano e do nível de personalização que o seu espaço precisa; veja os planos na página de preços ou marque uma demonstração para um orçamento exato.",
    },
    {
      question: "Quanto tempo demora a instalação?",
      answer:
        "A maioria dos espaços fica online poucos dias depois do arranque. A nossa equipa trata do design, da construção e da instalação no seu site atual. Revê e aprova, e nós publicamos.",
    },
    {
      question: "Funciona com o meu site atual?",
      answer:
        "Sim. O Guest Overflow instala-se em qualquer plataforma moderna, incluindo sites à medida, WordPress, Squarespace e Webflow. Se consegue editar o seu site, conseguimos instalar lá o Guest Overflow.",
    },
    {
      question: "De quem são os dados dos clientes?",
      answer:
        "Seus, sem ambiguidade. Cada reserva, email e preferência recolhidos através da sua página de reservas pertencem ao seu negócio e podem ser exportados a qualquer momento. Nunca fazemos marketing aos seus clientes nem partilhamos os seus dados.",
    },
    {
      question: "Consegue ficar exatamente com a minha marca?",
      answer:
        "Sim, é esse o coração do que fazemos. Cores, tipografia, textos e fluxo são feitos à medida de cada espaço. Experimente a demo ao vivo acima e mude o tipo de espaço para ver como o mesmo sistema pode ficar diferente.",
    },
    {
      question: "O Guest Overflow traz-me novos clientes?",
      answer:
        "Somos honestos: não substituímos a descoberta que um marketplace dá. Se precisa que novos desconhecidos o encontrem, é para isso que servem o Reservar com o Google, o seu Perfil de Empresa no Google e um bom site, e configuramos os três. O que substituímos é pagar comissão sobre os clientes que já o escolheram: os habituais, o tráfego direto e o passa-a-palavra.",
    },
    {
      question: "Não tenho site. Ainda assim posso usar o Guest Overflow?",
      answer:
        "Sim. Começamos por otimizar o seu Perfil de Empresa no Google para que as pessoas o encontrem e reservem diretamente a partir do Google. Quando quiser um site próprio, desenhamos e construímos um com reservas integradas, mas sem qualquer pressão para começar por aí.",
    },
    {
      question: "E se não resultar para nós?",
      answer:
        "Sai de forma limpa. A nossa oferta de lançamento é de três meses a metade do preço, e se nesse período não vir retorno nem utilização reais através do seu site ou do seu perfil no Google, pode terminar a relação sem perguntas. Acompanhamos os números juntos, por isso nunca terá de acreditar só na nossa palavra.",
    },
    {
      question: "O que acontece depois de marcar a demonstração?",
      answer:
        "Uma chamada de 20 minutos em que mostramos o Guest Overflow a funcionar num site como o seu e definimos o que a sua instalação envolveria. Sem compromisso, e sem conversa de custos de instalação a menos que a queira ter.",
    },
  ],
  product: [
    {
      question: "O Guest Overflow trata de sinais e faltas (no-shows)?",
      answer:
        "Sim. Pode pedir dados de cartão ou cobrar sinais para serviços, tamanhos de grupo ou datas específicos, com lembretes automáticos que reduzem drasticamente as faltas.",
    },
    {
      question: "Posso gerir a disponibilidade sozinho?",
      answer:
        "Totalmente. Abra e feche horários, defina durações por serviço, bloqueie datas e ajuste a capacidade num painel feito para quem opera no terreno, e as alterações ficam ativas no seu site de imediato.",
    },
    {
      question: "Suporta vários espaços?",
      answer:
        "Sim. Grupos podem gerir vários espaços a partir de um único painel, com disponibilidade, marca e listas de clientes separadas por localização.",
    },
    {
      question: "Que canais e integrações suportam?",
      answer:
        "Reserve with Google (reservas diretamente a partir da sua ficha no Google e no Maps), links de reserva no Instagram e Facebook, WhatsApp e email para confirmações e lembretes, e Stripe para sinais pagos diretamente na sua conta. A integração com POS começa pelo Lightspeed, para que os sinais apareçam na conta final em vez de numa folha à parte. Configuramos tudo isto por si durante a instalação.",
    },
    {
      question: "Onde ficam os nossos dados, e sob que lei?",
      answer:
        "Os dados dos clientes ficam em servidores na União Europeia, o seu contrato é regido pela lei portuguesa, e todo o sistema foi construído com o RGPD como ponto de partida. Duas perguntas que vale a pena fazer a qualquer fornecedor de reservas: por que lei é regido o meu contrato, e onde vivem exatamente os dados dos meus clientes?",
    },
  ],
  pricing: [
    {
      question: "Não há mesmo taxa por reserva?",
      answer:
        "Mesmo. A sua subscrição mantém-se fixa independentemente do número de reservas. Não achamos que deva pagar mais por estar cheio.",
    },
    {
      question: "Há custo de instalação?",
      answer:
        "A instalação está incluída no Premium. No Essential, pode aplicar-se um custo único de instalação consoante a plataforma do seu site. Dizemos-lhe exatamente quanto antes de se comprometer.",
    },
    {
      question: "Há desconto por pagamento anual?",
      answer:
        "Sim. Com faturação anual paga menos um terço face ao preço mensal, por isso o Essential desce de 99 € para 66 € por mês. Use o seletor acima dos planos para comparar.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Os planos mensais cancelam-se a qualquer momento. Os dados dos seus clientes continuam exportáveis durante 90 dias após o cancelamento.",
    },
    {
      question: "O que inclui a oferta de lançamento?",
      answer:
        "Metade do preço nos primeiros três meses, onboarding feito diretamente com a equipa fundadora, e uma saída limpa se não estiver a resultar: se não vir retorno nem utilização através do seu site ou do seu perfil no Google nesse período, pode terminar sem perguntas.",
    },
    {
      question: "Só tenho um Perfil de Empresa no Google. Por onde começo?",
      answer:
        "Exatamente por aí. Otimizamos o seu perfil para que as pessoas o encontrem e reservem a partir do Google. É a porta de entrada acessível. Um site completo com reservas integradas é a nossa oferta de nível superior, para quando estiver pronto.",
    },
  ],
  demo: [
    {
      question: "Quanto tempo demora a demonstração?",
      answer:
        "Cerca de 20 minutos. Mostramos o fluxo de reservas, o painel e como ficaria a sua versão com a sua marca, e respondemos a tudo o que quiser perguntar.",
    },
    {
      question: "Preciso de preparar alguma coisa?",
      answer:
        "Só o endereço do seu site. Ajuda saber por alto como recebe reservas hoje (telefone, email, outra plataforma), mas não é obrigatório.",
    },
    {
      question: "Isto é uma chamada de vendas?",
      answer:
        "É uma sessão de trabalho. Se o Guest Overflow não fizer sentido para o seu espaço, dizemos-lhe isso e indicamos-lhe um caminho melhor.",
    },
  ],
  productTitle: "Perguntas sobre o produto",
  pricingTitle: "Perguntas sobre preços",
  demoTitle: "Antes de marcar",
};

export const faqContent: Record<Locale, FaqContent> = { en, pt };
