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
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
} from "@/lib/json-ld";
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
    type: "article",
    image: caseStudy.heroImage.image,
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

  const seoEntry = caseStudySeoBySlug[caseStudy.slug as keyof typeof caseStudySeoBySlug];
  const path = seoEntry?.path ?? `/case-studies/${caseStudy.slug}`;

  return (
    <>
      <JsonLd
        data={[
          buildCreativeWorkJsonLd({
            title: seoEntry?.title ?? caseStudy.title,
            description: seoEntry?.description ?? caseStudy.description,
            path,
            image: caseStudy.heroImage.image,
            tags: caseStudy.tags,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: caseStudy.title, path },
          ]),
        ]}
      />
      <CaseStudyDetailPageView caseStudy={caseStudy as CaseStudy} />
    </>
  );
}
