import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { LocaleProvider } from "@/lib/locale-client";
import { getLocale } from "@/lib/i18n";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      description: site.description,
      url: site.url,
      operatingSystem: "Web",
    },
  ],
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <LocaleProvider locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LenisProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LenisProvider>
      <AnalyticsProvider />
    </LocaleProvider>
  );
}
