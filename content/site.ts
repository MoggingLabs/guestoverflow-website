import type { NavLink } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

/** Locale-independent site facts (URLs, identity, default metadata). */
export const site = {
  name: "Guest Overflow",
  tagline: "Booking that belongs on your website.",
  description:
    "Guest Overflow is a white-label reservation system for restaurants, hotels, spas, salons, and experiences. We design it into your own website, matched to your brand, and every guest relationship stays yours.",
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
};

const en: SiteStrings = {
  cta: {
    primary: { label: "Book a demo", href: "/book-a-demo" },
    secondary: { label: "Try the live demo", href: "/#live-demo" },
    tertiary: { label: "Start free", href: "/book-a-demo?intent=trial" },
  },
  navLinks: [
    { label: "Product", href: "/product" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  navDemoShort: "Demo",
  footerColumns: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/product" },
        { label: "Live demo", href: "/#live-demo" },
        { label: "Pricing", href: "/pricing" },
        { label: "Savings calculator", href: "/pricing/calculator" },
        { label: "Our promises", href: "/promises" },
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
    "White-label online booking for restaurants, hotels, spas, salons, and experiences.",
  footerProductOf: "all rights reserved",
};

const pt: SiteStrings = {
  cta: {
    primary: { label: "Marcar demonstração", href: "/book-a-demo" },
    secondary: { label: "Experimentar a demo", href: "/#live-demo" },
    tertiary: { label: "Começar grátis", href: "/book-a-demo?intent=trial" },
  },
  navLinks: [
    { label: "Produto", href: "/product" },
    { label: "Setores", href: "/industries" },
    { label: "Preços", href: "/pricing" },
    { label: "Sobre nós", href: "/about" },
  ],
  navDemoShort: "Demo",
  footerColumns: [
    {
      heading: "Produto",
      links: [
        { label: "Funcionalidades", href: "/product" },
        { label: "Demo ao vivo", href: "/#live-demo" },
        { label: "Preços", href: "/pricing" },
        { label: "Calculadora de poupança", href: "/pricing/calculator" },
        { label: "As nossas promessas", href: "/promises" },
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
        { label: "Marcar demonstração", href: "/book-a-demo" },
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
    "Reservas online white-label para restaurantes, hotéis, spas, cabeleireiros e experiências.",
  footerProductOf: "todos os direitos reservados",
};

export const siteStrings: Record<Locale, SiteStrings> = { en, pt };

/** English fallbacks kept for callers that are intentionally EN-only. */
export const navLinks = en.navLinks;
export const footerColumns = en.footerColumns;
