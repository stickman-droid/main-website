"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

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
    pills: ["Fintech", "Onboarding"],
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
  const progressRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !panelRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".project-card")
    const header = containerRef.current.querySelector(".work-header")
    const progressBar = progressRef.current

    if (!header || !progressBar || cards.length < 4) return

    const setProgress = gsap.quickTo(progressBar, "scaleX", {
      duration: 0.12,
      ease: "none",
    })

    gsap.set(cards, {
      transformPerspective: 1400,
      transformOrigin: "50% 50%",
      force3D: true,
    })
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })
    const mm = gsap.matchMedia()

    mm.add("(max-width: 639px)", () => {
      gsap.set(cards, { left: "50%" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "center center",
          end: "+=500%",
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => setProgress(self.progress),
        },
        defaults: {
          ease: "power2.out",
        },
      })

      tl.to(header, { opacity: 0.1, y: -20, duration: 0.4 }, 0)

      tl.set(
        cards,
        {
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
          scale: 0.88,
          z: -180,
        },
        0
      )

      tl.set(
        cards[0],
        {
          autoAlpha: 1,
          scale: 1,
          z: 0,
        },
        0
      )

      cards.forEach((card, index) => {
        if (index > 0) {
          tl.to(
            card,
            {
              autoAlpha: 1,
              scale: 1,
              z: 0,
              duration: 0.28,
            },
            0.22 + index * 0.2
          )
        }

        tl.to(
          card,
          {
            z: 480,
            scale: 1.2,
            autoAlpha: 0,
            duration: 0.28,
            ease: "power2.in",
          },
          0.42 + index * 0.2
        )
      })
    })

    mm.add("(min-width: 640px)", () => {
      cards.forEach((card) => {
        gsap.set(card, { left: card.dataset.desktopLeft ?? "50%" })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "center center",
          end: "+=400%",
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => setProgress(self.progress),
        },
        defaults: {
          ease: "power2.out",
        },
      })

      tl.to(header, { opacity: 0.1, y: -20, duration: 0.5 }, 0)

      const frontLeft = cards[0]
      const frontRight = cards[1]
      const queueLeft = cards[2]
      const queueRight = cards[3]

      tl.set(
        [frontLeft, frontRight],
        {
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 1,
          scale: 1,
          z: 0,
        },
        0
      )

      tl.set(
        [queueLeft, queueRight],
        {
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
          scale: 0.8,
          z: -90,
        },
        0
      )

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
        0.18
      )

      // Bring queue cards forward — nudged slightly closer to 30/70 for a balanced gap
      tl.to(queueLeft, { left: "30%", z: 0, scale: 1, autoAlpha: 1, duration: 0.34, ease: "power2.out" }, 0.22)
      tl.to(queueRight, { left: "70%", z: 0, scale: 1, autoAlpha: 1, duration: 0.34, ease: "power2.out" }, 0.26)

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
        0.68
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background pt-12 sm:pt-16">
      <div className="work-header mx-auto flex w-full max-w-[820px] flex-col items-center gap-3 px-6 text-center sm:px-8">
        <p className="text-[10px] font-mono font-bold tracking-[0.4em] text-zinc-400 uppercase">
          Selected Work
        </p>
        <h2
          className="max-w-[620px] text-3xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl"
          style={{ fontFamily: "var(--font-heading, serif)" }}
        >
          Problems we&apos;ve solved for others like you
        </h2>
        <div className="h-0.5 w-48 bg-zinc-100/20 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-zinc-900"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center px-4 sm:px-12">
        <div
          ref={panelRef}
          className="relative h-[80vh] w-[calc(100vw-2rem)] max-w-[1120px] overflow-hidden rounded-[12px] bg-[#3D3D3D] shadow-2xl sm:h-[76vh] sm:w-full"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)]" />
          <div className="relative z-10 h-full w-full perspective-[2000px]">
            <div className="absolute inset-0 transform-style-3d">
              <div className="relative h-full w-full transform-style-3d">
                {projects.map((project, i) => (
                  <Link
                    key={project.id}
                    href={`/case-studies/${project.slug}`}
                    className={`project-card card-${i} absolute top-1/2 left-1/2 w-[330px] h-[350px] lg:w-[400px] lg:h-[350px] overflow-hidden rounded-[22px] shadow-[0_38px_70px_-24px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform sm:left-auto`}
                    style={{ zIndex: projects.length - i }}
                    data-desktop-left={
                      i === 0 ? "30%" :
                        i === 1 ? "70%" :
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
                            className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#3D3D3D]"
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
