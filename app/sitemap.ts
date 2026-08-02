import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudySlugs } from "@/lib/case-studies-data";

const staticRoutes = [
  {
    route: "",
    lastModified: "2026-07-22",
    changeFrequency: "monthly" as const,
    priority: 1,
  },
  {
    route: "/onboarding",
    lastModified: "2026-07-22",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    route: "/dashboards",
    lastModified: "2026-07-22",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    route: "/case-studies",
    lastModified: "2026-07-22",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    route: "/about-us",
    lastModified: "2026-07-22",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    route: "/privacy",
    lastModified: "2026-04-04",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    route: "/terms",
    lastModified: "2026-04-04",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((entry) => ({
    url: `${siteConfig.url}${entry.route}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const caseStudyEntries = caseStudySlugs.map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified: new Date("2026-07-22"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries];
}
