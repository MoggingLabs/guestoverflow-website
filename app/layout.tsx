import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Online booking for your own website`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  verification: {
    google: "U7JuW6H97aHayUyOGVieHWoOd2lnacehc5P-oJ9livg",
  },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  // Disable browser auto-translate site-wide: language is controlled by the
  // in-app toggle (and Accept-Language on first visit). See lib/i18n.ts.
  other: { google: "notranslate" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getLocale } = await import("@/lib/i18n");
  const locale = await getLocale();

  return (
    <html
      lang={locale === "pt" ? "pt-PT" : "en"}
      translate="no"
      className={`${satoshi.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
