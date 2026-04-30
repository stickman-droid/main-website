"use client"

import * as React from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const pills = [
    "Dashboard Confidence",
    "Product Strategy Check",
    "Feature Validation",
    "UX Review",
    "Design Direction",
    "First Mile Experience"
  ]

  useGSAP(() => {
    if (!containerRef.current) return

    const revealItems = gsap.utils.toArray<HTMLElement>(".contact-reveal")

    revealItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            once: true,
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="flex w-full justify-center bg-background lg:py-8 mt-16 lg:mt-18">
      <div className="flex w-full max-w-[950px] flex-col px-6">
        <div className="contact-reveal mb-8 flex w-full max-w-[640px] flex-col space-y-4 text-left">
          <p className="text-[12px] font-mono font-bold tracking-[0.25em] text-[#8e8e8e] uppercase">
            The First Move
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#252525] sm:text-[42px] leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            Not sure where to start? Let&apos;s talk.
          </h2>
        </div>

        <div className="mb-12 grid w-full grid-cols-1 gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-10">
          <p className="contact-reveal max-w-[440px] font-sans text-[16px] leading-relaxed text-[#252525] font-normal">
            You don&apos;t always need a full team; sometimes you just need a moment of clarity.
            Think of this as a dedicated space to talk through your challenges.
            We&apos;ll untangle the issue together, identifying exactly where to lean in so you can move forward with confidence.
          </p>

          <div className="flex flex-wrap items-start content-start gap-3">
            {pills.map((pill, i) => (
              <span
                key={pill}
                className="contact-reveal rounded-full bg-[#F5F5F5] px-5 py-2.5 text-[12px] font-semibold text-[#252525] whitespace-nowrap"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-reveal flex w-full flex-col items-center space-y-4">
          <Link
                href="https://cal.eu/savio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-[6px] bg-zinc-900 px-6 text-base font-semibold text-zinc-100 shadow-xl shadow-zinc-900/10 transition-all hover:scale-[1.02] hover:bg-[#3775E9] active:scale-[0.98]"
              >
                Book Your Free Call
              </Link>
          <p className="text-[10px] font-mono font-regular tracking-[0.3em] text-[#252525] uppercase">
            No Pitch, Just Value
          </p>
        </div>
      </div>
    </section>
  )
}
