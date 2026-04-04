import { TermsPageView } from "@/components/marketing/legal/terms-page-view";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Read our terms of service and conditions for using the Stickman.Design website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsPageView />;
}
