import type { Metadata } from "next";
import { DashboardsPageView } from "@/components/marketing/dashboards/dashboards-page-view";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.dashboards);

export default function DashboardsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(pageSeo.dashboards),
          buildServiceJsonLd({
            name: "SaaS Dashboard UX Redesign",
            description: pageSeo.dashboards.description,
            path: pageSeo.dashboards.path,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Dashboards", path: "/dashboards" },
          ]),
        ]}
      />
      <DashboardsPageView />
    </>
  );
}
