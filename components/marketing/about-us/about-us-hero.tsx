import * as React from "react"
import { DynamicStatusCards } from "./dynamic-status-cards"

export function AboutUsHero() {
  return (
    <section data-analytics-section="about_hero" className="relative w-full overflow-hidden bg-background py-6 lg:py-14">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase mb-6 sm:mb-10 lg:mb-14">
          <span>Home</span>
          <span className="text-zinc-200">.</span>
          <span>About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] xl:grid-cols-[1fr_560px] items-start gap-8 lg:gap-10">
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-6 w-full lg:max-w-[460px] xl:max-w-[480px]">
            <h1
              className="text-[24px] xs:text-[26px] sm:text-4xl lg:text-[33px] xl:text-[36px] font-bold tracking-tight text-[#3D3D3D] leading-[1.12]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              <span className="whitespace-nowrap">We Don&apos;t Just Design Screens.</span>
              <br />
              <span className="whitespace-nowrap">We Engineer Clarity</span>
            </h1>

            <div className="space-y-6">
              <p className="text-[14px] sm:text-[15px] lg:text-[15px] xl:text-[16px] leading-relaxed text-zinc-500 font-medium">
                Stickman is an independent design practice specialising in SaaS retention and decision architecture. No account managers. No bloated timelines. Just a focused company led by 11 years of specialised UX experience applied directly to your most complex product problems.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Status Cards */}
          <DynamicStatusCards />
        </div>
      </div>
    </section>
  )
}

