import { PrivacyPageView } from "@/components/marketing/legal/privacy-page-view";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const privacySeo = {
  title: "Privacy Policy",
  description: "Learn how we collect, use, and protect your information at Stickman Design.",
  path: "/privacy",
};

export const metadata: Metadata = buildPageMetadata({
  ...privacySeo,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(privacySeo),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <PrivacyPageView />
    </>
  );
}
