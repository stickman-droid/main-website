"use client"

import * as React from "react"
import Link from "next/link"
import { FluidBackground } from "@/components/marketing/onboarding/fluid-background"
import { ContactSection } from "@/components/marketing/home/contact-section"
import { ProcessSection } from "@/components/marketing/onboarding/process-section"
import { FocusSection } from "@/components/marketing/onboarding/focus-section"
import { WorkSection } from "@/components/marketing/home/work-section"

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-black/5 selection:text-black">
      {/* Hero Section with Fluid Background */}
      <section data-analytics-section="onboarding_hero" className="relative w-full min-h-[90vh] overflow-hidden pt-8 lg:pt-0">
        <FluidBackground />

        <div className="relative z-10 flex h-full w-full flex-col px-6 pt-2 sm:px-12 lg:pt-10 lg:mx-auto lg:max-w-7xl xl:mx-0 xl:max-w-none xl:px-[80px]">
          {/* Breadcrumb - Aligned with Navbar content */}
          <nav
            className="mb-6 lg:mb-12 flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase"
            aria-label="Breadcrumb"
          >
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Onboarding</span>
          </nav>

          {/* Centered Content Section */}
          <div className="flex flex-1 flex-col items-center justify-center text-center pb-10 lg:pb-16">
            <div className="max-w-[820px] space-y-10">
              <h1
                className="text-4xl lg:text-5xl font-bold tracking-tight text-[#252525] sm:text-6xl lg:text-[72px] leading-[1.05]"
                style={{ fontFamily: 'var(--font-heading, serif)' }}
              >
                Where Clarity Flows,<br />Users Follow
              </h1>

              <div className="flex flex-col space-y-8 items-center text-center">
                <p className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium">
                  SaaS products win when they make their value obvious from the first interaction.
                  When users instantly understand how the product helps them, they move forward with confidence instead of hesitation.
                </p>
                <p className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium">
                  We audit your entire journey to ensure it welcomes users, builds trust, and
                  guides your users directly into their first meaningful workflow.
                </p>

                {/* CTA */}
                <div className="flex flex-col items-center gap-3">
                  <Link
                    href="https://cal.eu/savio"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[6px] bg-[#1C1C1C] px-8 text-sm font-medium text-white transition-colors hover:bg-[#3775E9] sm:h-12 sm:px-10 sm:text-base"
                  >
                    Book a Free Strategy Call
                  </Link>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '14px',
                      lineHeight: '160%',
                      letterSpacing: '0.2%',
                      color: '#3D3D3D',
                      textAlign: 'center',
                    }}
                  >
                    Let&apos;s connect over a quick 15 min call at your convenience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <FocusSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Selected Work Section */}
      <WorkSection category="Onboarding" />

      {/* Reused Contact CTA Section */}
      <ContactSection />
    </div>
  )
}

