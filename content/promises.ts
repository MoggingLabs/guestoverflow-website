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
      title: "Your guest data is yours, with one-click export",
      body: "Export your full guest list at any time, in a clean file you own. This is written into the agreement.",
      vs: "OpenTable amended its contract to block the export of your guests to a competitor.",
    },
    {
      title: "No commission, no payment take-rate, ever",
      body: "One flat price. Deposits run through your own Stripe account, so you retain your processor and your full rate.",
      vs: "TheFork bills per cover, Fresha/Treatwell take 20-35%, and many 'flat' tools deduct 1-3.6% on payments.",
    },
    {
      title: "No surprise add-ons",
      body: "The quoted price is the actual price. Essentials are included, not unlocked one fee at a time.",
      vs: "A €16 headline becomes ~€60 once the branded app, invoicing and GDPR modules are added on.",
    },
    {
      title: "We never increase your rate without notice",
      body: "Your price is protected for as long as you remain a client. Increases never apply to existing venues.",
      vs: "Bokun changed pricing three times in two years; Cloudbeds increases drew formal complaints.",
    },
    {
      title: "No lock-in, with a one-sentence exit",
      body: "Leave whenever you choose, in a single email. No multi-year contract, and no invoice after your departure.",
      vs: "Mews locks clients in for two years; one platform billed a hotel ~€1,900 for 14 months after it had cancelled.",
    },
    {
      title: "Our price is public, with no sales call required to see it",
      body: "Every plan is published on the site. You will never have to attend a demo simply to learn the cost.",
      vs: "TheFork, Mews, Cloudbeds and most incumbents conceal pricing behind a quote.",
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
      vs: "A OpenTable alterou o contrato para bloquear a exportação dos seus clientes para um concorrente.",
    },
    {
      title: "Sem comissão, sem margem nos pagamentos, nunca",
      body: "Um preço fixo. Os sinais correm pela sua própria conta Stripe, por isso mantém o seu processador e a tarifa integral.",
      vs: "O TheFork cobra por pessoa, a Fresha/Treatwell levam 20 a 35%, e muitas ferramentas 'fixas' deduzem 1 a 3,6% nos pagamentos.",
    },
    {
      title: "Sem extras-surpresa",
      body: "O preço indicado é o preço efetivo. O essencial vem incluído, não desbloqueado taxa a taxa.",
      vs: "Um valor de 16 € anunciado torna-se ~60 € depois da app de marca, faturação e módulo de RGPD.",
    },
    {
      title: "Nunca aumentamos a sua tarifa sem aviso prévio",
      body: "O seu preço fica garantido enquanto se mantiver cliente. Os aumentos nunca se aplicam a espaços existentes.",
      vs: "A Bokun alterou os preços três vezes em dois anos; os aumentos da Cloudbeds geraram queixas formais.",
    },
    {
      title: "Sem fidelização, com uma saída numa frase",
      body: "Sai quando quiser, num único email. Sem contrato de vários anos, e sem fatura após a sua saída.",
      vs: "A Mews vincula os clientes por dois anos; uma plataforma cobrou a um hotel ~1.900 € por 14 meses depois de ter cancelado.",
    },
    {
      title: "O nosso preço é público, sem necessidade de chamada de vendas para o consultar",
      body: "Todos os planos estão publicados no site. Nunca terá de assistir a uma demonstração apenas para saber o custo.",
      vs: "O TheFork, a Mews, a Cloudbeds e a maioria dos incumbentes ocultam o preço atrás de um orçamento.",
    },
  ],
};

export const promisesContent: Record<Locale, PromisesContent> = { en, pt };
