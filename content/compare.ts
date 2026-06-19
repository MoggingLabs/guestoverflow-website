import type { Locale } from "@/lib/i18n-shared";
import type { FeeSector } from "@/content/competitors";
import { isActiveSector } from "@/lib/sectors";

export type CompareEntry = {
  slug: string;
  name: string;
  /** Used for the savings-calculator deep link. */
  sector: FeeSector;
  blurb: string;
  headline: string;
  subhead: string;
  theirModel: string;
  theirPains: string[];
  ourAnswer: string[];
};

type CompareContent = {
  index: { eyebrow: string; title: string; subhead: string };
  detail: {
    theirTitle: (name: string) => string;
    painsTitle: string;
    ourTitle: string;
    calcCta: string;
    seePricing: string;
  };
  entries: CompareEntry[];
};

const en: CompareContent = {
  index: {
    eyebrow: "Compare",
    title: "Guest Overflow versus the salon booking apps",
    subhead:
      "A direct, side-by-side comparison against the tools Portuguese salons and barbershops use today. What they charge, where the cost falls, and the alternative we provide.",
  },
  detail: {
    theirTitle: (name) => `What ${name} charges`,
    painsTitle: "Where the cost falls",
    ourTitle: "With Guest Overflow",
    calcCta: "Calculate your savings",
    seePricing: "See our pricing",
  },
  entries: [
    {
      slug: "thefork",
      name: "TheFork",
      sector: "restaurants",
      blurb: "The dominant restaurant marketplace in Portugal, with a per-cover fee on every diner.",
      headline: "Guest Overflow vs TheFork",
      subhead:
        "TheFork provides discovery, but it bills you per cover, including the regulars who already book with you. Guest Overflow is the flat, commission-free booking solution that resides on your own site.",
      theirModel:
        "A per-cover commission of roughly €2-4 (higher on promotions), on top of a subscription priced behind a quote. The fee applies to repeat guests as well.",
      theirPains: [
        "You pay again every time a regular returns. Your most valuable guests become your most expensive channel.",
        "The booking page belongs to the platform, and so does the guest's email address.",
        "Pricing is available only on request, and promotion covers cost €3-4 each.",
      ],
      ourAnswer: [
        "One flat monthly price that never changes, with no per-cover fee at any time.",
        "Booking resides on your own site, and the guest list is yours to export in a single click.",
        "No-show protection operates through your own Stripe account, with no payment take-rate.",
      ],
    },
    {
      slug: "booking",
      name: "Booking.com",
      sector: "hotels",
      blurb: "Dominant for Portuguese lodging, and 15-18% of every stay, forever.",
      headline: "Guest Overflow vs Booking.com",
      subhead:
        "Booking fills rooms, but it takes 15-18% of every stay and retains the guest. Guest Overflow makes direct booking the clear choice on your own site.",
      theirModel:
        "A commission of 15-18% on every booking (plus 15% on add-on services), with the guest relationship and email retained by the platform.",
      theirPains: [
        "A 20-room hotel can pay €50,000-63,000 a year in commission.",
        "The guest belongs to the OTA, not to you. Your first direct contact occurs at check-in.",
        "Once it becomes your sole channel, the dependency is difficult to break.",
      ],
      ourAnswer: [
        "A flat monthly fee. Recovering a small number of direct bookings covers the cost in full.",
        "A booking flow true to your brand, with the guest relationship retained by you.",
        "Reserve with Google and direct-rate incentives that make booking direct the better value.",
      ],
    },
    {
      slug: "zappy",
      name: "Zappy",
      sector: "spas-wellness",
      blurb: "Portugal's beauty-booking leader. Commission-free, but heavy on paid add-ons and without real no-show protection.",
      headline: "Guest Overflow vs Zappy",
      subhead:
        "Zappy is a capable, commission-free Portuguese tool. Guest Overflow leads on what it does not provide: genuine no-show protection, guest self-service, and, on Premium, true white-label on your own custom domain, configured for you.",
      theirModel:
        "Per-provider pricing from €16 to €119/mo, with a branded app, invoicing, GDPR and additional locations sold as paid add-ons on top.",
      theirPains: [
        "The real total climbs once you add the branded client app (€29), invoicing, GDPR and per-location fees.",
        "There is no card guarantee or automatic no-show charge, only manual upfront prepayment.",
        "Guests book through a shared app rated 3.3/5 in which self-cancellation was removed, and true branding is a €29 add-on.",
      ],
      ourAnswer: [
        "One published, all-in plan with no marketplace commission — WhatsApp reminders and client CRM are built in, never billed as add-ons.",
        "Genuine no-show protection, with deposits and card guarantees through your own Stripe account.",
        "True white-label on your own custom domain (on Premium), and concierge setup that we handle for you.",
      ],
    },
    {
      slug: "fresha",
      name: "Fresha",
      sector: "salons-barbers",
      blurb: "Free to start, then a cut of every new client and a margin on payments.",
      headline: "Guest Overflow vs Fresha",
      subhead:
        "Fresha appears free, but it charges a commission on new clients and a margin on payments. Guest Overflow is a published flat price, with no share of your bookings.",
      theirModel:
        "A free core, then a per-bookable-member subscription, a ~20% fee on new marketplace clients, and a processing margin on payments.",
      theirPains: [
        "You pay a commission on a new client even when that client found you on Google or Instagram.",
        "Marketplace visibility is conditional on sharing your client data.",
        "The 'free' total rises once per-staff fees and payment margins are added.",
      ],
      ourAnswer: [
        "A published flat price, with no commission on a first visit at any time.",
        "Your client list, history and notes remain yours, with one-click export.",
        "Deposits through your own account, with no marketplace share and no payment take-rate.",
      ],
    },
    {
      slug: "fareharbor",
      name: "FareHarbor",
      sector: "tours-experiences",
      blurb: "“Free” software, paid for by a 6% fee added to your guests' price.",
      headline: "Guest Overflow vs FareHarbor",
      subhead:
        "FareHarbor's software is free because your guests pay a 6% booking fee. Guest Overflow charges a flat price and adds nothing to your guests' checkout.",
      theirModel:
        "No monthly fee, but a ~6% surcharge added to the guest's price at checkout (plus payment processing).",
      theirPains: [
        "The 6% inflates your displayed price, and guests frequently attribute it to you rather than the platform.",
        "A slow, cluttered checkout has been shown to reduce conversion.",
        "On marketplace-routed bookings, the share is taken there as well.",
      ],
      ourAnswer: [
        "A flat monthly price, with nothing added to your guests' price.",
        "A fast, sub-second booking flow on your own site.",
        "Capacity-aware sessions and group-buyout enquiries, and we never bill you for a cancellation.",
      ],
    },
  ],
};

