"use client"

import * as React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: "01",
    title: "More Speed For The Logistics Titan",
    pills: ["Supply Chain", "Onboarding"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "Streamlining Health Tech Dashboards",
    pills: ["HealthTech", "Dashboard"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "Retention Magic for Fintech App",
    pills: ["Fintech", "Retention"],
    image: "https://images.unsplash.com/photo-1551288049-bb1c00451a43?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "04",
    title: "Scaling SaaS Infrastructure",
    pills: ["SaaS", "Optimization"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
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
          autoAlpha: 0.16,
          scale: 0.88,
          z: -240,
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

      tl.to(
        [queueLeft, queueRight],
        {
          z: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.34,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.22
      )

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
                  <article
                    key={project.id}
                    className={`project-card card-${i} absolute top-1/2 left-1/2 w-[min(85vw,360px)] rounded-[26px] bg-background p-3 shadow-[0_38px_70px_-24px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform sm:w-[300px] sm:left-auto lg:w-[360px]`}
                    style={{
                      zIndex: projects.length - i,
                    }}
                    data-desktop-left={i === 0 || i === 2 ? "32%" : "68%"}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-zinc-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover grayscale opacity-90"
                      />
                    </div>

                    <div className="mt-4 flex flex-col space-y-3 px-2 pb-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none">
                          Project {project.id}
                        </span>
                        <h3 className="line-clamp-2 text-base leading-tight font-bold tracking-tight text-[#3D3D3D] sm:text-lg">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-[18px] bg-[#F5F5F5] px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
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