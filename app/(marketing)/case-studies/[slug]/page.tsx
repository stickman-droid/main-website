import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CaseStudyDetailPageView,
  type CaseStudy,
} from "@/components/marketing/case-studies/case-study-detail-page-view";
import {
  caseStudySlugs,
  getCaseStudyBySlug,
} from "@/lib/case-studies-data";
import { caseStudySeoBySlug } from "@/lib/page-seo";
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

  const seoEntry = caseStudySeoBySlug[caseStudy.slug as keyof typeof caseStudySeoBySlug];

  return buildPageMetadata({
    title: seoEntry?.title ?? caseStudy.title,
    description: seoEntry?.description ?? caseStudy.description,
    path: seoEntry?.path ?? `/case-studies/${caseStudy.slug}`,
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

  return <CaseStudyDetailPageView caseStudy={caseStudy as CaseStudy} />;
}
