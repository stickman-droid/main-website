import type { Metadata } from "next";
import { CaseStudiesPageView } from "@/components/marketing/case-studies/case-studies-page-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description:
    "Explore customer stories, implementation outcomes, and measurable business impact from Stickman.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudiesPageView />;
}
