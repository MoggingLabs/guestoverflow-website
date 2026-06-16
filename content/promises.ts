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
    headline: "In writing, and mapped to where the others fail.",
    subhead:
      "Every one of these is a contractual commitment, not a slogan — each answers a real thing a rival does to its customers.",
  },
  stripTitle: "Promises we put in writing",
  promises: [
    {
      title: "Your guest data is yours — one-click export",
      body: "Export your full guest list any time, in a clean file you own. It's written into the agreement.",
      vs: "OpenTable amended its contract to block exporting your guests to a rival.",
    },
    {
      title: "No commission, no payment take-rate — ever",
      body: "One flat price. Deposits run through your own Stripe, so you keep your processor and your full rate.",
      vs: "TheFork bills per cover, Fresha/Treatwell take 20–35%, and many 'flat' tools skim 1–3.6% on payments.",
    },
    {
      title: "No surprise add-ons",
      body: "The quoted price is the real price. Essentials are bundled, not unlocked one fee at a time.",
      vs: "A €16 headline becomes ~€60 once the branded app, invoicing and GDPR modules are added on.",
    },
    {
      title: "We never raise your rate out from under you",
      body: "Your price is grandfathered for as long as you stay. Increases never apply to existing venues.",
      vs: "Bokun changed pricing three times in two years; Cloudbeds hikes drew open complaint.",
    },
    {
      title: "No lock-in, a one-sentence exit",
      body: "Leave whenever you like, in one email. No multi-year contract, no bill after you've gone.",
      vs: "Mews locks in two years; one platform billed a hotel ~€1,900 for 14 months after it had cancelled.",
    },
    {
      title: "Our price is public — no sales call to see it",
      body: "Every plan is on the site. You'll never have to sit through a demo just to learn what it costs.",
      vs: "TheFork, Mews, Cloudbeds and most incumbents hide pricing behind a quote.",
    },
  ],
};

const pt: PromisesContent = {
  hero: {
    eyebrow: "As nossas promessas",
    headline: "Por escrito, e ligadas ao ponto onde os outros falham.",
    subhead:
      "Cada uma destas é um compromisso contratual, não um slogan — e responde a algo real que um concorrente faz aos seus clientes.",
  },
  stripTitle: "Promessas que pomos por escrito",
  promises: [
    {
      title: "Os dados dos seus clientes são seus — exportação num clique",
      body: "Exporte a lista completa de clientes quando quiser, num ficheiro limpo que é seu. Está escrito no contrato.",
      vs: "A OpenTable alterou o contrato para bloquear a exportação dos seus clientes para um rival.",
    },
    {
      title: "Sem comissão, sem margem nos pagamentos — nunca",
      body: "Um preço fixo. Os sinais correm pelo seu próprio Stripe, por isso fica com o seu processador e a tarifa inteira.",
      vs: "O TheFork cobra por pessoa, a Fresha/Treatwell levam 20–35%, e muitas ferramentas 'fixas' tiram 1–3,6% nos pagamentos.",
    },
    {
      title: "Sem extras-surpresa",
      body: "O preço indicado é o preço real. O essencial vem incluído, não desbloqueado taxa a taxa.",
      vs: "Um valor de 16 € na montra torna-se ~60 € depois da app de marca, faturação e módulo de RGPD.",
    },
    {
      title: "Nunca lhe aumentamos a tarifa sem o avisar",
      body: "O seu preço fica garantido enquanto for cliente. Os aumentos nunca se aplicam a espaços existentes.",
      vs: "A Bokun mudou de preços três vezes em dois anos; os aumentos da Cloudbeds geraram queixas abertas.",
    },
    {
      title: "Sem fidelização, saída numa frase",
      body: "Sai quando quiser, num email. Sem contrato de vários anos, sem fatura depois de sair.",
      vs: "A Mews prende por dois anos; uma plataforma cobrou a um hotel ~1.900 € por 14 meses depois de ter cancelado.",
    },
    {
      title: "O nosso preço é público — sem chamada de vendas para o ver",
      body: "Todos os planos estão no site. Nunca terá de assistir a uma demonstração só para saber quanto custa.",
      vs: "O TheFork, a Mews, a Cloudbeds e a maioria dos incumbentes escondem o preço atrás de um orçamento.",
    },
  ],
};

export const promisesContent: Record<Locale, PromisesContent> = { en, pt };
