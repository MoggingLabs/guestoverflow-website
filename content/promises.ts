import type { Locale } from "@/lib/i18n-shared";

export type Promise = {
  title: string;
  body: string;
  /** The named competitor failure this promise answers. */
  vs: string;
};

type PromisesContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  stripTitle: string;
  promises: Promise[];
};

const en: PromisesContent = {
  hero: {
    eyebrow: "Our promises",
    headline: "In writing, and mapped to where the others fall short.",
    subhead:
      "Each of these is a contractual commitment, not a slogan. Each one addresses a documented practice a competitor applies to its customers.",
  },
  stripTitle: "Commitments we put in writing",
  promises: [
    {
      title: "Your client data is yours, with one-click export",
      body: "Export your full client list at any time, in a clean file you own. This is written into the agreement.",
      vs: "Marketplaces keep your client list on their side, so the relationships you build stay with them, not you.",
    },
    {
      title: "No commission, no payment take-rate, ever",
      body: "One flat subscription, with no commission on your bookings and no margin on payments. Deposits run through your own account, so you keep your processor and your full rate. SMS reminders come with a monthly allowance, then transparent per-message pricing with no hidden margin, and email reminders are always free.",
      vs: "Fresha and Booksy take a cut of new-client bookings and 20-35% on the marketplace, plus a slice of every payment.",
    },
    {
      title: "No surprise add-ons",
      body: "The quoted price is the actual price. Essentials are included, not unlocked one fee at a time.",
      vs: "A low headline price becomes far higher once marketing boosts, the branded app and payment fees are added on.",
    },
    {
      title: "We never increase your rate without notice",
      body: "Your price is protected for as long as you remain a client. Increases never apply to existing salons.",
      vs: "Salon marketplaces have repeatedly raised commission rates and payment fees with little notice to the salons on them.",
    },
    {
      title: "No lock-in, with a one-sentence exit",
      body: "Leave whenever you choose, in a single email. No multi-year contract, and no invoice after your departure.",
      vs: "Leaving a marketplace can mean losing the client reviews and rebooking history you spent years building on it.",
    },
    {
      title: "Our price is public, with no sales call required to see it",
      body: "Every plan is published on the site. You will never have to attend a demo simply to learn the cost.",
      vs: "Fresha and Booksy bury the real cost of commission and payment fees behind sign-up rather than a public price.",
    },
  ],
};

const pt: PromisesContent = {
  hero: {
    eyebrow: "As nossas promessas",
    headline: "Por escrito, e associadas ao ponto onde os outros ficam aquém.",
    subhead:
      "Cada uma destas é um compromisso contratual, não um slogan. Cada uma responde a uma prática documentada que um concorrente aplica aos seus clientes.",
  },
  stripTitle: "Compromissos que assumimos por escrito",
  promises: [
    {
      title: "Os dados dos seus clientes são seus, com exportação num clique",
      body: "Exporte a lista completa de clientes quando quiser, num ficheiro limpo que é seu. Está estipulado no contrato.",
      vs: "Os marketplaces guardam a sua lista de clientes do lado deles, por isso as relações que constrói ficam com eles e não consigo.",
    },
    {
      title: "Sem comissão, sem margem nos pagamentos, nunca",
      body: "Uma subscrição fixa, sem comissão nas suas marcações e sem margem nos pagamentos. Os sinais correm pela sua própria conta, por isso mantém o seu processador e a tarifa integral. Os lembretes por SMS incluem um plafond mensal e, a partir daí, um preço por mensagem transparente e sem margem oculta, e os lembretes por email são sempre gratuitos.",
      vs: "A Fresha e a Booksy levam uma fatia das marcações de novos clientes e 20 a 35% no marketplace, além de uma parte de cada pagamento.",
    },
    {
      title: "Sem extras-surpresa",
      body: "O preço indicado é o preço efetivo. O essencial vem incluído, não desbloqueado taxa a taxa.",
      vs: "Um preço anunciado baixo torna-se muito mais alto depois de se somarem os impulsos de marketing, a app de marca e as taxas de pagamento.",
    },
    {
      title: "Nunca aumentamos a sua tarifa sem aviso prévio",
      body: "O seu preço fica garantido enquanto se mantiver cliente. Os aumentos nunca se aplicam a salões existentes.",
      vs: "Os marketplaces de salões já aumentaram repetidamente as comissões e as taxas de pagamento com pouco aviso aos salões que neles estão.",
    },
    {
      title: "Sem fidelização, com uma saída numa frase",
      body: "Sai quando quiser, num único email. Sem contrato de vários anos, e sem fatura após a sua saída.",
      vs: "Sair de um marketplace pode significar perder as avaliações dos clientes e o histórico de remarcações que levou anos a construir nele.",
    },
    {
      title: "O nosso preço é público, sem necessidade de chamada de vendas para o consultar",
      body: "Todos os planos estão publicados no site. Nunca terá de assistir a uma demonstração apenas para saber o custo.",
      vs: "A Fresha e a Booksy escondem o custo real da comissão e das taxas de pagamento atrás do registo, em vez de um preço público.",
    },
  ],
};

export const promisesContent: Record<Locale, PromisesContent> = { en, pt };
