import type { MetadataRoute } from "next";
import { industrySlugs } from "@/content/industries";
import { competitorSlugs } from "@/content/compare";
import { site } from "@/content/site";
import { SHOW_CALCULATOR } from "@/lib/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/product",
    "/industries",
    "/services",
    "/pricing",
    ...(SHOW_CALCULATOR ? ["/pricing/calculator"] : []),
    "/compare",
    "/promises",
    // "/quandoo" — stashed with the off-vertical (restaurant) campaigns
    "/about",
    "/book-a-demo",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/book-a-demo" ? 0.9 : 0.7,
  }));

  const industryRoutes = industrySlugs.map((slug) => ({
    url: `${site.url}/industries/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const sectorPricingRoutes = industrySlugs.map((slug) => ({
    url: `${site.url}/pricing/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const compareRoutes = competitorSlugs.map((slug) => ({
    url: `${site.url}/compare/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...sectorPricingRoutes,
    ...compareRoutes,
  ];
}
