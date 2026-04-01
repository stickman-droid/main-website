import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/onboarding",
  "/dashboards",
  "/case-studies",
  "/about-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
