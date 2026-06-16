import type { Locale } from "@/lib/i18n-shared";
import { businessTypes, webPresences } from "@/lib/validations";

type FormStrings = {
  fullName: string;
  workEmail: string;
  businessName: string;
  businessType: string;
  chooseOne: string;
  whatKind: string;
  whatKindPlaceholder: string;
  whereGuests: string;
  selectAll: string;
  whenCall: string;
  optional: string;
  pickDay: string;
  slotsHelper: string;
  anythingElse: string;
  anythingPlaceholder: string;
  submit: string;
  sending: string;
  genericError: string;
  /** Display labels for stored EN values. */
  businessTypeLabels: Record<(typeof businessTypes)[number], string>;
  webPresenceLabels: Record<(typeof webPresences)[number], string>;
  errors: {
    name: string;
    email: string;
    businessName: string;
    businessType: string;
    businessTypeOther: string;
    message: string;
  };
  success: {
    title: string;
    body: string;
    meanwhile: string;
    tryDemo: string;
  };
};

const en: FormStrings = {
  fullName: "Full name",
  workEmail: "Work email",
  businessName: "Business name",
  businessType: "Business type",
  chooseOne: "Choose one…",
  whatKind: "What kind of business is it?",
  whatKindPlaceholder: "e.g. cooking school, gallery, co-working space…",
  whereGuests: "Where can guests find you today?",
  selectAll: "Optional, select all that apply",
  whenCall: "When would you like your demo call?",
  optional: "Optional",
  pickDay: "Pick a day that suits you. It's a relaxed 20-minute video call.",
  slotsHelper:
    "Now select every time that works for you, as many as you like. Free from 3 to 4? Pick 15:00 and 15:30.",
  anythingElse: "Anything we should know?",
  anythingPlaceholder: "Current booking setup, website platform, busiest nights…",
  submit: "Request my demo",
  sending: "Sending…",
  genericError: "Something went wrong. Please try again or email us.",
  businessTypeLabels: {
    Restaurant: "Restaurant",
    Hotel: "Hotel",
    "Spa & wellness": "Spa & wellness",
    "Tours & experiences": "Tours & experiences",
    Salon: "Salon",
    Other: "Other",
  },
  webPresenceLabels: {
    "My own website": "My own website",
    "Google Business Profile / Maps": "Google Business Profile / Maps",
    Instagram: "Instagram",
    Facebook: "Facebook",
    TikTok: "TikTok",
    "Booking platforms (TheFork, OpenTable, Booking.com…)":
      "Booking platforms (TheFork, OpenTable, Booking.com…)",
    "Quandoo (closing in 2026)": "Quandoo (closing in 2026)",
    TripAdvisor: "TripAdvisor",
    "Phone / WhatsApp": "Phone / WhatsApp",
    "Walk-ins & word of mouth": "Walk-ins & word of mouth",
    "Nothing yet, starting from scratch": "Nothing yet, starting from scratch",
  },
  errors: {
    name: "Please enter your name",
    email: "Please enter a valid work email",
    businessName: "Please enter your business name",
    businessType: "Please choose your business type",
    businessTypeOther: "Please tell us what kind of business it is",
    message: "Please keep it under 2000 characters",
  },
  success: {
    title: "Request received",
    body: "We'll confirm your demo slot within one business day. Check your inbox for a confirmation email.",
    meanwhile: "Meanwhile,",
    tryDemo: "try the live booking demo",
  },
};

const pt: FormStrings = {
  fullName: "Nome completo",
  workEmail: "Email profissional",
  businessName: "Nome do negócio",
  businessType: "Tipo de negócio",
  chooseOne: "Escolha um…",
  whatKind: "Que tipo de negócio é?",
  whatKindPlaceholder: "ex.: escola de cozinha, galeria, espaço de cowork…",
  whereGuests: "Onde é que os clientes o encontram hoje?",
  selectAll: "Opcional, selecione todos os que se aplicam",
  whenCall: "Quando prefere a chamada de demonstração?",
  optional: "Opcional",
  pickDay: "Escolha um dia que lhe dê jeito. É uma videochamada descontraída de 20 minutos.",
  slotsHelper:
    "Agora selecione todas as horas que lhe servem, as que quiser. Livre das 15 às 16? Escolha 15:00 e 15:30.",
  anythingElse: "Algo que devamos saber?",
  anythingPlaceholder: "Como recebe reservas hoje, plataforma do site, noites mais cheias…",
  submit: "Pedir a minha demonstração",
  sending: "A enviar…",
  genericError: "Algo correu mal. Tente novamente ou envie-nos um email.",
  businessTypeLabels: {
    Restaurant: "Restaurante",
    Hotel: "Hotel",
    "Spa & wellness": "Spa e bem-estar",
    "Tours & experiences": "Tours e experiências",
    Salon: "Salão / barbearia",
    Other: "Outro",
  },
  webPresenceLabels: {
    "My own website": "Site próprio",
    "Google Business Profile / Maps": "Perfil de Empresa no Google / Maps",
    Instagram: "Instagram",
    Facebook: "Facebook",
    TikTok: "TikTok",
    "Booking platforms (TheFork, OpenTable, Booking.com…)":
      "Plataformas de reservas (TheFork, OpenTable, Booking.com…)",
    "Quandoo (closing in 2026)": "Quandoo (encerra em 2026)",
    TripAdvisor: "TripAdvisor",
    "Phone / WhatsApp": "Telefone / WhatsApp",
    "Walk-ins & word of mouth": "Passa-palavra e clientes de porta",
    "Nothing yet, starting from scratch": "Ainda nada, a começar do zero",
  },
  errors: {
    name: "Indique o seu nome",
    email: "Indique um email profissional válido",
    businessName: "Indique o nome do negócio",
    businessType: "Escolha o tipo de negócio",
    businessTypeOther: "Diga-nos que tipo de negócio é",
    message: "Mantenha a mensagem abaixo de 2000 caracteres",
  },
  success: {
    title: "Pedido recebido",
    body: "Confirmamos o horário da sua demonstração no prazo de um dia útil. Verifique a sua caixa de entrada.",
    meanwhile: "Entretanto,",
    tryDemo: "experimente a demo de reservas ao vivo",
  },
};

export const formStrings: Record<Locale, FormStrings> = { en, pt };
