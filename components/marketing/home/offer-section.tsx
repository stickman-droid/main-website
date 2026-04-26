"use client"

import * as React from "react"

export function OfferSection() {
  const offers = [
    {
      id: "01",
      title: "Activation",
      description: "We improve onboarding flows so new users reach their first real moment of value faster. Less confusion. Less drop-off. More people who actually understand why your product exists."
    },
    {
      id: "02",
      title: "Retention",
      description: "We simplify (without loosing depth) and improve your dashboard experience so users always know where they are, what to do next, and why your product matters to their day."
    },
    {
      id: "03",
      title: "Growth Partner",
      description: "Already live but losing users? We work alongside your team as an on-call UX partner. We review, validate, and course-correct your product experience on a need basis."
    }
  ]

  return (
    <section className="flex w-full justify-center bg-background py-12 sm:py-8">
      <div className="flex w-full max-w-[1150px] flex-col space-y-5 px-6 lg:h-[480px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-[14px] font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
            Our Fix
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            What we offer you
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`group relative flex flex-col space-y-6 overflow-hidden rounded-[28px] px-4 py-8 transition-all duration-500 ease-out motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 sm:px-8 hover:-translate-y-2 hover:bg-zinc-50/70 ${index !== 0 ? "md:border-l border-[#E0E0E0] border-1px" : ""
                }`}
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-zinc-300 via-zinc-900/20 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <span className="text-4xl font-mono font-regular tracking-tighter text-[#E0E0E0] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#B9B9B9] sm:text-6xl">
                {offer.id}
              </span>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#3D3D3D] transition-colors duration-300 group-hover:text-black">
                  {offer.title}
                </h3>
                <p className="font-sans text-[15px] font-normal leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="flex justify-center pt-4">
          <p className="max-w-[450px] font-sans text-center text-sm font-medium text-zinc-400 leading-relaxed">
            We don&apos;t do everything. We do two things with obsessive precision: The Flow and The View.
            We build onboarding that connects and dashboards that clarify.
            For teams ready to stop guessing and start scaling.
          </p>
        </div>
      </div>
    </section>
  )
}

