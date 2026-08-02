"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Heading, Mono } from "@/components/ui/typography"
import { caseStudies } from "@/lib/case-studies-data"

gsap.registerPlugin(ScrollTrigger)

interface WorkSectionProps {
  category?: "Onboarding" | "Dashboard"
}

export function WorkSection({ category }: WorkSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const expandBgRef = React.useRef<HTMLDivElement>(null)
  const progressRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const clipperRef = React.useRef<HTMLDivElement>(null)

  const projects = React.useMemo(() => {
    let list = caseStudies;
    if (category === "Onboarding") {
      list = caseStudies.filter(cs => cs.tags.includes("Onboarding"));
    } else if (category === "Dashboard") {
      list = caseStudies.filter(cs => cs.tags.includes("Dashboard"));
    } else {
      // Home page: use the original 4 selected slugs
      const homeSlugs = [
        "germany-risk-dashboard",
        "digital-sme-bank-delays",
        "esg-compliance-fatigue",
        "more-speed-for-the-logistics-titan"
      ];
      list = caseStudies.filter(cs => homeSlugs.includes(cs.slug));
      list.sort((a, b) => homeSlugs.indexOf(a.slug) - homeSlugs.indexOf(b.slug));
    }

    return list.map((cs, index) => ({
      id: String(index + 1).padStart(2, "0"),
      title: cs.title,
      pills: cs.tags,
      image: cs.heroImage.image,
      slug: cs.slug,
    }));
  }, [category]);

  useGSAP(() => {
    if (!containerRef.current || !panelRef.current || !expandBgRef.current || !trackRef.current || !clipperRef.current) return

    const track = trackRef.current
    const header = containerRef.current.querySelector(".work-header")
    const progressBar = progressRef.current
    const expandBg = expandBgRef.current
    const clipper = clipperRef.current

    if (!header || !progressBar) return

    const setProgress = gsap.quickTo(progressBar, "scaleX", {
      duration: 0.12,
      ease: "none",
    })

    const getInset = () => {
      const H = window.innerHeight
      const W = window.innerWidth
      const isMobile = W < 640

      const boxH = H * (isMobile ? 0.75 : 0.70)
      const boxW = isMobile ? (W - 32) : Math.min(W - 32, 1200)

      const top = (H - boxH) / 2
      const left = (W - boxW) / 2

      return `inset(${top}px ${left}px ${top}px ${left}px round 12px)`
    }

    const cards = track.querySelectorAll(".project-card")
    const cta = track.querySelector(".cta-container")

    // Set initial states
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })

    // First 2 cards are visible initially, next 2 are hidden
    if (cards[2]) gsap.set(cards[2], { opacity: 0, y: 30 })
    if (cards[3]) gsap.set(cards[3], { opacity: 0, y: 30 })
    if (cta) gsap.set(cta, { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panelRef.current,
        start: "center center",
        end: "+=250%", // Slightly shorter scroll distance for snappier experience
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      },
    })

    // 1. Expand Background Box & Clipper
    tl.fromTo([expandBg, clipper], {
      clipPath: () => getInset(),
    }, {
      clipPath: "inset(0px 0px 0px 0px round 0px)",
      duration: 0.6,
      ease: "power2.inOut",
    }, 0)

    // Fade out header
    tl.to(header, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.inOut",
    }, 0.1)

    // 2. Scroll the track vertically (align bottom of track with bottom of screen)
    tl.fromTo(track,
      {
        y: () => {
          const H = panelRef.current?.offsetHeight || window.innerHeight
          const firstCard = track.querySelector(".project-card")
          const firstRowCenter = firstCard
            ? (firstCard as HTMLElement).offsetTop + ((firstCard as HTMLElement).offsetHeight / 2)
            : 200
          return (H / 2) - firstRowCenter
        }
      },
      {
        y: () => {
          const T = track.offsetHeight
          const H = panelRef.current?.offsetHeight || window.innerHeight
          // Scroll further down so the bottom of the track aligns near the bottom of the screen (leaving 48px padding)
          const yStart = (H / 2) - (track.querySelector(".project-card") ? (track.querySelector(".project-card") as HTMLElement).offsetTop + ((track.querySelector(".project-card") as HTMLElement).offsetHeight / 2) : 200)
          const yEnd = H - T + 48
          return Math.min(yStart, yEnd)
        },
        duration: 1.8,
        ease: "none",
      },
      0.5
    )

    // Reveal next set of cards in the middle of scroll
    if (cards[2] || cards[3]) {
      tl.to([cards[2], cards[3]].filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, 0.9)
    }

    // Reveal CTA near the end of scroll
    if (cta) {
      tl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 1.4)
    }

    // 3. Shrink Background Box & Clipper back to initial state immediately
    tl.to([expandBg, clipper], {
      clipPath: () => getInset(),
      duration: 0.6,
      ease: "power2.inOut",
    }, 2.3)

    // Simultaneously slide the track up so its bottom matches the contracted box bottom
    tl.to(track, {
      y: () => {
        const T = track.offsetHeight
        const H = panelRef.current?.offsetHeight || window.innerHeight
        const isMobile = window.innerWidth < 640
        const boxH = H * (isMobile ? 0.75 : 0.70)
        const bottomOfBox = H - ((H - boxH) / 2)
        return bottomOfBox - T
      },
      duration: 0.6,
      ease: "power2.inOut",
    }, 2.3)

    // Fade header back in
    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, 2.4)

  }, { scope: containerRef, dependencies: [projects] })

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background pt-12 sm:pt-6 -mb-16 sm:-mb-28">
      <div className="work-header mx-auto flex w-full max-w-[820px] flex-col items-center gap-3 px-6 text-center sm:px-8">
        <Mono className="text-[14px] font-bold tracking-[0.25em] text-[#8e8e8e] uppercase">
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
            className="absolute inset-0 bg-[#252525] shadow-2xl z-0"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)]" />
          </div>

          {/* Cards Content (Absolute Over Expansion with Clipper) */}
          <div
            ref={clipperRef}
            className="absolute inset-0 z-10 overflow-hidden flex flex-col justify-start items-center"
          >
            <div ref={trackRef} className="w-full flex flex-col items-center gap-8 sm:gap-12 pt-16 pb-8 sm:pt-24 sm:pb-12 px-4 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] w-full justify-items-center">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/case-studies/${project.slug}`}
                    className="project-card group relative block w-full max-w-[340px] h-[300px] xs:w-[360px] xs:h-[320px] md:max-w-[420px] md:h-[340px] xl:max-w-[480px] xl:h-[380px] overflow-hidden rounded-[22px] border border-white shadow-[0_24px_50px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-all duration-300 bg-[#1e1e1e]"
                  >
                    {/* Full-bleed image */}
                    <div className="relative h-full w-full bg-zinc-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Bottom overlay */}
                    <div
                      className="absolute inset-x-0 bottom-0 space-y-2.5 px-5 py-5"
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

              {/* View Case Studies CTA Container */}
              <div className="pt-6 cta-container">
                <Link
                  href="/case-studies"
                  className="inline-flex h-12 items-center justify-center rounded-[8px] bg-white px-8 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  View Case Studies
                </Link>
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
