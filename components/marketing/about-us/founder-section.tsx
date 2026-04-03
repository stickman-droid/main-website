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
    <section ref={containerRef} className="relative w-full overflow-hidden border-t border-zinc-50 bg-white py-16 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-12">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex-shrink-0">
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

            <div className="space-y-4">
              <p className="text-center text-[12px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase lg:text-left">
                Founder | Creative Director
              </p>
              <h2
                className="text-left text-4xl font-medium tracking-tight text-[#3D3D3D] leading-[1.1] lg:text-5xl"
                style={{ fontFamily: 'var(--font-heading, serif)' }}
              >
                <span className="font-bold">Hi, I&apos;m Savio.</span> Product designer, over ten years in, and still genuinely excited by the work.
              </h2>
            </div>
          </div>

          <div className="max-w-[820px] space-y-6 lg:space-y-8 text-left text-[16px] font-medium leading-relaxed text-zinc-500 lg:text-[17px]">
            <p className="founder-paragraph">
              I started my career in marketing before moving into design, which means I think about products from both sides. How they are built and how they need to perform in the real world.
            </p>
            <p className="founder-paragraph">
              Over the past decade I have worked with clients across fintech, healthcare, logistics and hospitality. The work has always been the same: figure out how users actually think and then design experiences that meet them there.
            </p>
            <p className="founder-paragraph">
              What I kept noticing, across all of it, is that the products struggling to grow were rarely struggling because of bad technology. They were struggling because somewhere between sign-up and finding real value, the experience stopped feeling human. A confusing first step. A dashboard that overwhelmed instead of guided. A feature nobody found because nobody thought to ask whether a new user could find it.
            </p>
            <p className="founder-paragraph">
              That is the gap I work in. And it is why I started Stickman.
              I wanted to work directly with SaaS teams, without the layers that slow things down. No account managers between you and the thinking, no juniors doing the work a senior quoted. Just focused, honest collaboration from someone who genuinely cares whether your product works for the people using it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
