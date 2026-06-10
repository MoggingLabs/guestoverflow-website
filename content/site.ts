import type { NavLink } from "@/types/content";

export const site = {
  name: "GuestFlow",
  tagline: "Booking that belongs on your website.",
  description:
    "GuestFlow is a white-label reservation system for restaurants, hotels, spas, and experiences — designed into your site, matched to your brand, with every guest relationship staying yours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://guestflow-website.vercel.app",
  email: "hello@guestflow.app",
  company: "MoggingLabs",
  cta: {
    primary: { label: "Book a demo", href: "/book-a-demo" },
    secondary: { label: "Try the live demo", href: "/#live-demo" },
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
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
];
