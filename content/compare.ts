import type { Locale } from "@/lib/i18n-shared";
import type { FeeSector } from "@/content/competitors";

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
    title: "Guest Overflow vs the platforms you already know",
    subhead:
      "Honest, side-by-side comparisons against the tools Portuguese venues actually use. What they charge, where they hurt, and what we do instead.",
  },
  detail: {
    theirTitle: (name) => `What ${name} charges`,
    painsTitle: "Where it hurts",
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
        "TheFork brings discovery, but bills you per cover, including the regulars who already book with you. We're the flat, commission-free booking that lives on your own site.",
      theirModel:
        "A per-cover commission of roughly €2-4 (more on promotions), on top of a subscription priced behind a quote. The fee applies to repeat guests too.",
      theirPains: [
        "You pay again every time a regular comes back. Your best guests become your most expensive channel.",
        "The booking page is theirs; the guest's email belongs to the platform.",
        "Pricing is quote-gated, and promotion covers cost €3-4 each.",
      ],
      ourAnswer: [
        "One flat monthly price that never moves, and no per-cover fee, ever.",
        "Booking lives on your own site, and the guest list is yours to export in one click.",
        "No-show protection runs through your own Stripe, with no payment take-rate.",
      ],
    },
    {
      slug: "booking",
      name: "Booking.com",
      sector: "hotels",
      blurb: "Dominant for Portuguese lodging, and 15-18% of every stay, forever.",
      headline: "Guest Overflow vs Booking.com",
      subhead:
        "Booking fills rooms, but takes 15-18% of every stay and keeps the guest. We make direct booking the obvious choice on your own site.",
      theirModel:
        "A commission of 15-18% on every booking (plus 15% on add-on services), with the guest relationship and email retained by the platform.",
      theirPains: [
        "A 20-room hotel can hand over €50,000-63,000 a year in commission.",
        "The guest is the OTA's, not yours. Your first real contact is at check-in.",
        "Once it becomes your only channel, the dependency is hard to break.",
      ],
      ourAnswer: [
        "A flat monthly fee. Recover a handful of direct bookings and it's already paid for itself.",
        "A brand-true booking flow on your own domain, with the guest relationship kept yours.",
        "Reserve with Google and direct-rate incentives that make booking direct the better deal.",
      ],
    },
    {
      slug: "zappy",
      name: "Zappy",
      sector: "spas-wellness",
      blurb: "Portugal's beauty-booking leader. Commission-free, but priced per seat and heavy on add-ons.",
      headline: "Guest Overflow vs Zappy",
      subhead:
        "Zappy is a strong, commission-free Portuguese tool. We win on the things it doesn't do. Real no-show protection, guest self-service, and true white-label on your own domain, set up for you.",
      theirModel:
        "Per-provider pricing from €16 to €119/mo, with a branded app, invoicing, GDPR and extra locations sold as paid add-ons on top.",
      theirPains: [
        "Pricing scales per provider (and per piece of equipment), so growing your team costs more.",
        "No card-guarantee or automatic no-show charge, just manual upfront prepayment.",
        "Guests book through a shared app rated 3.3/5 where self-cancel was removed; true branding is a €29 add-on.",
      ],
      ourAnswer: [
        "One flat price per venue, whatever your chair or practitioner count.",
        "Real no-show protection, with deposits and card guarantees through your own Stripe.",
        "True white-label on your own domain, and concierge setup we handle for you.",
      ],
    },
    {
      slug: "fresha",
      name: "Fresha",
      sector: "salons-barbers",
      blurb: "Free to start, then a cut of every new client and a margin on payments.",
      headline: "Guest Overflow vs Fresha",
      subhead:
        "Fresha looks free, but charges a commission on new clients and a margin on payments. We're a flat price per venue with no cut of your bookings.",
      theirModel:
        "A free core, then a per-bookable-member subscription, a ~20% fee on new marketplace clients, and a processing margin on payments.",
      theirPains: [
        "You pay a commission on a new client even when they found you on Google or Instagram.",
        "Marketplace visibility is tied to sharing your client data.",
        "The 'free' total climbs once per-staff fees and payment margins are added.",
      ],
      ourAnswer: [
        "A flat price per venue, with no commission on a first visit, ever.",
        "Your client list, history and notes stay yours, with one-click export.",
        "Deposits through your own Stripe, with no marketplace cut and no payment take-rate.",
      ],
    },
    {
      slug: "fareharbor",
      name: "FareHarbor",
      sector: "tours-experiences",
      blurb: "“Free” software, paid for by a 6% fee added to your guests' price.",
      headline: "Guest Overflow vs FareHarbor",
      subhead:
        "FareHarbor's software is free because your guests pay a 6% booking fee. We charge a flat price and add nothing to your guests' checkout.",
      theirModel:
        "No monthly fee, but a ~6% surcharge added to the guest's price at checkout (plus payment processing).",
      theirPains: [
        "The 6% inflates your displayed price, and guests often blame you, not the platform.",
        "A slow, cluttered checkout has been shown to drop conversion.",
        "On marketplace-routed bookings the cut is taken there too.",
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
    title: "Guest Overflow vs as plataformas que já conhece",
    subhead:
      "Comparações honestas, lado a lado, com as ferramentas que os espaços portugueses usam. O que cobram, onde doem, e o que fazemos em vez disso.",
  },
  detail: {
    theirTitle: (name) => `O que a ${name} cobra`,
    painsTitle: "Onde dói",
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
        "O TheFork traz descoberta, mas cobra por pessoa, incluindo os habituais que já reservam consigo. Nós somos a reserva fixa, sem comissão, que vive no seu próprio site.",
      theirModel:
        "Uma comissão por pessoa de cerca de 2 a 4 € (mais nas promoções), além de uma subscrição com preço atrás de orçamento. A taxa aplica-se também aos habituais.",
      theirPains: [
        "Paga outra vez sempre que um habitual volta. Os seus melhores clientes tornam-se o canal mais caro.",
        "A página de reservas é deles; o email do cliente pertence à plataforma.",
        "O preço está atrás de orçamento, e cada pessoa em promoção custa 3 a 4 €.",
      ],
      ourAnswer: [
        "Um preço mensal fixo que não mexe, e sem taxa por pessoa, nunca.",
        "A reserva vive no seu próprio site, e a lista de clientes é sua, exportável num clique.",
        "A proteção contra faltas corre pelo seu próprio Stripe, sem margem nos pagamentos.",
      ],
    },
    {
      slug: "booking",
      name: "Booking.com",
      sector: "hotels",
      blurb: "Dominante no alojamento português, e 15 a 18% de cada estadia, para sempre.",
      headline: "Guest Overflow vs Booking.com",
      subhead:
        "A Booking enche quartos, mas leva 15 a 18% de cada estadia e fica com o hóspede. Nós tornamos a reserva direta a escolha óbvia no seu próprio site.",
      theirModel:
        "Uma comissão de 15 a 18% sobre cada reserva (mais 15% sobre serviços adicionais), com a relação e o email do hóspede retidos pela plataforma.",
      theirPains: [
        "Um hotel de 20 quartos pode entregar 50.000 a 63.000 € por ano em comissão.",
        "O hóspede é da OTA, não seu. O primeiro contacto real é no check-in.",
        "Quando se torna o único canal, a dependência é difícil de quebrar.",
      ],
      ourAnswer: [
        "Um valor mensal fixo. Recupere um punhado de reservas diretas e já se pagou.",
        "Um fluxo de reserva fiel à marca no seu domínio, com a relação com o hóspede a ficar consigo.",
        "Reservar com o Google e incentivos à tarifa direta que tornam reservar direto o melhor negócio.",
      ],
    },
    {
      slug: "zappy",
      name: "Zappy",
      sector: "spas-wellness",
      blurb: "O líder português das marcações de beleza. Sem comissão, mas cobrado por lugar e cheio de extras.",
      headline: "Guest Overflow vs Zappy",
      subhead:
        "O Zappy é uma boa ferramenta portuguesa e sem comissão. Ganhamos no que ele não faz. Proteção real contra faltas, self-service do cliente e white-label verdadeiro no seu domínio, montado por si.",
      theirModel:
        "Preço por profissional de 16 a 119 €/mês, com app de marca, faturação, RGPD e localizações extra vendidas como extras pagos por cima.",
      theirPains: [
        "O preço escala por profissional (e por equipamento), por isso crescer a equipa custa mais.",
        "Sem garantia de cartão nem cobrança automática de faltas, apenas pré-pagamento manual.",
        "Os clientes reservam por uma app partilhada com 3,3/5 onde o cancelamento foi removido; a marca verdadeira é um extra de 29 €.",
      ],
      ourAnswer: [
        "Um preço fixo por espaço, seja qual for o número de cadeiras ou profissionais.",
        "Proteção real contra faltas, com sinais e garantias de cartão pelo seu próprio Stripe.",
        "White-label verdadeiro no seu domínio, e instalação concierge que tratamos por si.",
      ],
    },
    {
      slug: "fresha",
      name: "Fresha",
      sector: "salons-barbers",
      blurb: "Grátis para começar, depois uma fatia de cada novo cliente e uma margem nos pagamentos.",
      headline: "Guest Overflow vs Fresha",
      subhead:
        "A Fresha parece gratuita, mas cobra comissão sobre novos clientes e uma margem nos pagamentos. Nós somos um preço fixo por espaço, sem fatia das suas reservas.",
      theirModel:
        "Um núcleo gratuito, depois uma subscrição por profissional, uma taxa de ~20% sobre novos clientes do marketplace, e uma margem de processamento nos pagamentos.",
      theirPains: [
        "Paga comissão sobre um novo cliente mesmo quando ele o encontrou no Google ou no Instagram.",
        "A visibilidade no marketplace está ligada a partilhar os dados dos seus clientes.",
        "O total 'grátis' sobe assim que se somam as taxas por profissional e as margens de pagamento.",
      ],
      ourAnswer: [
        "Um preço fixo por espaço, sem comissão na primeira visita, nunca.",
        "A sua lista de clientes, histórico e notas ficam consigo, com exportação num clique.",
        "Sinais pelo seu próprio Stripe, sem fatia do marketplace e sem margem nos pagamentos.",
      ],
    },
    {
      slug: "fareharbor",
      name: "FareHarbor",
      sector: "tours-experiences",
      blurb: "Software “grátis”, pago por uma taxa de 6% acrescentada ao preço dos seus clientes.",
      headline: "Guest Overflow vs FareHarbor",
      subhead:
        "O software da FareHarbor é grátis porque os seus clientes pagam uma taxa de 6%. Nós cobramos um preço fixo e não acrescentamos nada ao checkout dos seus clientes.",
      theirModel:
        "Sem mensalidade, mas uma sobretaxa de ~6% acrescentada ao preço do cliente no checkout (mais o processamento de pagamentos).",
      theirPains: [
        "Os 6% inflacionam o preço que mostra, e os clientes culpam-no a si, não à plataforma.",
        "Um checkout lento e carregado já demonstrou reduzir a conversão.",
        "Nas reservas vindas do marketplace, a fatia também é levada lá.",
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

/** Slugs are locale-independent; used by generateStaticParams and the sitemap. */
export const competitorSlugs = en.entries.map((e) => e.slug);

export function getCompareEntry(locale: Locale, slug: string) {
  return compareContent[locale].entries.find((e) => e.slug === slug);
}
