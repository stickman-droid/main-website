"use client"

import * as React from "react"
import { FluidBackground } from "@/components/marketing/onboarding/fluid-background"
import { ContactSection } from "@/components/marketing/home/contact-section"
import { ProcessSection } from "@/components/marketing/onboarding/process-section"
import { FocusSection } from "@/components/marketing/onboarding/focus-section"
import { WorkSection } from "@/components/marketing/home/work-section"

export default function OnboardingPage() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-black/5 selection:text-black">
      {/* Hero Section with Fluid Background */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <FluidBackground />

        <div className="relative z-10 flex h-full w-full flex-col px-6 pt-10 sm:px-12 lg:mx-auto lg:max-w-7xl xl:mx-0 xl:max-w-none xl:px-[80px]">
          {/* Breadcrumb - Aligned with Navbar content */}
          <div className="lg:mb-0 mb-8 flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Onboarding</span>
          </div>

          {/* Centered Content Section */}
          <div className="flex flex-1 flex-col items-center justify-center text-center pb-20">
            <div className="max-w-[820px] space-y-10">
              <h1
                className="text-4xl lg:text-5xl font-bold tracking-tight text-[#252525] sm:text-6xl lg:text-[72px] leading-[1.05]"
                style={{ fontFamily: 'var(--font-heading, serif)' }}
              >
                Where Clarity Flows,<br />Users Follow
              </h1>

              <div className="flex flex-col space-y-8 items-center text-left">
                <p className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium">
                  SaaS products win when they make their value obvious from the first interaction.
                  When users instantly understand how the product helps them, they move forward with confidence instead of hesitation.
                </p>
                <p className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium">
                  We audit your entire journey to ensure it welcomes users, builds trust, and
                  guides your users directly into their first meaningful workflow.
                </p>
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
      <WorkSection />

      {/* Reused Contact CTA Section */}
      <ContactSection />
    </main>
  )
}

