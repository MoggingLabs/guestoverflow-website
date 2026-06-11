import type { IndustryContent } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

type IndustriesStrings = {
  industries: IndustryContent[];
  index: { eyebrow: string; title: string; subhead: string; seeBooking: (label: string) => string };
  detail: {
    problemEyebrow: string;
    problemTitle: (label: string) => string;
    liveDemoEyebrow: string;
    liveDemoTitle: (venue: string) => string;
    liveDemoSubhead: string;
    builtInEyebrow: string;
    builtInTitle: (label: string) => string;
    footerHeadline: string;
    footerSubhead: string;
  };
};

const en: IndustriesStrings = {
  industries: [
    {
      slug: "restaurants",
      label: "Restaurants",
      themeId: "fine-dining",
      icon: "fork",
      cardBlurb:
        "Table reservations that feel like a natural part of your dining room, not a marketplace tab.",
      hero: {
        headline: "Take reservations on your own website.",
        subhead:
          "Guest Overflow gives restaurants a reservation flow that lives on their own site, carries their brand, and never charges per cover.",
      },
      painPoints: [
        {
          title: "Marketplaces compete for your diners",
          body: "Booking platforms list you right next to your competitors, and they're happy to nudge your guests toward someone else's table.",
        },
        {
          title: "Per-cover fees scale against you",
          body: "With commission pricing, a fully booked night is also your most expensive one. The fees quietly eat into your best services.",
        },
        {
          title: "No-shows burn prime slots",
          body: "Without deposits and well-timed reminders, a no-show on a Friday eight-top is revenue you simply never get back.",
        },
      ],
      highlights: [
        {
          title: "Table & turn management",
          body: "Slot lengths per party size, pacing controls, and dining-room capacity that match how you actually seat guests.",
        },
        {
          title: "Deposits & card guarantees",
          body: "Protect prime-time covers with deposits or card holds for large parties and special menus.",
        },
        {
          title: "A guest book you own",
          body: "Regulars, allergies, anniversaries. It all stays in your hands, and you can export it whenever you like.",
        },
      ],
      metaDescription:
        "White-label restaurant reservations on your own website. No per-cover commission, deposits for no-show protection, and a guest book you own.",
    },
    {
      slug: "hotels",
      label: "Hotels",
      themeId: "hotel",
      icon: "bed",
      cardBlurb:
        "Direct bookings for boutique hotels, so you keep the OTA commission and own the guest relationship.",
      hero: {
        headline: "Make direct booking the obvious choice.",
        subhead:
          "Boutique hotels lose 15-25% of every OTA stay. Guest Overflow puts a beautiful, brand-true booking flow on your own site so guests book direct.",
      },
      painPoints: [
        {
          title: "OTAs take a fifth of every stay",
          body: "Online travel agencies charge commissions that dwarf any software cost, and they keep the guest's email forever.",
        },
        {
          title: "Clunky booking engines lose guests",
          body: "Most hotel booking engines feel like airline checkouts, so guests give up halfway and book through the OTA instead.",
        },
        {
          title: "No relationship before arrival",
          body: "When the OTA owns the booking, your first real contact with a guest happens at the front desk.",
        },
      ],
      highlights: [
        {
          title: "Room & rate aware",
          body: "Room types, occupancy rules, and seasonal rates presented in a flow that feels like your hotel, not a portal.",
        },
        {
          title: "Direct-booking incentives",
          body: "Surface member rates, perks, or packages that make booking direct visibly better than the OTA price.",
        },
        {
          title: "Pre-arrival guest profile",
          body: "Preferences and special requests collected at booking, so the welcome starts before check-in.",
        },
      ],
      metaDescription:
        "Direct hotel bookings on your own website. A brand-true booking flow that beats OTA commissions and keeps the guest relationship yours.",
    },
    {
      slug: "spas-wellness",
      label: "Spas & wellness",
      themeId: "spa",
      icon: "leaf",
      cardBlurb:
        "Treatment bookings that feel as calm as your space, with services, practitioners, and schedules handled gracefully.",
      hero: {
        headline: "A booking experience as calm as your space.",
        subhead:
          "Spas and wellness studios get a booking flow that matches the feel of their brand, with services, durations, and practitioner schedules handled without the friction.",
      },
      painPoints: [
        {
          title: "Phone tag fills your front desk",
          body: "Every booking taken by phone costs staff time, and enquiries that come in after hours often never get answered at all.",
        },
        {
          title: "Generic salon software, generic feel",
          body: "Mass-market booking tools tend to look like spreadsheets. Your booking page should feel like your space does.",
        },
        {
          title: "Late cancellations leave empty rooms",
          body: "An empty treatment room is revenue you can't get back, and unprotected bookings make late cancellations painless for everyone but you.",
        },
      ],
      highlights: [
        {
          title: "Service & practitioner logic",
          body: "Durations, prep time, and per-practitioner availability all handled cleanly behind the scenes.",
        },
        {
          title: "Cancellation protection",
          body: "Deposits and tiered cancellation windows keep your treatment rooms earning.",
        },
        {
          title: "Intake built into booking",
          body: "Collect preferences and health notes at booking time, so clients arrive ready and sessions start on time.",
        },
      ],
      metaDescription:
        "White-label spa and wellness booking on your own website. Services, practitioners, deposits, and intake, in a flow as calm as your brand.",
    },
    {
      slug: "tours-experiences",
      label: "Tours & experiences",
      themeId: "wine-bar",
      icon: "compass",
      cardBlurb:
        "Tastings, tours, and events with capacity-aware scheduling and direct ticket sales.",
      hero: {
        headline: "Sell out departures from your own site.",
        subhead:
          "Wineries, tour operators, and experience hosts get capacity-aware scheduling and direct sales, without marketplace commissions eating into the margin.",
      },
      painPoints: [
        {
          title: "Marketplaces take 20-30% per ticket",
          body: "Experience platforms charge steep commissions and own the customer for the next trip too.",
        },
        {
          title: "Capacity chaos across channels",
          body: "Selling the same departure in three places means overbooking or, worse, half-empty sessions.",
        },
        {
          title: "Group bookings handled by email",
          body: "Private tastings and group tours arranged over long email threads take up hours and slip through the cracks more often than anyone admits.",
        },
      ],
      highlights: [
        {
          title: "Capacity-aware sessions",
          body: "Fixed departures with live seat counts, so guests see real availability and you never oversell a session.",
        },
        {
          title: "Direct payment, no commission",
          body: "Tickets and tastings sold on your own site at a flat cost, whatever your volume.",
        },
        {
          title: "Private & group requests",
          body: "A structured enquiry flow for buyouts and groups, so your largest bookings don't get lost in your inbox.",
        },
      ],
      metaDescription:
        "Direct booking for tours, tastings, and experiences on your own website. Capacity-aware sessions without marketplace commissions.",
    },
  ],
  index: {
    eyebrow: "Industries",
    title: "Built for the way you host.",
    subhead:
      "One booking system, adapted to how your business works. Each page below includes a live demo themed for that type of venue.",
    seeBooking: (label) => `See ${label.toLowerCase()} booking →`,
  },
  detail: {
    problemEyebrow: "The problem",
    problemTitle: (label) => `What ${label.toLowerCase()} put up with today`,
    liveDemoEyebrow: "Live demo",
    liveDemoTitle: (venue) => `Try a booking at ${venue}.`,
    liveDemoSubhead:
      "The venue is fictional, but the widget is real. This is how Guest Overflow would feel themed for your business.",
    builtInEyebrow: "Built in",
    builtInTitle: (label) => `Guest Overflow for ${label.toLowerCase()}`,
    footerHeadline: "Bring booking home to your website.",
    footerSubhead: "See Guest Overflow themed for a venue like yours in a 20-minute demo.",
  },
};

