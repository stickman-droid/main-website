import type { Metadata } from "next";
import { DashboardsPageView } from "@/components/marketing/dashboards/dashboards-page-view";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.dashboards);

export default function DashboardsPage() {
  return <DashboardsPageView />;
}
