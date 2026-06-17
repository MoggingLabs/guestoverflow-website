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
  services: Service[];
  included: { eyebrow: string; title: string; body: string };
};

const en: ServicesContent = {
  meta: "Done-for-you services that help clients find your booking page: Google Business Profile optimization, Reserve with Google, and full website builds. Your booking page remains the core.",
  hero: {
    eyebrow: "Services",
    headline: "Help clients find your booking page.",
    subhead:
      "We cannot manufacture demand the way a marketplace like Fresha or Booksy does, and we will not claim otherwise. What we do is help the right clients find your salon on your own terms, and then direct them straight to your booking page, with no commission in between.",
  },
  services: [
    {
      badge: "The starting point",
      title: "Google Business Profile setup",
      body: "The fastest and most affordable way to start taking bookings. We optimize your Google Business Profile and activate Reserve with Google, so clients searching for a salon or barber nearby see the correct photos and hours, along with a Book button that leads directly to you.",
      points: [
        "Google Business Profile optimization",
        "Reserve with Google turned on",
        "Book direct from Google and Maps, with no marketplace cut",
      ],
    },
    {
      badge: "The full picture",
      title: "We build your website",
      body: "When you want a home of your own on the web, we design and build a full website with your booking page built in from day one, delivered by a team that builds high-converting sites professionally.",
      points: [
        "A full custom website, designed and built for you",
        "Your booking page built in from day one",
        "Built to be found and to convert",
      ],
    },
  ],
  included: {
    eyebrow: "Already included",
    title: "Setting up your booking page is included with every plan.",
    body: "Concierge setup of your booking page is included with every plan. These two services are separate and optional, for salons and barbershops that also want assistance with being found. They are never a prerequisite for obtaining the core product.",
  },
};

const pt: ServicesContent = {
  meta: "Serviços done-for-you que ajudam os clientes a encontrar a sua página de reservas: otimização do Perfil de Empresa no Google, Reservar com o Google e construção de sites. A sua página de reservas continua a ser o centro.",
  hero: {
    eyebrow: "Serviços",
    headline: "Ajude os clientes a encontrar a sua página de reservas.",
    subhead:
      "Não conseguimos gerar procura como um marketplace como a Fresha ou a Booksy, e não pretendemos afirmar o contrário. O que fazemos é ajudar os clientes certos a encontrar o seu salão nos seus próprios termos, e encaminhá-los diretamente para a sua página de reservas, sem comissão pelo meio.",
  },
  services: [
    {
      badge: "O ponto de partida",
      title: "Configuração do Perfil de Empresa no Google",
      body: "A forma mais rápida e acessível de começar a receber marcações. Otimizamos o seu Perfil de Empresa no Google e ativamos o Reservar com o Google, para que quem procura um salão ou uma barbearia por perto veja as fotos e horários corretos, bem como um botão de Reservar que conduz diretamente a si.",
      points: [
        "Otimização do Perfil de Empresa no Google",
        "Reservar com o Google ativado",
        "Reservas diretas no Google e no Maps, sem comissão de marketplace",
      ],
    },
    {
      badge: "O quadro completo",
      title: "Construímos o seu site",
      body: "Quando quiser uma casa própria na internet, desenhamos e construímos um site completo com a sua página de reservas integrada desde o primeiro dia, por uma equipa que constrói sites de alta conversão profissionalmente.",
      points: [
        "Um site completo à medida, desenhado e construído por nós",
        "A sua página de reservas integrada desde o primeiro dia",
        "Feito para ser encontrado e para converter",
      ],
    },
  ],
  included: {
    eyebrow: "Já incluído",
    title: "A instalação da sua página de reservas está incluída em todos os planos.",
    body: "A instalação concierge da sua página de reservas está incluída em todos os planos. Estes dois serviços são separados e opcionais, para salões e barbearias que também pretendem apoio para serem encontrados. Nunca constituem um requisito para obter o produto principal.",
  },
};

export const servicesContent: Record<Locale, ServicesContent> = { en, pt };
