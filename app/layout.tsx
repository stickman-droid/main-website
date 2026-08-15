import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Kode_Mono } from "next/font/google";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { AnalyticsRoot } from "@/analytics/provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  JsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const kodeMono = Kode_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "UX Design",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${kodeMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-heading: ${fraunces.style.fontFamily};
            --font-mono: ${kodeMono.style.fontFamily};
          }
        `}} />
      </head>
      <body className="min-h-full flex flex-col pb-28 lg:pb-0">
        <TooltipProvider>
          <AnalyticsRoot />
          <Header />
          <main className="flex-1">
            <JsonLd data={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
