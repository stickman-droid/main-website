const fallbackUrl = "https://stickman.design";

export const siteConfig = {
  name: "Stickman Design",
  description:
    "We design onboarding flows and SaaS dashboards that users understand instantly—reducing drop-offs, improving activation, and making complex products feel simple.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
} as const;
