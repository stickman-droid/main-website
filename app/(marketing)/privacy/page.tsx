import { PrivacyPageView } from "@/components/marketing/legal/privacy-page-view";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Learn how we collect, use, and protect your information at Stickman.Design.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyPageView />;
}
