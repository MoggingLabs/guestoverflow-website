import type { Locale } from "@/lib/i18n-shared";

type Service = {
  badge: string;
  title: string;
  body: string;
  points: string[];
};

type ServicesContent = {
  meta: string;
  hero: { eyebrow: string; headline: string; subhead: string };
  servicesLead: string;
  services: Service[];
  included: { eyebrow: string; title: string; body: string };
};

const en: ServicesContent = {
  meta: "Done-for-you services that help clients find your booking page: Google Business Profile optimization, Reserve with Google, and full website builds. Your booking page remains the core.",
  hero: {
    eyebrow: "Services",
    headline: "Help clients find your booking page.",
    subhead:
      "We bring the right clients straight to your own booking system, on your own terms, with no commission in between. Rather than renting visibility from a marketplace like Fresha or Booksy, you get found through Google, your brand, and word of mouth, and every client you win stays yours.",
  },
  servicesLead:
    "Your booking page is the core product, set up free with every plan. These two services are optional add-ons that simply bring more clients to it.",
  services: [
    {
      badge: "The starting point",
      title: "Google Business Profile setup",
      body: "The fastest, lowest-cost way to turn local searches into booked appointments. We optimize your Google Business Profile and switch on Reserve with Google, so when someone nearby searches for what you offer, they see your best photos, accurate hours, and a Book button that drops them straight into your own system, never a marketplace.",
      points: [
        "A fully optimized profile that ranks in Google's local results and Maps",
        "Reserve with Google live, so people book in two taps from the search result",
        "Every booking lands in your system, commission-free, with no Fresha or Booksy cut",
      ],
    },
    {
      badge: "The full picture",
      title: "We build your website",
      body: "A fast, brand-perfect website engineered to turn visitors into bookings, with your booking page built in from day one, by a team that builds high-converting sites for a living. We optimize it for both classic search (SEO) and AI answer engines (GEO), so you get found whether someone Googles you or asks ChatGPT, Gemini, or Perplexity for a recommendation.",
      points: [
        "A custom, mobile-first site with your booking page built in from day one",
        "SEO + GEO optimized: ranks on Google and surfaces in AI answers (ChatGPT, Gemini, Perplexity)",
        "Tuned for speed and conversion, so more of your visitors actually book",
      ],
    },
  ],
  included: {
    eyebrow: "Already included",
    title: "Setting up your booking page is included with every plan.",
    body: "Concierge setup of your booking page is included with every plan. These two services are separate and optional, for guest-facing businesses that also want assistance with being found. They are never a prerequisite for obtaining the core product.",
  },
};

const pt: ServicesContent = {
  meta: "Serviços done-for-you que ajudam os clientes a encontrar a sua página de reservas: otimização do Perfil de Empresa no Google, Reservar com o Google e construção de sites. A sua página de reservas continua a ser o centro.",
  hero: {
    eyebrow: "Serviços",
    headline: "Ajude os clientes a encontrar a sua página de reservas.",
    subhead:
      "Levamos os clientes certos diretamente para o seu próprio sistema de reservas, nos seus próprios termos e sem comissão pelo meio. Em vez de alugar visibilidade a um marketplace como a Fresha ou a Booksy, é encontrado através do Google, da sua marca e do passa-a-palavra, e cada cliente que conquista permanece seu.",
  },
  servicesLead:
    "A sua página de reservas é o produto principal, com instalação incluída em todos os planos. Estes dois serviços são extras opcionais que apenas trazem mais clientes até ela.",
  services: [
    {
      badge: "O ponto de partida",
      title: "Configuração do Perfil de Empresa no Google",
      body: "A forma mais rápida e económica de transformar pesquisas locais em marcações. Otimizamos o seu Perfil de Empresa no Google e ativamos o Reservar com o Google, para que, quando alguém por perto procura o que oferece, veja as suas melhores fotos, os horários corretos e um botão de Reservar que o leva diretamente ao seu sistema, nunca a um marketplace.",
      points: [
        "Perfil totalmente otimizado, que aparece nos resultados locais do Google e no Maps",
        "Reservar com o Google ativo: reservas em dois toques a partir do resultado de pesquisa",
        "Cada reserva entra no seu sistema, sem comissão e sem corte da Fresha ou da Booksy",
      ],
    },
    {
      badge: "O quadro completo",
      title: "Construímos o seu site",
      body: "Um site rápido e fiel à sua marca, criado para transformar visitantes em reservas, com a sua página de reservas integrada desde o primeiro dia, por uma equipa cujo trabalho é construir sites de alta conversão. Otimizamo-lo para a pesquisa tradicional (SEO) e para os motores de resposta com IA (GEO), para que seja encontrado tanto quando o pesquisam no Google como quando pedem uma recomendação ao ChatGPT, ao Gemini ou ao Perplexity.",
      points: [
        "Site à medida e mobile-first, com a sua página de reservas integrada desde o primeiro dia",
        "Otimizado para SEO + GEO: aparece no Google e nas respostas de IA (ChatGPT, Gemini, Perplexity)",
        "Afinado para velocidade e conversão, para que mais visitantes reservem mesmo",
      ],
    },
  ],
  included: {
    eyebrow: "Já incluído",
    title: "A instalação da sua página de reservas está incluída em todos os planos.",
    body: "A instalação concierge da sua página de reservas está incluída em todos os planos. Estes dois serviços são separados e opcionais, para negócios que vivem de reservas e que também pretendem apoio para serem encontrados. Nunca constituem um requisito para obter o produto principal.",
  },
};

export const servicesContent: Record<Locale, ServicesContent> = { en, pt };
