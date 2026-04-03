"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const focusCards = [
  {
    title: "Information Hierarchy",
    desc: "Prioritise data so critical insights are immediately visible and easy to act on."
  },
  {
    title: "Signal-Driven Alerts",
    desc: "Surface what requires attention while filtering out unnecessary noise."
  },
  {
    title: "Intuitive Navigation",
    desc: "Make movement effortless so users always know where they are and where to go next."
  },
  {
    title: "System Feedback States",
    desc: "Turn waiting and blank states into moments of guidance, not confusion."
  },
  {
    title: "Action Visibility",
    desc: "Show users what can be done, why it matters, and what happens next."
  },
  {
    title: "Role Consistency",
    desc: "Ensure a seamless experience across different users, permissions, and access levels."
  }
]

export function FocusGridSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".focus-card")

    // Entrance animation
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    )
  }, { scope: containerRef })

  // Spotlight Effect Logic
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty("--x", `${x}px`)
    card.style.setProperty("--y", `${y}px`)
  }

  return (
    <section ref={containerRef} className="relative w-full bg-white py-4 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header Section - Centered as per request image */}
        <div className="mb-8 lg:mb-16 flex flex-col items-center text-center space-y-4">
          <p className="text-[12px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
            Our Focus
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl lg:text-[52px] leading-[1.1] max-w-[800px]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            Giving every element its purpose
          </h2>
        </div>

        {/* 2-Column Grid - Stay 2 columns on mobile as requested */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 gap-3 sm:gap-6"
        >
          {focusCards.map((card, i) => (
            <div
              key={i}
              onPointerMove={handlePointerMove}
              className="focus-card group relative p-[1px] rounded-[24px] bg-zinc-100/50 overflow-hidden transition-all duration-300"
            >
              {/* Spotlight Background Overlay - Blue Theme */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at var(--x) var(--y), rgba(55, 117, 233, 0.18), transparent 45%)`
                }}
              />

              {/* Inner Content Card */}
              <div className="relative z-10 bg-white rounded-[23px] px-4 py-6 h-full flex flex-col space-y-3 sm:space-y-4 border border-[#E0E0E0] transition-colors group-hover:border-blue-500/10">
                <h3 className="text-lg sm:text-2xl font-bold text-[#3D3D3D] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[13px] sm:text-[15px] leading-relaxed text-zinc-500 font-medium">
                  {card.desc}
                </p>
              </div>

              {/* Border Spotlight Glow - Blue Theme */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: `radial-gradient(800px circle at var(--x) var(--y), #3775E9, transparent 40%)`,
                  zIndex: -1
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .focus-card {
          --x: 0px;
          --y: 0px;
        }
      `}</style>
    </section>
  )
}
