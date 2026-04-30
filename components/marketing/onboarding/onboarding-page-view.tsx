"use client"

import { FluidBackground } from "./fluid-background"
import { FocusSection } from "./focus-section"
import { ProcessSection } from "./process-section"
import { WorkSection } from "@/components/marketing/home/work-section"
import { ContactSection } from "@/components/marketing/home/contact-section"

export function OnboardingPageView() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <section className="relative w-full overflow-hidden py-8 xl:min-h-[90vh]">
        <FluidBackground />

        <div className="relative z-10 mx-auto w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase">
            <span>Home</span>
            <span className="text-zinc-200">.</span>
            <span>Onboarding</span>
          </div>

          <div className="mt-12 flex min-h-[calc(90vh-10rem)] max-w-[760px] items-center">
            <div className="space-y-8">
              <h1
                className="text-4xl font-bold tracking-tight text-[#252525] sm:text-5xl xl:text-[72px] leading-[1.05]"
                style={{ fontFamily: "var(--font-heading, serif)" }}
              >
                First-time users
                <br />
                <span>Need first clear wins</span>
              </h1>

              <div className="max-w-[620px] space-y-6">
                <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#252525]">
                  Onboarding is where product confidence is either built or lost. We design activation flows
                  that make the next step obvious, reduce hesitation, and help users feel progress early.
                </p>
                <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#252525]">
                  From setup to first outcome, every screen is tuned to remove friction, reinforce value,
                  and move people toward habit instead of abandonment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FocusSection />

      <ProcessSection />

      <WorkSection />

      <ContactSection />
    </main>
  )
}
