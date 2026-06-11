import type { NavLink } from "@/types/content";
import type { Locale } from "@/lib/i18n-shared";

/** Locale-independent site facts (URLs, identity, default metadata). */
export const site = {
  name: "Guest Overflow",
  tagline: "Booking that belongs on your website.",
  description:
    "Guest Overflow is a white-label reservation system for restaurants, hotels, spas, and experiences. We design it into your own website, matched to your brand, and every guest relationship stays yours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://guestoverflow-website.vercel.app",
  email: "hello@guestoverflow.app",
  company: "MoggingLabs",
  cta: {
    primary: { label: "Book a demo", href: "/book-a-demo" },
    secondary: { label: "Try the live demo", href: "/#live-demo" },
  },
} as const;

type SiteStrings = {
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
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
      ],
    },
    {
      heading: "Industries",
      links: [
        { label: "Restaurants", href: "/industries/restaurants" },
        { label: "Hotels", href: "/industries/hotels" },
        { label: "Spas & wellness", href: "/industries/spas-wellness" },
        { label: "Tours & experiences", href: "/industries/tours-experiences" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
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
    "White-label online booking for restaurants, hotels, spas, and experiences.",
  footerProductOf: "a MoggingLabs product",
};

const pt: SiteStrings = {
  cta: {
    primary: { label: "Marcar demonstração", href: "/book-a-demo" },
    secondary: { label: "Experimentar a demo", href: "/#live-demo" },
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
      ],
    },
    {
      heading: "Setores",
      links: [
        { label: "Restaurantes", href: "/industries/restaurants" },
        { label: "Hotéis", href: "/industries/hotels" },
        { label: "Spas e bem-estar", href: "/industries/spas-wellness" },
        { label: "Tours e experiências", href: "/industries/tours-experiences" },
      ],
    },
    {
      heading: "Empresa",
      links: [
        { label: "Sobre nós", href: "/about" },
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
    "Reservas online white-label para restaurantes, hotéis, spas e experiências.",
  footerProductOf: "um produto MoggingLabs",
};

export const siteStrings: Record<Locale, SiteStrings> = { en, pt };

/** English fallbacks kept for callers that are intentionally EN-only. */
export const navLinks = en.navLinks;
export const footerColumns = en.footerColumns;
