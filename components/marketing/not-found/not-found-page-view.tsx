"use client"

import Image from "next/image"
import Link from "next/link"
import { NoiseAnimation } from "./noise-animation"

export function NotFoundPageView() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center lg:-mt-6 xl:-mt-8">

      {/* Header Heading */}
      <div>
        <h1
          className="text-2xl sm:text-3xl xl:text-5xl font-semibold text-[#1a1a1a] tracking-tight text-center"
          style={{ fontFamily: 'var(--font-heading, serif)' }}
        >
          You&apos;re Not Supposed To Be Here!
        </h1>
      </div>

      {/* Retro Computer Section */}
      <div className="relative w-full max-w-[640px] aspect-[4/3] flex items-center justify-center">

        {/* Computer SVG Image */}
        <div className="relative w-full h-full -mt-8">
          <Image
            src="/404_Image.svg"
            alt="Vintage Computer"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Noise Animation Overlay on Screen Area */}
        <div
          className="absolute z-10 w-[29%] h-[30.4%] lg:h-[31.4%] bg-black overflow-hidden rounded-[2px] left-1/2 -translate-x-1/2 top-[14.4%] lg:top-[15.6%]"
        >
          <NoiseAnimation
            className="h-full w-full opacity-70"
            density={0.4}
            frames={5}
          />
        </div>

      </div>

      {/* Button Section */}
      <div className="-mt-10 xl:-mt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-10 py-3.5 bg-[#1a1a1a] text-white radius-[6px] font-medium transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
        >
          Let&apos;s Go Home
        </Link>
      </div>

    </main>
  )
}

