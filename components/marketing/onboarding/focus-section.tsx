"use client"

import * as React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const focusCards = [
  {
    title: "Greeting & Connection",
    desc: "Personalising the 'first-second' experience with welcome systems that make users feel at home."
  },
  {
    title: "Value Reinforcement",
    desc: "Highlighting key features while articulating the specific benefits that help users visualise success."
  },
  {
    title: "Guided Orientation",
    desc: "Utilising strategic checklists and progress indicators to provide a clear sense of momentum."
  },
  {
    title: "Action-Driven Help",
    desc: "Designing contextual walkthroughs and tooltips that assist users within their actual workflow."
  },
  {
    title: "Friction Mitigation",
    desc: "Isolating and resolving technical or cognitive drop-off points during setup and team integration."
  }
]

export function FocusSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const imagesRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const images = gsap.utils.toArray<HTMLElement>(".focus-image")
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 96%",
          end: "top 10%",
          scrub: 2.5,
        },
      })

      tl.fromTo(
        images,
        {
          opacity: 0,
          x: -150,
          y: -120,
          rotate: -15,
          scale: 0.85,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          stagger: 0.22,
          ease: "power2.out",
        }
      )
    })

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        images,
        { opacity: 0, y: -50, x: -50, rotate: -8, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: 2.5,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 82%",
          },
        }
      )
    })

    const cards = gsap.utils.toArray<HTMLElement>(".focus-card")

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        }
      )
    })

    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      )
    })

    return () => mm.revert()
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
    <section ref={containerRef} className="relative w-full bg-background pt-4 pb-12 sm:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header Section */}
        <div className="mb-4 flex flex-col items-start text-left space-y-4 max-w-[640px]">
          <p className="text-[12px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
            Our Focus
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl lg:text-[52px] leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            We look beyond the UI to remove the friction that stalls adoption
          </h2>
        </div>

        {/* Content Section: 2-Column Mesh */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-start">

          <div ref={imagesRef} className="relative hidden min-h-[420px] items-start justify-center lg:flex lg:min-h-[620px] lg:justify-start">
            <div className="relative h-full w-full max-w-[760px] transform-style-3d">
              <div className="focus-image absolute top-4 z-0 w-[280px]">
                <Image
                  src="/onboarding1.svg"
                  alt="Onboarding Screen 1"
                  width={300}
                  height={600}
                  className="rounded-[32px]"
                />
              </div>
              <div className="focus-image absolute left-[20%] top-24 z-1 w-[280px]">
                <Image
                  src="/onboarding2.svg"
                  alt="Onboarding Screen 2"
                  width={300}
                  height={600}
                  className="rounded-[32px]"
                />
              </div>
              <div className="focus-image absolute left-[40%] top-28 z-20 w-[280px]">
                <Image
                  src="/onboarding3.svg"
                  alt="Onboarding Screen 3"
                  width={300}
                  height={600}
                  className="rounded-[32px]"
                />
              </div>
            </div>
          </div>

          {/* Right: Feature Cards with Spotlight Effect */}
          <div ref={cardsRef} className="flex flex-col space-y-3">
            {focusCards.map((card, i) => (
              <div
                key={i}
                onPointerMove={handlePointerMove}
                className="focus-card group relative p-[1.5px] rounded-[24px] bg-zinc-100/50 overflow-hidden transition-all duration-300"
              >
                {/* Spotlight Background Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at var(--x) var(--y), rgba(55, 117, 233, 0.22), transparent 45%)`
                  }}
                />

                {/* Inner Content Card */}
                <div className="relative z-10 bg-background rounded-[23px] px-5 py-4 flex flex-col space-y-2 border border-[#E0E0E0] transition-colors group-hover:border-blue-500/10">
                  <h3 className="text-xl font-bold text-[#3D3D3D] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-zinc-500 max-w-[480px]">
                    {card.desc}
                  </p>
                </div>

                {/* Border Spotlight Glow */}
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