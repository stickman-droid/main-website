"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We dive into your current flow and processes to find where users get stuck. We don't guess; we identify the exact friction points."
  },
  {
    num: "02",
    title: "Define",
    desc: "We map a personalised journey that aligns your product's core promise with the specific reason the user signed up."
  },
  {
    num: "03",
    title: "Design",
    desc: "We build high-fidelity, interactive prototypes focused on activation, getting users to their first \"win\" as fast as possible."
  },
  {
    num: "04",
    title: "Handoff",
    desc: "You receive clean, developer-ready files. We remain available during implementation to ensure the experience is executed flawlessly."
  }
]

export function ProcessSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const circleRef = React.useRef<HTMLDivElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 640px)", () => {
      if (!circleRef.current) return

      gsap.to(circleRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      })
    })

    mm.add("(max-width: 639px)", () => {
      if (!cardsRef.current) return

      const cards = gsap.utils.toArray<HTMLElement>(".process-card")
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36, scale: 0.94, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center space-y-4 text-center sm:mb-20">
          <p className="text-[12px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
            Our Process
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl lg:text-5xl max-w-3xl leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            A strategic approach to user orientation
          </h2>
        </div>

        {/* Circular Animation Grid */}
        <div className="relative mx-auto mt-8 max-w-[1000px] sm:mt-20">

          {/* The Dashed Circle Wrapper (Rotates) */}
          <div className="absolute inset-0 hidden items-center justify-center pointer-events-none sm:flex">
            <div
              ref={circleRef}
              className="relative size-[400px] sm:size-[500px] lg:size-[600px] rounded-full border border-dashed border-zinc-200"
            >
              {/* Arrows at North, East, South, West */}
              {/* Arrow North (pointing right-ish) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-0 text-black">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Arrow East (pointing down-ish) */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-2 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-90 text-black">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Arrow South (pointing left-ish) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180 text-black">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Arrow West (pointing up-ish) */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-2 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="-rotate-90 text-black">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Steps Content Grid */}
          <div ref={cardsRef} className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-6 px-0 sm:grid-cols-2 sm:gap-x-24 sm:gap-y-32 sm:px-4 lg:gap-x-48">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`process-card flex flex-col space-y-3 rounded-[18px] bg-white p-3 sm:space-y-6 sm:rounded-none sm:bg-transparent sm:p-0 ${i % 2 === 1 ? "sm:items-start text-left" : "sm:items-start text-left"
                  }`}
                style={{ perspective: "1000px" }}
              >
                <div className="relative pb-2 sm:pb-0">
                  <span className="text-5xl font-black text-zinc-200 select-none sm:text-7xl lg:text-8xl">
                    {step.num}
                  </span>
                  <h3 className="absolute bottom-[-2px] left-0 text-lg font-bold text-[#3D3D3D] sm:bottom-1 sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <p className="max-w-[340px] text-[13px] leading-relaxed text-zinc-500 sm:text-[15px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
