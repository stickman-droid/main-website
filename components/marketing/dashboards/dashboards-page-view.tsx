"use client"

import * as React from "react"
import { WarpField } from "./warp-field"
import { FocusGridSection } from "./focus-grid-section"
import { ProcessSection } from "@/components/marketing/onboarding/process-section"
import { WorkSection } from "@/components/marketing/home/work-section"
import { ContactSection } from "@/components/marketing/home/contact-section"

const dashboardSteps = [
  {
    num: "01",
    title: "Audit",
    desc: "We review your dashboard with fresh eyes, identifying friction, hierarchy gaps, and missed opportunities."
  },
  {
    num: "02",
    title: "Research",
    desc: "We understand how your users actually work and what they need to achieve."
  },
  {
    num: "03",
    title: "Design",
    desc: "We restructure the experience with clear hierarchy, intuitive navigation, and focused data presentation."
  },
  {
    num: "04",
    title: "Handoff",
    desc: "You get developer-ready designs and systemised components. We stay close through the build."
  }
]

import { Heading, Text, Mono } from "@/components/ui/typography"

export function DashboardsPageView() {
  return (
    <main className="relative min-h-screen bg-background">
      <section className="relative w-full overflow-hidden py-8 xl:min-h-[90vh]">
        <WarpField />

        <div className="pointer-events-none relative z-10 flex h-full flex-col px-4 pt-4 sm:px-6 lg:px-[48px] xl:px-[80px]">
          {/* Breadcrumb - Aligned with Navbar content */}
          <div className="lg:mb-18 mb-8 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <Mono>Home</Mono>
            <span className="text-zinc-200">.</span>
            <Mono>Dashboard</Mono>
          </div>

          {/* Centered Content Section */}
          <div className="flex flex-1 flex-col items-center justify-center text-center pb-24">
            <div className="max-w-[820px] space-y-10">
              <Heading
                as="h1"
                className="text-4xl font-bold text-[#3D3D3D] sm:text-5xl xl:text-[72px] leading-[1.05]"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Progress happens
                <br />
                <span className="font-heading">when Action Begins</span>
              </Heading>

              <div className="flex flex-col items-center space-y-8">
                <Text className="max-w-[680px] text-[13px] sm:text-[15px] text-zinc-500 text-left">
                  Dashboards aren&apos;t for admiring data. They&apos;re for humans making decisions, often fast and under pressure.
                  We cut the noise, surface what matters, and design every element to answer one question: what should I do next?
                </Text>
                <Text className="max-w-[680px] text-[13px] sm:text-[15px] text-zinc-500 text-left">
                  We align user needs with business goals so the interface doesn&apos;t just inform, it nudges action.
                  Less clutter, clearer thinking, better decisions and the kind of experience people actually come back to.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FocusGridSection />

      <ProcessSection
        steps={dashboardSteps}
        eyebrow="Our Process"
        title="Structured thinking. Clean execution"
      />

      <WorkSection />

      <ContactSection />
    </main>
  )
}
