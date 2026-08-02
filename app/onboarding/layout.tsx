import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { pageSeo } from "@/lib/page-seo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.onboarding);

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd(pageSeo.onboarding),
          buildServiceJsonLd({
            name: "SaaS Onboarding UX Redesign",
            description: pageSeo.onboarding.description,
            path: pageSeo.onboarding.path,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Onboarding", path: "/onboarding" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
