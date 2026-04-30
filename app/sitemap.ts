import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudySlugs } from "@/lib/case-studies-data";

const staticRoutes = [
  "",
  "/onboarding",
  "/dashboards",
  "/case-studies",
  "/about-us",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudyEntries = caseStudySlugs.map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries];
}
