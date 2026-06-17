import type { NavLink } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

/** Locale-independent site facts (URLs, identity, default metadata). */
export const site = {
  name: "Guest Overflow",
  tagline: "Your own booking page, built around how your salon runs.",
  description:
    "Guest Overflow gives each salon and barbershop its own booking page, built around how they run, branded as theirs. Flat pricing, no commission, and every client relationship remains yours. For salons and barbershops.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://guestoverflow.com",
  email: "hello@guestoverflow.com",
  cta: {
    primary: { label: "Book a demo", href: "/book-a-demo" },
    secondary: { label: "Try the live demo", href: "/#live-demo" },
    tertiary: { label: "Start free", href: "/book-a-demo?intent=trial" },
  },
} as const;

type SiteStrings = {
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    tertiary: { label: string; href: string };
  };
  navLinks: NavLink[];
  navDemoShort: string;
  footerColumns: { heading: string; links: NavLink[] }[];
  footerBlurb: string;
  footerProductOf: string;
  footerNote: string;
};

const en: SiteStrings = {
  cta: {
    primary: { label: "Book a demo", href: "/book-a-demo" },
    secondary: { label: "Try the live demo", href: "/#live-demo" },
    tertiary: { label: "Start free", href: "/book-a-demo?intent=trial" },
  },
  navLinks: [
    { label: "Booking page", href: "/product" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  navDemoShort: "Demo",
  footerColumns: [
    {
      heading: "Product",
      links: [
        { label: "Booking page", href: "/product" },
        { label: "Live demo", href: "/#live-demo" },
        { label: "Pricing", href: "/pricing" },
        { label: "Savings calculator", href: "/pricing/calculator" },
        { label: "Our promises", href: "/promises" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Google Business Profile", href: "/services" },
        { label: "Website build", href: "/services" },
      ],
    },
    {
      heading: "Industries",
      links: [
        { label: "Restaurants", href: "/industries/restaurants" },
        { label: "Hotels", href: "/industries/hotels" },
        { label: "Spas & wellness", href: "/industries/spas-wellness" },
        { label: "Tours & experiences", href: "/industries/tours-experiences" },
        { label: "Salons & barbers", href: "/industries/salons-barbers" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Compare", href: "/compare" },
        { label: "Switch from Quandoo", href: "/quandoo" },
        { label: "Book a demo", href: "/book-a-demo" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  footerBlurb:
    "Branded online booking for salons and barbershops.",
  footerProductOf: "all rights reserved",
  footerNote: "No commission · No surprise fees · Your data is yours.",
};

const pt: SiteStrings = {
  cta: {
    primary: { label: "Marcar demo", href: "/book-a-demo" },
    secondary: { label: "Experimentar a demo", href: "/#live-demo" },
    tertiary: { label: "Começar grátis", href: "/book-a-demo?intent=trial" },
  },
  navLinks: [
    { label: "Página de reservas", href: "/product" },
    { label: "Serviços", href: "/services" },
    { label: "Preços", href: "/pricing" },
    { label: "Sobre nós", href: "/about" },
  ],
  navDemoShort: "Demo",
  footerColumns: [
    {
      heading: "Produto",
      links: [
        { label: "Página de reservas", href: "/product" },
        { label: "Demo ao vivo", href: "/#live-demo" },
        { label: "Preços", href: "/pricing" },
        { label: "Calculadora de poupança", href: "/pricing/calculator" },
        { label: "As nossas promessas", href: "/promises" },
      ],
    },
    {
      heading: "Serviços",
      links: [
        { label: "Perfil de Empresa no Google", href: "/services" },
        { label: "Construção de site", href: "/services" },
      ],
    },
    {
      heading: "Setores",
      links: [
        { label: "Restaurantes", href: "/industries/restaurants" },
        { label: "Hotéis", href: "/industries/hotels" },
        { label: "Spas e bem-estar", href: "/industries/spas-wellness" },
        { label: "Tours e experiências", href: "/industries/tours-experiences" },
        { label: "Cabeleireiros e barbearias", href: "/industries/salons-barbers" },
      ],
    },
    {
      heading: "Empresa",
      links: [
        { label: "Sobre nós", href: "/about" },
        { label: "Comparar", href: "/compare" },
        { label: "Mudar do Quandoo", href: "/quandoo" },
        { label: "Marcar demo", href: "/book-a-demo" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacidade", href: "/privacy" },
        { label: "Termos", href: "/terms" },
      ],
    },
  ],
  footerBlurb:
    "Reservas online com a sua marca para cabeleireiros e barbearias.",
  footerProductOf: "todos os direitos reservados",
  footerNote: "Sem comissões · Sem taxas-surpresa · Os seus dados são seus.",
};

export const siteStrings: Record<Locale, SiteStrings> = { en, pt };

/** English fallbacks kept for callers that are intentionally EN-only. */
export const navLinks = en.navLinks;
export const footerColumns = en.footerColumns;
