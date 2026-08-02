import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/opengraph-image",
}: BuildPageMetadataInput): Metadata {
  const canonical = path || "/";
  const url = `${siteConfig.url}${canonical}`;
  const imageUrl = `${siteConfig.url}${image}`;
  const displayTitle = canonical === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: canonical === "/" ? { absolute: title } : title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "UX Design",
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${displayTitle} social preview`,
        },
      ],
    },
    twitter: {
      title: displayTitle,
      description,
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}
