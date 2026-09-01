"use client"

import * as React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export function FounderSection() {
  const containerRef = React.useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const paragraphs = gsap.utils.toArray<HTMLElement>(".founder-paragraph")

    paragraphs.forEach((paragraph, index) => {
      gsap.fromTo(
        paragraph,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          delay: index * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 88%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} data-analytics-section="about_founder" className="relative w-full overflow-hidden border-t border-zinc-50 bg-background py-16 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-12">
        <div className="mx-auto flex max-w-[980px] flex-col gap-12 lg:gap-10">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex-shrink-0 self-start">
              <div className="relative size-[180px] overflow-hidden rounded-full shadow-sm sm:size-[200px]">
                <Image
                  src="/savio.svg"
                  alt="Savio"
                  fill
                  className="object-cover grayscale"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-center text-[12px] font-mono font-bold tracking-[0.3em] text-[#8e8e8e] uppercase lg:text-left">
                  Founder | Creative Director
                </p>
                <h2
                  className="text-left text-4xl font-medium tracking-tight text-[#252525] leading-[1.1] lg:text-5xl"
                  style={{ fontFamily: 'var(--font-heading, serif)' }}
                >
                  Let's design customer experiences with less friction, better decisions and stronger retention.
                </h2>
              </div>

              {/* Body text flows directly below heading in the same column */}
              <div className="space-y-5 text-left text-[16px] font-medium leading-relaxed text-zinc-500 lg:text-[17px]">
                <p className="founder-paragraph">
                  Having started my career in marketing before moving into design, I think about products and services from both ends. How they are built and how they need to perform in the real world.
                </p>
                <p className="founder-paragraph">
                  Over the past decade I have worked with clients across fintech, healthcare, logistics and hospitality. The work has always been the same: figure out how users actually think and then design experiences that meet them there.
                </p>
                <p className="founder-paragraph">
                  What I kept noticing, across all of it, is that the products struggling to grow were rarely struggling because of bad technology. They were struggling because somewhere between sign-up and finding real value, the experience stopped feeling human.
                </p>
                <p className="founder-paragraph">
                  A confusing first step. A dashboard that overwhelmed instead of guided. A great feature nobody found because nobody thought to ask whether a new user could find it.
                </p>
                <p className="founder-paragraph">
                  This is the exact gap I set out to fill, and it's why I started Stickman.
                </p>
                <p className="founder-paragraph">
                  I wanted to work directly with teams who need real, fast solutions to stop drop-offs and keep users engaged. As a small studio, I keep myself to two projects at a time and stay hands-on throughout the design process. You won't get a junior with a senior's quote. You get focused, honest work from someone who genuinely believes good products should be a pleasure to use, for the people relying on them every day.
                </p>
                <p className="founder-paragraph italic">
                  - Savio Araujo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

