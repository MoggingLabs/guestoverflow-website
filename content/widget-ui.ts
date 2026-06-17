import type { Locale } from "@/lib/i18n-shared";

type WidgetUi = {
  progress: { date: string; party: string; time: string; details: string };
  chooseDate: string;
  chooseTime: string;
  back: string;
  yourDetails: string;
  demoOnly: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  useSampleGuest: string;
  twoLeft: string;
  bookingConfirmed: string;
  confirmationWord: string;
  dateWord: string;
  timeWord: string;
  makeAnother: string;
  wantThis: string;
  bookDemoLink: string;
  confirmingAria: string;
};

const en: WidgetUi = {
  progress: { date: "Date", party: "Party", time: "Time", details: "Details" },
  chooseDate: "Choose a date",
  chooseTime: "Choose a time",
  back: "← Back",
  yourDetails: "Your details",
  demoOnly: "Demonstration only. No data is submitted.",
  namePlaceholder: "Name",
  emailPlaceholder: "Email",
  useSampleGuest: "Use sample guest",
  twoLeft: "2 left",
  bookingConfirmed: "Booking confirmed",
  confirmationWord: "Confirmation",
  dateWord: "Date",
  timeWord: "Time",
  makeAnother: "Make another booking",
  wantThis: "Want your own booking page?",
  bookDemoLink: "Book a demo",
  confirmingAria: "Confirming your booking",
};

const pt: WidgetUi = {
  progress: { date: "Data", party: "Grupo", time: "Hora", details: "Dados" },
  chooseDate: "Escolha uma data",
  chooseTime: "Escolha uma hora",
  back: "← Voltar",
  yourDetails: "Os seus dados",
  demoOnly: "Apenas demonstração. Nenhum dado é enviado.",
  namePlaceholder: "Nome",
  emailPlaceholder: "Email",
  useSampleGuest: "Usar cliente de exemplo",
  twoLeft: "2 livres",
  bookingConfirmed: "Reserva confirmada",
  confirmationWord: "Confirmação",
  dateWord: "Data",
  timeWord: "Hora",
  makeAnother: "Fazer outra reserva",
  wantThis: "Quer a sua própria página de reservas?",
  bookDemoLink: "Marcar demonstração",
  confirmingAria: "A confirmar a sua reserva",
};

export const widgetUi: Record<Locale, WidgetUi> = { en, pt };
