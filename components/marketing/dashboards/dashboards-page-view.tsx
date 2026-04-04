"use client"

import * as React from "react"
import { ParticleHead } from "./particle-head"
import { FocusGridSection } from "./focus-grid-section"
import { ProcessSection } from "@/components/marketing/onboarding/process-section"
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

export function DashboardsPageView() {
  return (
    <main className="relative min-h-screen bg-background">
      <section className="relative w-full overflow-hidden py-8 xl:min-h-[90vh]">
        <div className="mx-auto w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Dashboard</span>
          </div>

          <div className="mt-8 grid items-center gap-8 sm:mt-0 lg:min-h-[calc(90vh-8rem)] lg:grid-cols-2 lg:gap-12">
            <div className="w-full space-y-12">
              <h1
                className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl xl:text-[72px] leading-[1.05]"
                style={{ fontFamily: "var(--font-heading, serif)" }}
              >
                Action begins
                <br />
                <span>Where searching ends</span>
              </h1>

              <div className="flex max-w-[540px] flex-col space-y-8">
                <p className="text-[15px] lg:text-[16px] xl:text-[17px] font-medium leading-relaxed text-zinc-500">
                  Dashboards are not for admiring data. They are for humans making decisions, often fast and under pressure.
                  We cut the noise, surface what matters, and design every element to answer one question: what should I do next?
                </p>
                <p className="text-[15px] lg:text-[16px] xl:text-[17px] font-medium leading-relaxed text-zinc-500">
                  We align user needs with business goals so the interface does not just inform, it nudges action.
                  Less clutter, clearer thinking, better decisions, and the kind of experience people actually come back to.
                </p>
              </div>
            </div>

            <div className="relative mx-auto hidden h-[340px] w-full sm:h-[420px] lg:block lg:h-[520px] xl:h-[580px]">
              <ParticleHead />
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

      <ContactSection />
    </main>
  )
}

