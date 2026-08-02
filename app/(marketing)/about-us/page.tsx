import type { Metadata } from "next";
import { AboutUsPageView } from "@/components/marketing/about-us/about-us-page-view";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.aboutUs);

export default function AboutUsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(pageSeo.aboutUs),
          buildPersonJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" },
          ]),
        ]}
      />
      <AboutUsPageView />
    </>
  );
}
