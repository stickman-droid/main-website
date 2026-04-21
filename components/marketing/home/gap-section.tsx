"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function GapSection() {
  return (
    <section className="flex w-full justify-center overflow-hidden bg-background py-8 sm:py-16">
      <div className="flex w-full max-w-[950px] flex-col gap-5 px-6">
        <div className="mx-auto flex max-w-[720px] flex-col items-start gap-4 text-left">
          <p className="text-[14px] font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
            The Gap
          </p>
          <h2
            className="text-4xl leading-[1.15] font-bold tracking-tight text-[#3D3D3D] sm:text-[38px] lg:text-[42px]"
            style={{ fontFamily: "var(--font-heading, serif)" }}
          >
            The biggest threat to growth isn&apos;t competition. It&apos;s confusion.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center lg:gap-8">
          <div className="flex items-center justify-center lg:justify-start">
            <BrokenBox />
          </div>

          <div className="flex flex-col justify-center">
            <div className="max-w-[480px] space-y-6 text-[15px] leading-relaxed font-normal text-[#3D3D3D]/80">
              <p>
                The distance between a loyal customer and a lost one is a single gap of confusion.
              </p>
              <p>
                It&apos;s not the competition that stalls your scale; it&apos;s the friction of a
                fragmented experience. When a dashboard feels like a puzzle with missing pieces,
                your users don&apos;t just get frustrated and they drift.
              </p>
              <p>
                We specialise in closing the clarity gap. We transform cluttered interfaces
                into seamless pathways, turning &apos;Now what?&apos; into a clear road to ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrokenBox() {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isInView, setIsInView] = React.useState(false)
  const boxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!boxRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.35,
      }
    )

    observer.observe(boxRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={boxRef}
      className="relative flex h-[350px] w-[350px] items-center justify-center cursor-pointer group touch-none select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
    >
      <div className="wrapper relative h-[240px] w-[240px] transform-gpu">
        {/* Occluders (Corners) */}
        <div className={cn(
          "occluder absolute -top-[40px] -left-[40px] z-20 h-[80px] w-[80px] bg-background transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)",
          isHovered ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
        )} />
        <div className={cn(
          "occluder absolute -top-[40px] -right-[40px] z-20 h-[80px] w-[80px] bg-background transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)",
          isHovered ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
        )} />
        <div className={cn(
          "occluder absolute -bottom-[40px] -right-[40px] z-20 h-[80px] w-[80px] bg-background transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)",
          isHovered ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
        )} />
        <div className={cn(
          "occluder absolute -bottom-[40px] -left-[40px] z-20 h-[80px] w-[80px] bg-background transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)",
          isHovered ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
        )} />

        <div
          className={cn(
            "lines relative h-[240px] w-[240px] transition-opacity duration-1000",
            !isInView ? "animate-none" : "animate-move-square"
          )}
        >


          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 240 240"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1.75"
              y="1.75"
              width="236.5"
              height="236.5"
              rx="0"
              stroke="#3D3D3D"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

