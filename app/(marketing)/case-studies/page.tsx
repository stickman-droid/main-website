import type { Metadata } from "next";
import { CaseStudiesPageView } from "@/components/marketing/case-studies/case-studies-page-view";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.caseStudies);

export default function CaseStudiesPage() {
  return <CaseStudiesPageView />;
}
