import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPageView } from "@/components/marketing/case-studies/case-study-detail-page-view";
import {
  caseStudySlugs,
  getCaseStudyBySlug,
} from "@/lib/case-studies-data";
import { buildPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return buildPageMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      path: "/case-studies",
    });
  }

  return buildPageMetadata({
    title: caseStudy.title,
    description: caseStudy.description,
    path: `/case-studies/${caseStudy.slug}`,
  });
}

export default async function CaseStudyDetailPage(
  props: PageProps<"/case-studies/[slug]">
) {
  const { slug } = await props.params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailPageView caseStudy={caseStudy as any} />;
}
