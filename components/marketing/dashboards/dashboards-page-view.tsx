
import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
const WarpField = dynamic(() => import("./warp-field").then(mod => mod.WarpField))
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
      <section data-analytics-section="dashboards_hero" className="relative w-full overflow-hidden py-8 lg:min-h-[90vh]">
        <WarpField />

        <div className="pointer-events-none relative z-10 flex h-full flex-col px-4 pt-2 sm:px-6 sm:pt-4 lg:px-[48px] lg:pt-4 xl:px-[80px]">
          {/* Breadcrumb - Aligned with Navbar content */}
          <div className="mb-6 lg:mb-12 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-[#8e8e8e] uppercase">
            <Mono>Home</Mono>
            <span className="text-zinc-200">.</span>
            <Mono>Dashboard</Mono>
          </div>

          {/* Centered Content Section */}
          <div className="flex flex-1 flex-col items-center justify-center text-center pb-10 lg:pb-28">
            <div className="max-w-[820px] space-y-10">
              <Heading
                as="h1"
                className="text-4xl font-bold text-[#252525] sm:text-5xl xl:text-[72px] leading-[1.05]"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Progress Happens
                <br />
                <span className="font-heading">When Action Begins</span>
              </Heading>

              <div className="flex flex-col items-center space-y-8">
                <Text className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium text-center">
                  Dashboards aren&apos;t for admiring data. They&apos;re for humans making decisions, often fast and under pressure.
                  We cut the noise, surface what matters, and design every element to answer one question: what should I do next?
                </Text>
                <Text className="max-w-[680px] text-[18px] leading-relaxed text-zinc-500 font-medium text-center">
                  We align user needs with business goals so the interface doesn&apos;t just inform, it nudges action.
                  Less clutter, clearer thinking, better decisions and the kind of experience people actually come back to.
                </Text>

                {/* CTA */}
                <div className="pointer-events-auto flex flex-col items-center gap-3">
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

      <FocusGridSection />

      <ProcessSection
        steps={dashboardSteps}
        eyebrow="Our Process"
        title="Structured thinking. Clean execution"
      />

      <WorkSection category="Dashboard" />

      <ContactSection />
    </main>
  )
}
