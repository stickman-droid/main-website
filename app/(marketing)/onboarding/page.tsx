import type { Metadata } from "next";
import { OnboardingPageView } from "@/components/marketing/onboarding/onboarding-page-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Onboarding",
  description:
    "See how Stickman onboarding works, from account setup through activation and first-value milestones.",
  path: "/onboarding",
});

export default function OnboardingPage() {
  return <OnboardingPageView />;
}
