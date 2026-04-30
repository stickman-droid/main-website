import type { Metadata } from "next";
import { HomePageView } from "@/components/marketing/home/home-page-view";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.home);

export default function HomePage() {
  return <HomePageView />;
}
