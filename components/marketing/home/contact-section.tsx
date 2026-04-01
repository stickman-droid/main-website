"use client"

import * as React from "react"

export function ContactSection() {
  const pills = [
    "Dashboard Confidence",
    "Product Strategy Check",
    "Feature Validation",
    "UX Review",
    "Design Direction",
    "First Mile Experience"
  ]

  return (
    <section className="flex w-full justify-center bg-white py-8">
      <div className="flex w-full max-w-[950px] flex-col px-6">
        <div className="mb-8 flex w-full max-w-[640px] flex-col space-y-4 text-left">
          <p className="text-[12px] font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
            The First Move
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#3D3D3D] sm:text-[42px] leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading, serif)' }}
          >
            Not sure where to start? Let&apos;s talk.
          </h2>
        </div>

        <div className="mb-12 grid w-full grid-cols-1 gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-10">
          <p className="max-w-[440px] text-[16px] leading-relaxed text-zinc-500 font-normal">
            You don&apos;t always need a full team; sometimes you just need a moment of clarity.
            Think of this as a dedicated space to talk through your challenges.
            We&apos;ll untangle the issue together, identifying exactly where to lean in so you can move forward with confidence.
          </p>

          <div className="flex flex-wrap items-start content-start gap-3">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-[#F5F5F5] px-5 py-2.5 text-[12px] font-semibold text-zinc-600 whitespace-nowrap"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center space-y-4">
          <button className="h-14 px-10 rounded-xl bg-[#1A1A1A] text-white font-bold text-[15px] shadow-lg transition-all hover:bg-black hover:scale-[1.02]">
            Book Your Free Call
          </button>
          <p className="text-[10px] font-mono font-regular tracking-[0.3em] text-[#3D3D3D] uppercase">
            No Pitch, Just Value
          </p>
        </div>
      </div>
    </section>
  )
}