const pt: CompareContent = {
  index: {
    eyebrow: "Comparar",
    title: "Guest Overflow versus as apps de reservas para salões",
    subhead:
      "Uma comparação direta, lado a lado, com as ferramentas que os salões e barbearias em Portugal utilizam. O que cobram, onde recai o custo, e a alternativa que oferecemos.",
  },
  detail: {
    theirTitle: (name) => `O que a ${name} cobra`,
    painsTitle: "Onde recai o custo",
    ourTitle: "Com o Guest Overflow",
    calcCta: "Calcule a sua poupança",
    seePricing: "Ver os nossos preços",
  },
  entries: [
    {
      slug: "thefork",
      name: "TheFork",
      sector: "restaurants",
      blurb: "O marketplace de restaurantes dominante em Portugal, com uma taxa por pessoa em cada cliente.",
      headline: "Guest Overflow vs TheFork",
      subhead:
        "O TheFork proporciona descoberta, mas cobra por pessoa, incluindo os clientes habituais que já reservam consigo. O Guest Overflow é a solução de reservas fixa e sem comissão que reside no seu próprio site.",
      theirModel:
        "Uma comissão por pessoa de cerca de 2 a 4 € (superior nas promoções), além de uma subscrição com preço apenas sob orçamento. A taxa aplica-se igualmente aos clientes habituais.",
      theirPains: [
        "Paga novamente sempre que um cliente habitual regressa. Os seus clientes mais valiosos tornam-se o seu canal mais caro.",
        "A página de reservas pertence-lhes, e o email do cliente pertence à plataforma.",
        "O preço está disponível apenas sob orçamento, e cada pessoa em promoção custa 3 a 4 €.",
      ],
      ourAnswer: [
        "Um preço mensal fixo que não se altera, sem taxa por pessoa em momento algum.",
        "A reserva reside no seu próprio site, e a lista de clientes é sua, exportável num único clique.",
        "A proteção contra faltas opera através da sua própria conta Stripe, sem margem nos pagamentos.",
      ],
    },
    {
      slug: "booking",
      name: "Booking.com",
      sector: "hotels",
      blurb: "Dominante no alojamento português, e 15 a 18% de cada estadia, para sempre.",
      headline: "Guest Overflow vs Booking.com",
      subhead:
        "A Booking enche quartos, mas leva 15 a 18% de cada estadia e retém o hóspede. O Guest Overflow torna a reserva direta a escolha evidente no seu próprio site.",
      theirModel:
        "Uma comissão de 15 a 18% sobre cada reserva (mais 15% sobre serviços adicionais), com a relação e o email do hóspede retidos pela plataforma.",
      theirPains: [
        "Um hotel de 20 quartos pode pagar 50.000 a 63.000 € por ano em comissão.",
        "O hóspede pertence à OTA, não a si. O seu primeiro contacto direto ocorre no check-in.",
        "Quando se torna o seu único canal, a dependência é difícil de quebrar.",
      ],
      ourAnswer: [
        "Um valor mensal fixo. A recuperação de um número reduzido de reservas diretas cobre o custo na totalidade.",
        "Um fluxo de reserva fiel à marca, com a relação com o hóspede a permanecer consigo.",
        "Reservar com o Google e incentivos à tarifa direta que tornam a reserva direta a melhor opção.",
      ],
    },
    {
      slug: "zappy",
      name: "Zappy",
      sector: "spas-wellness",
      blurb: "O líder português das marcações de beleza. Sem comissão, mas cheio de extras pagos e sem proteção real contra faltas.",
      headline: "Guest Overflow vs Zappy",
      subhead:
        "O Zappy é uma ferramenta portuguesa competente e sem comissão. O Guest Overflow distingue-se naquilo que ele não oferece: proteção genuína contra faltas, self-service do cliente e, no Premium, white-label verdadeiro no seu próprio domínio, configurado por nós.",
      theirModel:
        "Preço por profissional de 16 a 119 €/mês, com app de marca, faturação, RGPD e localizações adicionais vendidas como extras pagos por cima.",
      theirPains: [
        "O custo real sobe assim que adiciona a app de cliente com marca (29 €), faturação, RGPD e taxas por localização.",
        "Não existe garantia de cartão nem cobrança automática de faltas, apenas pré-pagamento manual.",
        "Os clientes reservam por uma app partilhada com 3,3/5 na qual o cancelamento foi removido, e a marca verdadeira é um extra de 29 €.",
      ],
      ourAnswer: [
        "Um plano único e público, sem comissão de marketplace — lembretes por WhatsApp e CRM de clientes incluídos, nunca cobrados como extras.",
        "Proteção genuína contra faltas, com sinais e garantias de cartão pela sua própria conta Stripe.",
        "White-label verdadeiro no seu próprio domínio (no Premium), e instalação concierge que tratamos por si.",
      ],
    },
    {
      slug: "fresha",
      name: "Fresha",
      sector: "salons-barbers",
      blurb: "Grátis para começar, depois uma fatia de cada novo cliente e uma margem nos pagamentos.",
      headline: "Guest Overflow vs Fresha",
      subhead:
        "A Fresha parece gratuita, mas cobra comissão sobre novos clientes e uma margem nos pagamentos. O Guest Overflow é um preço fixo e público, sem qualquer fatia das suas reservas.",
      theirModel:
        "Um núcleo gratuito, depois uma subscrição por profissional, uma taxa de ~20% sobre novos clientes do marketplace, e uma margem de processamento nos pagamentos.",
      theirPains: [
        "Paga comissão sobre um novo cliente mesmo quando esse cliente o encontrou no Google ou no Instagram.",
        "A visibilidade no marketplace está condicionada à partilha dos dados dos seus clientes.",
        "O total 'grátis' aumenta assim que se somam as taxas por profissional e as margens de pagamento.",
      ],
      ourAnswer: [
        "Um preço fixo e público, sem comissão na primeira visita em momento algum.",
        "A sua lista de clientes, histórico e notas permanecem consigo, com exportação num clique.",
        "Sinais pela sua própria conta, sem fatia do marketplace e sem margem nos pagamentos.",
      ],
    },
    {
      slug: "fareharbor",
      name: "FareHarbor",
      sector: "tours-experiences",
      blurb: "Software “grátis”, pago por uma taxa de 6% acrescentada ao preço dos seus clientes.",
      headline: "Guest Overflow vs FareHarbor",
      subhead:
        "O software da FareHarbor é grátis porque os seus clientes pagam uma taxa de 6%. O Guest Overflow cobra um preço fixo e não acrescenta nada ao checkout dos seus clientes.",
      theirModel:
        "Sem mensalidade, mas uma sobretaxa de ~6% acrescentada ao preço do cliente no checkout (mais o processamento de pagamentos).",
      theirPains: [
        "Os 6% inflacionam o preço que apresenta, e os clientes atribuem-no frequentemente a si, não à plataforma.",
        "Um checkout lento e sobrecarregado já demonstrou reduzir a conversão.",
        "Nas reservas provenientes do marketplace, a fatia é igualmente cobrada nesse canal.",
      ],
      ourAnswer: [
        "Um preço mensal fixo, sem nada acrescentado ao preço dos seus clientes.",
        "Um fluxo de reserva rápido, em menos de um segundo, no seu próprio site.",
        "Sessões com gestão de lotação e pedidos de reserva exclusiva, e nunca lhe cobramos um cancelamento.",
      ],
    },
  ],
};

