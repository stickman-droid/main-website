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
  const [scrollProgress, setScrollProgress] = React.useState(0)

  useGSAP(() => {
    if (!containerRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".project-card")
    const header = ".work-header"

    gsap.set(cards, {
      transformPerspective: 1400,
      transformOrigin: "50% 50%",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=260%",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => setScrollProgress(self.progress),
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
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
      },
      0
    )

    tl.set(
      [queueLeft, queueRight],
      {
        xPercent: -50,
        yPercent: -50,
        opacity: 0.42,
        scale: 0.82,
        z: -520,
        filter: "blur(3px)",
      },
      0
    )

    tl.to(
      [frontLeft, frontRight],
      {
        z: 1250,
        scale: 2.1,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.in",
      },
      0.18
    )

    tl.to(
      [queueLeft, queueRight],
      {
        z: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.42,
        stagger: 0.04,
        ease: "power3.out",
      },
      0.28
    )

    tl.to(
      [queueLeft, queueRight],
      {
        z: 1250,
        scale: 2.1,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.in",
      },
      0.62
    )

    ScrollTrigger.refresh()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden">
      {/* HUD Progress */}
      <div className="work-header absolute top-12 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none mix-blend-difference">
        <p className="text-[10px] font-mono font-bold tracking-[0.4em] text-zinc-400 uppercase">
          Case Studies
        </p>
        <div className="h-0.5 w-48 bg-zinc-100/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* FIXED Background Box */}
      <div className="absolute inset-x-6 inset-y-12 z-0 rounded-[2.5rem] bg-[#3D3D3D] shadow-2xl sm:inset-x-12 sm:inset-y-20" />

      <div className="relative h-full w-full max-w-[1300px] mx-auto z-10 perspective-[2000px]">
        <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
          <div className="relative h-full w-full max-w-[840px] transform-style-3d">
            {projects.map((project, i) => (
              <article
                key={project.id}
                className={`project-card card-${i} absolute top-1/2 left-1/2 w-[230px] rounded-[26px] bg-white p-3 shadow-[0_38px_70px_-24px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform sm:w-[260px] lg:w-[300px]`}
                style={{
                  zIndex: projects.length - i,
                  transform:
                    i === 0
                      ? "translate(-115%, -50%)"
                      : i === 1
                        ? "translate(15%, -50%)"
                        : i === 2
                          ? "translate(-92%, -50%)"
                          : "translate(-8%, -50%)",
                }}
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-zinc-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover grayscale opacity-90 transition-all duration-700"
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

      <style jsx global>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  )
}
