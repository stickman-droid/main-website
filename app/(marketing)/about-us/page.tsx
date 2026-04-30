import type { Metadata } from "next";
import { AboutUsPageView } from "@/components/marketing/about-us/about-us-page-view";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.aboutUs);

export default function AboutUsPage() {
  return <AboutUsPageView />;
}
