"use client"

import * as React from "react"
import Link from "next/link"
import posthog from "posthog-js"
import { Calculator } from "./calculator"
import { InteractiveDotGrid } from "@/components/utility/interactive-dot-grid"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const revealItems = gsap.utils.toArray<HTMLElement>(".hero-reveal")

    revealItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            once: true,
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} data-analytics-section="home_hero" className="relative flex min-h-[calc(100dvh-81px)] w-full items-center justify-center overflow-hidden bg-background lg:h-[calc(100dvh-81px)] lg:min-h-0">
      <InteractiveDotGrid className="hero-background pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex w-full lg:max-w-7xl xl:max-w-[900px] items-center justify-center px-6 py-12 sm:px-12 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[580px_400px] lg:gap-16 xl:gap-14">

          {/* Left Content */}
          <div className="order-1 flex w-full max-w-[580px] flex-col justify-center space-y-8 text-center lg:h-[270px] lg:text-left">
            <div className="space-y-5">
              <h1
                className="hero-reveal text-[50px] lg:text-[56px] leading-[1.02] font-bold tracking-tight text-[#252525]"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Design With Purpose For Human Intelligence
              </h1>

              <p
                className="hero-reveal mx-auto max-w-[520px] text-[15px] sm:text-base lg:mx-0 lg:text-lg leading-relaxed text-zinc-500 font-medium"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                We help SaaS teams fix onboarding and dashboard experience problems
                before they become growth blockers.
              </p>
            </div>

            <div className="hero-reveal flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="https://cal.eu/savio"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("consultation_booking_started", { placement: "hero" })}
                className="inline-flex h-[54px] cursor-pointer items-center justify-center rounded-[6px] bg-zinc-900 px-8 text-base font-semibold text-zinc-100 shadow-xl shadow-zinc-900/10 transition-all hover:scale-[1.02] hover:bg-[#3775E9] active:scale-[0.98]"
              >
                Book Your Free Call
              </Link>
              <Link
                href="/case-studies"
                onClick={() => posthog.capture("case_studies_listing_opened", { placement: "hero" })}
                className="group inline-flex h-[54px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#D1D1D1] bg-transparent px-8 text-base font-semibold text-[#252525] transition-all hover:scale-[1.02] hover:bg-[#3775E9] hover:text-white hover:border-[#3775E9] active:scale-[0.98]"
              >
                <span>See What We Made</span>
                <ChevronRight className="w-4 h-4 text-[#252525] transition-colors group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Right Content: Calculator */}
          <div className="hero-reveal order-2 flex items-center justify-center">
            <div className="relative w-full max-w-[400px]">
              <div className="absolute -inset-4 bg-zinc-100/50 rounded-[2.5rem] blur-2xl -z-10" />
              <Calculator />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
