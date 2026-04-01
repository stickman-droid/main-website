import type { Metadata } from "next";
import { AboutUsPageView } from "@/components/marketing/about-us/about-us-page-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about Stickman's mission, team, operating principles, and the story behind the product.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return <AboutUsPageView />;
}
