import { TermsPageView } from "@/components/marketing/legal/terms-page-view";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const termsSeo = {
  title: "Terms of Service",
  description: "Read our terms of service and conditions for using the Stickman Design website and services.",
  path: "/terms",
};

export const metadata: Metadata = buildPageMetadata({
  ...termsSeo,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(termsSeo),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/terms" },
          ]),
        ]}
      />
      <TermsPageView />
    </>
  );
}
