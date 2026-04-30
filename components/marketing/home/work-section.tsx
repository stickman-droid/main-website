"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Heading, Mono } from "@/components/ui/typography"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: "01",
    title: "Speed Boost For The Logistics Titan",
    pills: ["Supply Chain & Industrial Logistics", "Onboarding"],
    image: "/logistics/Logistics_case_study_hero.webp",
    slug: "more-speed-for-the-logistics-titan",
  },
  {
    id: "02",
    title: "ESG Compliance Fatigue",
    pills: ["Legal-Tech / Sustainability", "Onboarding"],
    image: "/sustainability/ESG_compliance_case_study_hero.webp",
    slug: "esg-compliance-fatigue",
  },
  {
    id: "03",
    title: "Solving Digital SME Bank Delays",
    pills: ["Fintech", "Dashboard"],
    image: "/fintech/Fintech_case_study_hero.webp",
    slug: "digital-sme-bank-delays",
  },
  {
    id: "04",
    title: "When risk is buried, decisions slow down",
    pills: ["Fintech", "Dashboard"],
    image: "/fintech/Wealthmanagement_case_study_hero.webp",
    slug: "germany-risk-dashboard",
  },
]

export function WorkSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const expandBgRef = React.useRef<HTMLDivElement>(null)
  const progressRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !panelRef.current || !expandBgRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".project-card")
    const header = containerRef.current.querySelector(".work-header")
    const progressBar = progressRef.current
    const expandBg = expandBgRef.current

    if (!header || !progressBar || cards.length < 4) return

    const setProgress = gsap.quickTo(progressBar, "scaleX", {
      duration: 0.12,
      ease: "none",
    })

    // Initial states
    gsap.set(cards, {
      transformPerspective: 1400,
      transformOrigin: "50% 50%",
      force3D: true,
      autoAlpha: 0,
      scale: 0.8,
      z: -100,
      xPercent: -50,
      yPercent: -50,
      top: "50%"
    })
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })

    // Calculate scale to fill screen
    const rect = expandBg.getBoundingClientRect()
    const targetScale = Math.max(
      window.innerWidth / rect.width,
      window.innerHeight / rect.height
    ) * 1.1 // Add margin to be safe

    const mm = gsap.matchMedia()

    mm.add("(max-width: 639px)", () => {
      gsap.set(cards, { left: "50%", top: "50%" })
      gsap.set(cards[0], { autoAlpha: 1, scale: 0.85, z: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "center center",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => setProgress(self.progress),
        },
        defaults: {
          ease: "power2.out",
        },
      })

      // Stage 1: Expand Background (responsive speed)
      tl.to(expandBg, {
        scale: targetScale,
        borderRadius: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)

      tl.to(cards[0], {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)

      tl.to(header, { opacity: 0.1, y: -20, duration: 0.4 }, 0.1)

      cards.forEach((card, index) => {
        // Exit animation for current card
        tl.to(
          card,
          {
            z: 600,
            scale: 1.3,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          1.0 + index * 0.5
        )

        // Enter animation for next card
        if (index < cards.length - 1) {
          tl.to(
            cards[index + 1],
            {
              autoAlpha: 1,
              scale: 1,
              z: 0,
              duration: 0.5,
              ease: "power2.out"
            },
            1.2 + index * 0.5
          )
        }
      })
    })

    mm.add("(min-width: 640px)", () => {
      const desktopTop = window.innerWidth >= 1024 ? "54%" : "50%"

      cards.forEach((card, i) => {
        const isLG = window.innerWidth >= 1024 && window.innerWidth < 1280
        let leftValue = card.dataset.desktopLeft ?? "50%"
        
        if (isLG) {
          if (i === 0 || i === 2) leftValue = "30%"
          if (i === 1 || i === 3) leftValue = "70%"
        } else {
          // XL and others above 640px
          if (i === 0 || i === 2) leftValue = "32%"
          if (i === 1 || i === 3) leftValue = "68%"
        }

        gsap.set(card, {
          left: leftValue,
          top: desktopTop
        })
      })

      const isLgScreen = window.innerWidth >= 1024 && window.innerWidth < 1280
      const targetLeft0 = isLgScreen ? "30%" : "32%"
      const targetLeft1 = isLgScreen ? "70%" : "68%"
      const initialLeft0 = isLgScreen ? "calc(50% - 155px)" : "calc(50% - 215px)"
      const initialLeft1 = isLgScreen ? "calc(50% + 155px)" : "calc(50% + 215px)"

      gsap.set(cards[0], { autoAlpha: 1, scale: 0.8, z: 0, left: initialLeft0, top: "50%" })
      gsap.set(cards[1], { autoAlpha: 1, scale: 0.8, z: 0, left: initialLeft1, top: "50%" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "center center",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => setProgress(self.progress),
        },
        defaults: {
          ease: "power2.out",
        },
      })

      // Stage 1: Expand Background (Slightly faster)
      tl.to(expandBg, {
        scale: targetScale,
        borderRadius: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)

      tl.to(cards[0], {
        scale: 1,
        left: targetLeft0,
        top: desktopTop,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)

      tl.to(cards[1], {
        scale: 1,
        left: targetLeft1,
        top: desktopTop,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)

      tl.to(header, { opacity: 0.1, y: -20, duration: 0.5 }, 0.1)

      // Stage 2: Cards Stack
      const frontLeft = cards[0]
      const frontRight = cards[1]
      const queueLeft = cards[2]
      const queueRight = cards[3]

      tl.to(
        [frontLeft, frontRight],
        {
          z: 560,
          scale: 1.28,
          autoAlpha: 0,
          duration: 0.34,
          stagger: 0.035,
          ease: "power2.inOut",
        },
        0.9
      )

      // Bring queue cards forward with responsive positioning
      const isLG = window.innerWidth >= 1024 && window.innerWidth < 1280
      const leftPos = isLG ? "30%" : "32%"
      const rightPos = isLG ? "70%" : "68%"
      const qLeftPos = isLG ? "30%" : "32%"
      const qRightPos = isLG ? "70%" : "68%"

      tl.to(queueLeft, { xPercent: -50, yPercent: -50, left: qLeftPos, z: 0, scale: 1, autoAlpha: 1, duration: 0.34, ease: "power2.out" }, 1.0)
      tl.to(queueRight, { xPercent: -50, yPercent: -50, left: qRightPos, z: 0, scale: 1, autoAlpha: 1, duration: 0.34, ease: "power2.out" }, 1.05)

      tl.to(
        [queueLeft, queueRight],
        {
          z: 520,
          scale: 1.24,
          autoAlpha: 0,
          duration: 0.32,
          stagger: 0.035,
          ease: "power2.in",
        },
        1.6
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background pt-12 sm:pt-6">
      <div className="work-header mx-auto flex w-full max-w-[820px] flex-col items-center gap-3 px-6 text-center sm:px-8">
        <Mono className="text-[10px] font-bold tracking-[0.4em] text-[#8e8e8e] uppercase">
          Selected Work
        </Mono>
        <Heading
          as="h2"
          className="max-w-[620px] text-3xl font-bold text-[#252525] sm:text-5xl"
          style={{ fontFamily: '"Fraunces", serif' }}
        >
          Problems we&apos;ve solved for others like you
        </Heading>
        <div className="h-0.5 w-48 bg-zinc-100/20 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-zinc-900"
          />
        </div>
      </div>

      <div className="-mt-8 sm:-mt-18 flex justify-center">
        <div
          ref={panelRef}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Expanding Background Box */}
          <div
            ref={expandBgRef}
            className="absolute z-0 bg-[#252525] h-[75vh] w-[calc(100vw-2rem)] max-w-[1280px] lg:max-w-[980px] xl:max-w-[1200px] rounded-[12px] shadow-2xl sm:h-[70vh] sm:w-full sm:max-w-[1200px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)]" />
          </div>

          {/* Cards Content (Absolute Over Expansion) */}
          <div className="absolute inset-0 z-10 w-full h-full perspective-[2000px]">
            <div className="absolute inset-0 transform-style-3d">
              <div className="relative h-full w-full transform-style-3d">
                {projects.map((project, i) => (
                  <Link
                    key={project.id}
                    href={`/case-studies/${project.slug}`}
                    className={`project-card card-${i} absolute top-1/2 left-1/2 w-[340px] h-[380px] lg:w-[360px] lg:h-[340px] xl:w-[500px] xl:h-[450px] overflow-hidden rounded-[22px] shadow-[0_38px_70px_-24px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform sm:left-auto`}
                    style={{ zIndex: projects.length - i }}
                    data-desktop-left={
                      i === 0 ? "32%" :
                        i === 1 ? "68%" :
                          i === 2 ? "44%" : "56%"
                    }
                  >
                    {/* Full-bleed image */}
                    <div className="relative h-full w-full bg-zinc-200">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Bottom overlay */}
                    <div
                      className="absolute inset-x-0 bottom-0 space-y-2.5 px-4 py-4"
                      style={{
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #000000 100%)",
                      }}
                    >
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-white sm:text-base">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#252525]"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .project-card { backface-visibility: hidden; }
      `}</style>
    </section>
  )
}
