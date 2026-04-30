import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { ComponentProps } from "react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about-us", label: "About Us" },
];

const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://www.instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.youtube.com", label: "YouTube", icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full pb-0 pt-12 sm:pb-0">
      <div className="flex w-full flex-col gap-6 bg-[#FCFCFC] px-4 pt-4 sm:py-8 text-[#252525] sm:px-6 lg:px-[80px]">

        {/* Brand */}
        <div className="flex justify-center md:justify-start">
          <Link href="/">
            <Image
              src="/stickman_design_logo.svg"
              alt="Stickman Design"
              width={200}
              height={22}
              className="h-auto w-[180px] sm:w-[200px]"
            />
          </Link>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col items-center gap-5 md:hidden">
          <nav className="flex flex-col items-center gap-4 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-black/20 hover:bg-black/5"
              >
                <Icon className="size-[18px]" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden flex-col gap-6 md:flex md:flex-row md:items-start md:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:justify-end">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-black/20 hover:bg-black/5"
              >
                <Icon className="size-[18px]" />
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* ── MOBILE copyright block ── */}
        <div className="flex flex-col items-center gap-2 text-sm text-[#8e8e8e] md:hidden">
          <div className="font-mono">© 2026 Stickman.Design</div>
          <div className="flex items-center gap-1.5 font-mono">
            <Link href="/privacy" className="transition-colors hover:text-black">Privacy Policy</Link>
            <span className="text-black/20">|</span>
            <Link href="/terms" className="transition-colors hover:text-black">Terms of Use</Link>
          </div>
          <div className="font-mono">All rights reserved.</div>
        </div>

        {/* ── DESKTOP copyright block ── */}
        <div className="hidden flex-col gap-3 text-sm text-[#8e8e8e] md:flex md:flex-row md:items-center md:justify-between">
          <div className="font-mono">© 2026 Stickman.Design</div>
          <div className="flex items-center gap-1.5 text-left font-mono md:text-center">
            <Link href="/privacy" className="transition-colors hover:text-black">Privacy Policy</Link>
            <span className="text-black/10">|</span>
            <Link href="/terms" className="transition-colors hover:text-black">Terms of Use</Link>
          </div>
          <div className="font-mono md:text-right">All rights reserved.</div>
        </div>

        {/* Faded tagline
        <div className="text-center text-sm font-medium text-[#252525]/20 md:text-left">
          Making Digital Products For Humans
        </div> */}

      </div>
    </footer>
  );
}


function LinkedInIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.02 2.02 0 0 0 3.2 5.02 2.03 2.03 0 0 0 5.25 7.1a2.03 2.03 0 0 0 2.06-2.08A2.02 2.02 0 0 0 5.25 3ZM20.8 12.9c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.72c.04.79 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.02 1.88 2.52V20h3.38l.02-7.1Z" />
    </svg>
  );
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.75A3 3 0 0 0 4.75 7.75v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-8.5a3 3 0 0 0-3-3h-8.5Zm8.88 1.31a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12ZM12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 1.75A3 3 0 1 0 15 12a3 3 0 0 0-3-3Z" />
    </svg>
  );
}

function YouTubeIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.45 7.1a2.84 2.84 0 0 0-2-2C17.65 4.5 12 4.5 12 4.5s-5.65 0-7.45.6a2.84 2.84 0 0 0-2 2A29.85 29.85 0 0 0 2 12a29.85 29.85 0 0 0 .55 4.9 2.84 2.84 0 0 0 2 2c1.8.6 7.45.6 7.45.6s5.65 0 7.45-.6a2.84 2.84 0 0 0 2-2A29.85 29.85 0 0 0 22 12a29.85 29.85 0 0 0-.55-4.9ZM10.2 15.25v-6.5L15.8 12l-5.6 3.25Z" />
    </svg>
  );
}
