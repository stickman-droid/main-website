"use client"

import * as React from "react"
import { FluidBackground } from "@/components/marketing/onboarding/fluid-background"
import { ContactSection } from "@/components/marketing/home/contact-section"
import { ProcessSection } from "@/components/marketing/onboarding/process-section"
import { FocusSection } from "@/components/marketing/onboarding/focus-section"

export default function OnboardingPage() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-black/5 selection:text-black">
      {/* Hero Section with Fluid Background */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <FluidBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 sm:px-12 sm:pt-16">
          {/* Breadcrumb - Uniform light coloring */}
          <div className="lg:mb-24 mb-12 flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Onboarding</span>
          </div>

          {/* Content Section */}
          <div className="max-w-[720px] space-y-12">
            <h1
              className="text-4xl lg:text-5xl font-bold tracking-tight text-[#3D3D3D] sm:text-6xl lg:text-[72px] leading-[1.05]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              Where Clarity Flows,<br />Users Follow
            </h1>

            <div className="flex flex-col space-y-8">
              <p className="text-[17px] leading-relaxed text-zinc-500 font-medium">
                SaaS products win when they make their value obvious from the first interaction.
                When users instantly understand how the product helps them, they move forward with confidence instead of hesitation.
              </p>
              <p className="text-[17px] leading-relaxed text-zinc-500 font-medium">
                We audit your entire journey to ensure it welcomes users, builds trust, and
                guides your users directly into their first meaningful workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Focus Section */}
      <FocusSection />

      {/* Reused Contact CTA Section */}
      <ContactSection />
    </main>
  )
}

