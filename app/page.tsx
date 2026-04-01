import type { Metadata } from "next";
import { HomePageView } from "@/components/marketing/home/home-page-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  description:
    "Official Stickman homepage with product overview, navigation to onboarding, dashboards, case studies, and company information.",
  path: "/",
});

export default function HomePage() {
  return <HomePageView />;
}