export const compareContent: Record<Locale, CompareContent> = { en, pt };

/**
 * Competitor compare pages held back even when their sector is live.
 * `thefork` (restaurants) is authored but kept stashed pending a copy/legal
 * review of the comparison claims — delete it here to publish /compare/thefork.
 */
const STASHED_COMPETITORS = new Set<string>(["thefork"]);

/** A compare entry is live when its sector is active and it isn't stashed. */
function isActiveCompetitor(entry: { slug: string; sector: FeeSector }): boolean {
  return isActiveSector(entry.sector) && !STASHED_COMPETITORS.has(entry.slug);
}

/**
 * Active competitor slugs only (those whose sector is live and not stashed);
 * used by generateStaticParams and the sitemap. Stashed entries stay in the
 * data but are filtered out - see `isActiveCompetitor` / `lib/sectors.ts`.
 */
export const competitorSlugs = en.entries
  .filter(isActiveCompetitor)
  .map((e) => e.slug);

/** Active compare entries for a locale, in order - used by the /compare hub. */
export function getActiveCompareEntries(locale: Locale) {
  return compareContent[locale].entries.filter(isActiveCompetitor);
}

export function getCompareEntry(locale: Locale, slug: string) {
  const entry = compareContent[locale].entries.find((e) => e.slug === slug);
  return entry && isActiveCompetitor(entry) ? entry : undefined;
}
