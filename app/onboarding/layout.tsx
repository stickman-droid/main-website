import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.onboarding);

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
