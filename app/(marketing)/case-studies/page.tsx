import type { Metadata } from "next";
import { CaseStudiesPageView } from "@/components/marketing/case-studies/case-studies-page-view";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.caseStudies);

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(pageSeo.caseStudies),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]),
        ]}
      />
      <CaseStudiesPageView />
    </>
  );
}