const pt: IndustriesStrings = {
  industries: [
    {
      slug: "restaurants",
      label: "Restaurantes",
      themeId: "fine-dining",
      icon: "fork",
      cardBlurb:
        "Reservas de mesa que parecem uma parte natural da sua sala, não um separador de marketplace.",
      hero: {
        headline: "Receba reservas no seu próprio site.",
        subhead:
          "O Guest Overflow dá aos restaurantes um fluxo de reservas que vive no seu próprio site, veste a sua marca e nunca cobra por reserva.",
      },
      painPoints: [
        {
          title: "Os marketplaces disputam os seus clientes",
          body: "As plataformas de reservas mostram-no mesmo ao lado dos concorrentes, e não hesitam em empurrar os seus clientes para a mesa de outro.",
        },
        {
          title: "As taxas por reserva crescem contra si",
          body: "Com comissões, uma noite esgotada é também a mais cara. As taxas vão comendo os seus melhores serviços sem dar por isso.",
        },
        {
          title: "As faltas queimam os melhores horários",
          body: "Sem sinais e lembretes na hora certa, uma falta numa mesa de oito à sexta-feira é receita que nunca mais recupera.",
        },
      ],
      highlights: [
        {
          title: "Gestão de mesas e rotação",
          body: "Durações por tamanho de grupo, controlo de ritmo e capacidade da sala alinhados com a forma como realmente senta os clientes.",
        },
        {
          title: "Sinais e garantias de cartão",
          body: "Proteja os horários nobres com sinais ou garantias de cartão para grupos grandes e menus especiais.",
        },
        {
          title: "Um livro de clientes que é seu",
          body: "Habituais, alergias, aniversários. Tudo fica nas suas mãos, e pode exportá-lo quando quiser.",
        },
      ],
      metaDescription:
        "Reservas de restaurante white-label no seu próprio site. Sem comissão por reserva, sinais contra faltas e um livro de clientes que é seu.",
    },
    {
      slug: "hotels",
      label: "Hotéis",
      themeId: "hotel",
      icon: "bed",
      cardBlurb:
        "Reservas diretas para hotéis boutique: fica com a comissão das OTAs e com a relação com o hóspede.",
      hero: {
        headline: "Faça da reserva direta a escolha óbvia.",
        subhead:
          "Os hotéis boutique perdem 15 a 25% de cada estadia vendida por OTA. O Guest Overflow coloca um fluxo de reserva bonito e fiel à marca no seu próprio site, para que os hóspedes reservem diretamente.",
      },
      painPoints: [
        {
          title: "As OTAs levam um quinto de cada estadia",
          body: "As agências de viagens online cobram comissões que ultrapassam em muito qualquer custo de software, e ficam para sempre com o email do hóspede.",
        },
        {
          title: "Motores de reserva pesados afastam hóspedes",
          body: "A maioria dos motores de reserva de hotel parece um checkout de companhia aérea, e os hóspedes desistem a meio e acabam por reservar na OTA.",
        },
        {
          title: "Nenhuma relação antes da chegada",
          body: "Quando a reserva pertence à OTA, o primeiro contacto real com o hóspede acontece na receção.",
        },
      ],
      highlights: [
        {
          title: "A pensar em quartos e tarifas",
          body: "Tipos de quarto, regras de ocupação e tarifas sazonais apresentados num fluxo que parece o seu hotel, não um portal.",
        },
        {
          title: "Incentivos à reserva direta",
          body: "Destaque tarifas de membro, vantagens ou pacotes que tornem a reserva direta visivelmente melhor do que o preço da OTA.",
        },
        {
          title: "Perfil do hóspede antes da chegada",
          body: "Preferências e pedidos especiais recolhidos na reserva, para que a hospitalidade comece antes do check-in.",
        },
      ],
      metaDescription:
        "Reservas diretas de hotel no seu próprio site. Um fluxo fiel à marca que vence as comissões das OTAs e mantém a relação com o hóspede.",
    },
    {
      slug: "spas-wellness",
      label: "Spas e bem-estar",
      themeId: "spa",
      icon: "leaf",
      cardBlurb:
        "Marcações de tratamentos tão calmas como o seu espaço, com serviços, terapeutas e horários geridos com elegância.",
      hero: {
        headline: "Uma experiência de marcação tão calma como o seu espaço.",
        subhead:
          "Spas e estúdios de bem-estar recebem um fluxo de marcações à imagem da sua marca, com serviços, durações e horários de terapeutas geridos sem fricção.",
      },
      painPoints: [
        {
          title: "O telefone consome a sua receção",
          body: "Cada marcação por telefone custa tempo à equipa, e os contactos fora de horas muitas vezes ficam simplesmente sem resposta.",
        },
        {
          title: "Software genérico, experiência genérica",
          body: "As ferramentas de marcação massificadas parecem folhas de cálculo. A sua página de marcações devia transmitir o que o seu espaço transmite.",
        },
        {
          title: "Cancelamentos tardios deixam salas vazias",
          body: "Uma sala de tratamento vazia é receita irrecuperável, e marcações sem proteção tornam o cancelamento tardio indolor para todos menos para si.",
        },
      ],
      highlights: [
        {
          title: "Lógica de serviços e terapeutas",
          body: "Durações, tempos de preparação e disponibilidade por terapeuta, tudo gerido de forma limpa nos bastidores.",
        },
        {
          title: "Proteção contra cancelamentos",
          body: "Sinais e janelas de cancelamento escalonadas mantêm as suas salas de tratamento a render.",
        },
        {
          title: "Ficha de cliente integrada na marcação",
          body: "Preferências e notas de saúde recolhidas no momento da marcação, para que os clientes cheguem prontos e as sessões comecem a horas.",
        },
      ],
      metaDescription:
        "Marcações white-label para spas e bem-estar no seu próprio site. Serviços, terapeutas, sinais e fichas de cliente, num fluxo tão calmo como a sua marca.",
    },
    {
      slug: "tours-experiences",
      label: "Tours e experiências",
      themeId: "wine-bar",
      icon: "compass",
      cardBlurb:
        "Provas, tours e eventos com gestão de lotação e venda direta de bilhetes.",
      hero: {
        headline: "Esgote partidas a partir do seu próprio site.",
        subhead:
          "Quintas, operadores de tours e anfitriões de experiências recebem agendamento com gestão de lotação e vendas diretas, sem comissões de marketplace a comer a margem.",
      },
      painPoints: [
        {
          title: "Os marketplaces levam 20 a 30% por bilhete",
          body: "As plataformas de experiências cobram comissões pesadas e ficam com o cliente para a próxima viagem.",
        },
        {
          title: "Caos de lotação entre canais",
          body: "Vender a mesma partida em três sítios significa overbooking ou, pior, sessões meio vazias.",
        },
        {
          title: "Reservas de grupo geridas por email",
          body: "Provas privadas e tours de grupo negociados em longas trocas de email consomem horas e escapam-se mais vezes do que se admite.",
        },
      ],
      highlights: [
        {
          title: "Sessões com gestão de lotação",
          body: "Partidas fixas com contagem de lugares em tempo real, para que os clientes vejam disponibilidade real e nunca venda a mais.",
        },
        {
          title: "Pagamento direto, sem comissão",
          body: "Bilhetes e provas vendidos no seu próprio site a custo fixo, seja qual for o volume.",
        },
        {
          title: "Pedidos privados e de grupo",
          body: "Um fluxo estruturado para grupos e reservas exclusivas, para que as suas maiores reservas não se percam na caixa de entrada.",
        },
      ],
      metaDescription:
        "Reserva direta de tours, provas e experiências no seu próprio site. Sessões com gestão de lotação, sem comissões de marketplace.",
    },
  ],
  index: {
    eyebrow: "Setores",
    title: "Feito para a forma como recebe.",
    subhead:
      "Um único sistema de reservas, adaptado à forma como o seu negócio funciona. Cada página abaixo inclui uma demo ao vivo com o tema desse tipo de espaço.",
    seeBooking: (label) => `Ver reservas para ${label.toLowerCase()} →`,
  },
  detail: {
    problemEyebrow: "O problema",
    problemTitle: (label) => `O que ${label.toLowerCase()} aturam hoje`,
    liveDemoEyebrow: "Demo ao vivo",
    liveDemoTitle: (venue) => `Experimente reservar no ${venue}.`,
    liveDemoSubhead:
      "O espaço é fictício, mas o widget é real. É assim que o Guest Overflow se sentiria com o tema do seu negócio.",
    builtInEyebrow: "Incluído",
    builtInTitle: (label) => `Guest Overflow para ${label.toLowerCase()}`,
    footerHeadline: "Traga as reservas de volta para o seu site.",
    footerSubhead:
      "Veja o Guest Overflow com o tema de um espaço como o seu numa demonstração de 20 minutos.",
  },
};

export const industriesContent: Record<Locale, IndustriesStrings> = { en, pt };

/** Slugs are locale-independent; used by generateStaticParams and the sitemap. */
export const industrySlugs = en.industries.map((i) => i.slug);

export function getIndustry(
  locale: Locale,
  slug: string,
): IndustryContent | undefined {
  return industriesContent[locale].industries.find((i) => i.slug === slug);
}
