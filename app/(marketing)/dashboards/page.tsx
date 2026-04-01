import type { Metadata } from "next";
import { DashboardsPageView } from "@/components/marketing/dashboards/dashboards-page-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboards",
  description:
    "Review Stickman dashboard capabilities, analytics workflows, and reporting experiences in one place.",
  path: "/dashboards",
});

export default function DashboardsPage() {
  return <DashboardsPageView />;
}
