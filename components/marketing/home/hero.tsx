"use client"

import * as React from "react"
import Link from "next/link"
import { Calculator } from "./calculator"
import { InteractiveDotGrid } from "@/components/utility/interactive-dot-grid"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-81px)] w-full items-center justify-center overflow-hidden bg-background lg:h-[calc(100dvh-81px)] lg:min-h-0">
      <InteractiveDotGrid className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] items-center justify-center px-4 py-12 sm:px-8 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center justify-center gap-10 lg:grid-cols-[580px_400px] lg:gap-14">

          {/* Left Content */}
          <div className="order-1 flex w-full max-w-[580px] flex-col justify-center space-y-8 text-center animate-in fade-in slide-in-from-left-8 duration-1000 ease-out lg:h-[270px] lg:text-left">
            <div className="space-y-5">
              <h1
                className="text-[50px] leading-[1.02] font-bold tracking-tight text-[#3D3D3D] lg:text-[56px]"
                style={{ fontFamily: "var(--font-heading, serif)" }}
              >
                Made With Purpose For Human Intelligence
              </h1>

              <p className="mx-auto max-w-[520px] text-[15px] leading-relaxed font-normal text-[#3D3D3D] sm:text-base lg:mx-0 lg:text-lg">
                We help SaaS teams fix onboarding and dashboard experience problems
                before they become growth blockers.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="https://cal.eu/savio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[54px] cursor-pointer items-center justify-center rounded-[6px] bg-zinc-900 px-8 text-base font-semibold text-zinc-100 shadow-xl shadow-zinc-900/10 transition-all hover:scale-[1.02] hover:bg-[#3775E9] active:scale-[0.98]"
              >
                Book Your Free Call
              </Link>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={
                  <Link href="/case-studies" />
                }
                className="flex h-[54px] gap-2 rounded-[6px] border border-[#D1D1D1] px-8 text-base font-semibold text-[#3D3D3D] transition-all hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98]"
              >
                See What We Made
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Content: Calculator */}
          <div className="order-2 flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 ease-out delay-200 fill-mode-both">
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