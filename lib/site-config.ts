const fallbackUrl = "https://www.stickman.com";

export const siteConfig = {
  name: "Stickman",
  description:
    "Stickman website for product onboarding, dashboards, case studies, and company information.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
} as const;
