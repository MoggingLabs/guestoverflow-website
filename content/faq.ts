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
        "A flat monthly subscription, with no per-cover or per-booking commission, ever. Pricing depends on the plan and the level of customization your venue requires; see the pricing page for tiers, or book a demo for an exact quote.",
    },
    {
      question: "How long does setup take?",
      answer:
        "Most venues go live within days of kickoff. Our team designs, builds, and publishes your branded booking page, then adds a booking link to your existing site. You review and approve before it goes live.",
    },
    {
      question: "Does it work with my existing website?",
      answer:
        "Yes. Your booking page lives on your own domain, and your website stays exactly as it is. We add a clear booking button or link to your existing site, whatever platform it runs on, including custom-built sites, WordPress, Squarespace, and Webflow, so guests move straight to your branded booking page.",
    },
    {
      question: "Who owns the guest data?",
      answer:
        "You do, unambiguously. Every booking, email, and preference collected through your booking page belongs to your business and is exportable at any time. We never market to your guests or share their data.",
    },
    {
      question: "Can it match my brand exactly?",
      answer:
        "Yes; that is the core of what we do. Colors, typography, copy, and flow are tailored to each venue. Try the live demo above and switch venue types to see how different the same system can appear.",
    },
    {
      question: "Will Guest Overflow bring me new customers?",
      answer:
        "We are candid about this: we do not replace the discovery a marketplace provides. If you require new prospective customers to find you, that is the role of Reserve with Google, your Google Business Profile, and a strong website, and we set all three up. What we replace is the commission paid on the guests who already chose you: the regulars, the direct traffic, and word of mouth.",
    },
    {
      question: "I do not have a website. Can I still use Guest Overflow?",
      answer:
        "Yes. We begin by optimizing your Google Business Profile so that people can find and book you directly from Google. When you are ready for a website of your own, we design and build one with booking built in, though there is no obligation to start there.",
    },
    {
      question: "What if it does not work for us?",
      answer:
        "In that case, you may withdraw cleanly. Our founding offer is three months at half price, and if you do not see real return or usage through your website or Google profile in that time, you may end the relationship without conditions. We track the numbers together, so you will never have to rely on our word alone.",
    },
    {
      question: "What happens after I book a demo?",
      answer:
        "A 20-minute call in which we show Guest Overflow running on a site like yours and scope what your setup would involve. No commitment, and no discussion of setup fees unless you wish to have it.",
    },
  ],
  product: [
    {
      question: "Does Guest Overflow handle deposits and no-shows?",
      answer:
        "Yes. You can require card details or take deposits for specific services, party sizes, or dates, with automated reminders that reduce no-shows considerably.",
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
        "Reserve with Google (booking directly from your Google listing and Maps), Instagram and Facebook booking links, WhatsApp and email for confirmations and reminders, and Stripe for deposits paid into your own account. POS integration begins with Lightspeed, so deposits are applied to the final bill rather than a separate spreadsheet. We configure all of this for you during setup.",
    },
    {
      question: "Where does our data live, and under which law?",
      answer:
        "Guest data is stored on servers in the European Union, your contract is governed by Portuguese law, and the entire system is built GDPR-first. Two questions worth asking any booking vendor: under which jurisdiction is my contract governed, and where exactly does my guest data reside?",
    },
  ],
  pricing: [
    {
      question: "Is there really no per-booking fee?",
      answer:
        "Correct. Your subscription remains flat regardless of how many bookings you take. We do not believe you should pay more for being busy.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "Setup is included in Premium. For Essential, a one-time setup fee may apply depending on your configuration. We will tell you exactly what it is before you commit.",
    },
    {
      question: "Is there a discount for paying annually?",
      answer:
        "Yes. Choose annual billing and you pay a third less than the monthly price, so Essential decreases from €99 to €66 a month. Use the toggle above the plans to compare both.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Monthly plans may be cancelled at any time. Your guest data remains exportable for 90 days after cancellation.",
    },
    {
      question: "What does the founding offer include?",
      answer:
        "Half price for your first three months, hands-on onboarding directly with the founding team, and a clean exit if it is not working: if you see no return or usage through your website or Google profile in that time, you may end it, without conditions.",
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
        "It is a working session. If Guest Overflow is not the right fit for your venue, we will say so and direct you to a more suitable option.",
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
        "Uma subscrição mensal fixa, sem comissão por reserva, nunca. O valor depende do plano e do nível de personalização de que o seu espaço necessita; veja os planos na página de preços ou marque uma demonstração para um orçamento exato.",
    },
    {
      question: "Quanto tempo demora a instalação?",
      answer:
        "A maioria dos espaços fica online poucos dias após o arranque. A nossa equipa desenha, constrói e publica a sua página de reservas com a sua marca, e adiciona um link de reserva ao seu site atual. O cliente revê e aprova antes de ficar no ar.",
    },
    {
      question: "Funciona com o meu site atual?",
      answer:
        "Sim. A sua página de reservas fica no seu próprio domínio, e o seu site mantém-se exatamente como está. Adicionamos um botão ou link de reserva claro ao seu site atual, seja qual for a plataforma, incluindo sites à medida, WordPress, Squarespace e Webflow, para que os clientes sigam diretamente para a sua página de reservas com a sua marca.",
    },
    {
      question: "De quem são os dados dos clientes?",
      answer:
        "Seus, sem ambiguidade. Cada reserva, email e preferência recolhidos através da sua página de reservas pertencem ao seu negócio e podem ser exportados a qualquer momento. Nunca fazemos marketing aos seus clientes nem partilhamos os seus dados.",
    },
    {
      question: "Consegue ficar exatamente com a minha marca?",
      answer:
        "Sim; é esse o centro do que fazemos. Cores, tipografia, textos e fluxo são feitos à medida de cada espaço. Experimente a demo ao vivo acima e mude o tipo de espaço para ver como o mesmo sistema pode ficar diferente.",
    },
    {
      question: "O Guest Overflow traz-me novos clientes?",
      answer:
        "Seremos francos: não substituímos a descoberta que um marketplace proporciona. Se necessita que novos potenciais clientes o encontrem, é essa a função do Reservar com o Google, do seu Perfil de Empresa no Google e de um bom site, e configuramos os três. O que substituímos é o pagamento de comissão sobre os clientes que já o escolheram: os habituais, o tráfego direto e o passa-a-palavra.",
    },
    {
      question: "Não tenho site. Ainda assim posso usar o Guest Overflow?",
      answer:
        "Sim. Começamos por otimizar o seu Perfil de Empresa no Google para que as pessoas o encontrem e reservem diretamente a partir do Google. Quando pretender um site próprio, desenhamos e construímos um com reservas integradas, embora sem qualquer obrigação de começar por aí.",
    },
    {
      question: "E se não resultar para nós?",
      answer:
        "Nesse caso, pode retirar-se de forma limpa. A nossa oferta de lançamento é de três meses a metade do preço, e se nesse período não verificar retorno nem utilização reais através do seu site ou do seu perfil no Google, pode terminar a relação sem condições. Acompanhamos os números em conjunto, pelo que nunca terá de confiar apenas na nossa palavra.",
    },
    {
      question: "O que acontece depois de marcar a demonstração?",
      answer:
        "Uma chamada de 20 minutos em que mostramos o Guest Overflow a funcionar num site como o seu e definimos o que a sua instalação envolveria. Sem compromisso, e sem discussão de custos de instalação a menos que a pretenda ter.",
    },
  ],
  product: [
    {
      question: "O Guest Overflow trata de sinais e faltas (no-shows)?",
      answer:
        "Sim. Pode pedir dados de cartão ou cobrar sinais para serviços, tamanhos de grupo ou datas específicos, com lembretes automáticos que reduzem consideravelmente as faltas.",
    },
    {
      question: "Posso gerir a disponibilidade sozinho?",
      answer:
        "Totalmente. Abra e feche horários, defina durações por serviço, bloqueie datas e ajuste a capacidade num painel concebido para quem opera no terreno, e as alterações ficam ativas no seu site de imediato.",
    },
    {
      question: "Suporta vários espaços?",
      answer:
        "Sim. Grupos podem gerir vários espaços a partir de um único painel, com disponibilidade, marca e listas de clientes separadas por localização.",
    },
    {
      question: "Que canais e integrações suportam?",
      answer:
        "Reserve with Google (reservas diretamente a partir da sua ficha no Google e no Maps), links de reserva no Instagram e Facebook, WhatsApp e email para confirmações e lembretes, e Stripe para sinais pagos diretamente na sua conta. A integração com POS inicia-se pelo Lightspeed, para que os sinais sejam aplicados na conta final em vez de numa folha à parte. Configuramos tudo isto por si durante a instalação.",
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
      question: "Há custo de instalação?",
      answer:
        "A instalação está incluída no Premium. No Essential, pode aplicar-se um custo único de instalação consoante o seu caso. Indicamos-lhe exatamente qual é antes de se comprometer.",
    },
    {
      question: "Há desconto por pagamento anual?",
      answer:
        "Sim. Com faturação anual paga menos um terço face ao preço mensal, pelo que o Essential desce de 99 € para 66 € por mês. Utilize o seletor acima dos planos para comparar.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Os planos mensais podem ser cancelados a qualquer momento. Os dados dos seus clientes continuam exportáveis durante 90 dias após o cancelamento.",
    },
    {
      question: "O que inclui a oferta de lançamento?",
      answer:
        "Metade do preço nos primeiros três meses, onboarding conduzido diretamente com a equipa fundadora, e uma saída limpa caso não esteja a resultar: se não verificar retorno nem utilização através do seu site ou do seu perfil no Google nesse período, pode terminar sem condições.",
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
        "É uma sessão de trabalho. Se o Guest Overflow não for adequado para o seu espaço, dizemos-lho e indicamos-lhe uma opção mais apropriada.",
    },
  ],
  productTitle: "Perguntas sobre o produto",
  pricingTitle: "Perguntas sobre preços",
  demoTitle: "Antes de marcar",
};

export const faqContent: Record<Locale, FaqContent> = { en, pt };
