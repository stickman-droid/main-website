"use client"

import * as React from "react"
import { GlowCard } from "@/components/ui/glow-card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const philosophyItems = [
  {
    title: "We believe in the Human, not just the User",
    desc: "A user is a data point; a human is someone with a goal, a deadline, and a limited amount of patience. We design for the latter."
  },
  {
    title: "We believe Design is a business strategy",
    desc: "If a user can't find the value in the first thirty seconds, the most advanced technology in the world won't save your churn rate."
  },
  {
    title: "We believe in Directness",
    desc: "No layers, no juniors, no fluff. Just honest, senior-level thinking applied to your most expensive problems."
  },
  {
    title: "We believe in Fairness & Honesty",
    desc: "True partnership that leads with hard truth and a fiduciary duty to your bottom line. That means balancing ambitious design with business reality to hit your targets."
  }
]

export function PhilosophySection() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".philosophy-card")

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: index * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          }
        }
      )
    })
  }, { scope: containerRef })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty("--x", `${x}px`)
    card.style.setProperty("--y", `${y}px`)
  }

  return (
    <section ref={containerRef} className="relative w-full bg-background py-12 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-12">
        {/* Header */}
        <div className="mb-6 lg:mb-14 flex flex-col items-center text-center space-y-4">
          <p className="text-[12px] font-mono font-bold tracking-[0.3em] text-[#8e8e8e] uppercase">
            Philosophy
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-[#252525] sm:text-5xl lg:text-6xl-tight max-w-[840px] leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            What we believe is who we are
          </h2>
          <p className="max-w-[720px] text-[15px] lg:text-[17px] leading-relaxed text-[#252525] font-medium pt-1">
            Our work isn&apos;t driven by trends; it&apos;s driven by a few core convictions about how people and software should interact.
            We don&apos;t just &quot;design screens&quot;, we build the bridge between a user&apos;s intent and your product&apos;s value.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 lg:gap-8">
          {philosophyItems.map((item, i) => (
            <GlowCard
              key={i}
              radius={12}
              className="philosophy-card rounded-[12px] border border-[#E0E0E0] bg-zinc-100/50 p-[1.5px] transition-all duration-300 h-full"
              innerClassName="flex h-full flex-col space-y-1 bg-background p-4 lg:p-6"
            >
              <h3 className="text-xl font-bold leading-snug tracking-tight text-[#252525] lg:text-2xl">
                {item.title}
              </h3>
              <p className="text-[14px] font-medium leading-relaxed text-[#252525] lg:text-[16px]">
                {item.desc}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>

      <style jsx>{`
        .philosophy-card {
          --x: 0px;
          --y: 0px;
        }
      `}</style>
    </section>
  )
}
