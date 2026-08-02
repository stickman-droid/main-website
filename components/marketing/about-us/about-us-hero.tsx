import * as React from "react"
import { DynamicStatusCards } from "./dynamic-status-cards"

export function AboutUsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-6 lg:py-14">
      <div className="mx-auto w-full px-6 lg:px-12 xl:px-[80px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase mb-14">
          <span>Home</span>
          <span className="text-zinc-200">.</span>
          <span>About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-start gap-8 sm:gap-0">
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-8">
            <h1
              className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#252525] sm:text-6xl leading-[1.05]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              We Don&apos;t Just Design Screens.<br />
              <span>We Engineer Clarity</span>
            </h1>

            <div className="max-w-[580px] space-y-8">
              <p className="text-[16px] lg:text-[20px] leading-relaxed text-[#252525] font-medium">
                Stickman.Design is an independent design practice specialising in SaaS retention and decision architecture. No account managers. No bloated timelines. Over a decade of specialised UX experience applied directly to your most complex product problems.
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

