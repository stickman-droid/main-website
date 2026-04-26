"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
  radius?: number | string
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void
}

/**
 * GlowCard — wraps children in a card with an SVG animated border glow
 * on hover (blue theme). Place your inner content in `children`.
 *
 * Props:
 *  className      – applied to the outer wrapper div
 *  innerClassName – applied to the inner content div (bg-background)
 *  style          – applied to the outer wrapper div
 */
export function GlowCard({
  children,
  className,
  innerClassName,
  style,
  radius = 24,
  onPointerMove,
}: GlowCardProps) {
  const borderRadius = typeof radius === "number" ? `${radius}px` : radius

  return (
    <div
      className={cn("glow-card group relative overflow-hidden", className)}
      style={
        {
          "--glow-card-radius": borderRadius,
          ...style,
        } as React.CSSProperties
      }
      onPointerMove={onPointerMove}
    >
      {/* SVG animated border glow */}
      <svg
        className="glow-svg pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* blur layer */}
        <rect
          className="glow-rect glow-rect--blur"
          x="0" y="0"
          width="100%" height="100%"
          rx={borderRadius}
          fill="transparent"
          stroke="#3775E9"
        />
        {/* line layer */}
        <rect
          className="glow-rect glow-rect--line"
          x="0" y="0"
          width="100%" height="100%"
          rx={borderRadius}
          fill="transparent"
          stroke="#87B1FF"
        />
      </svg>

      {/* inner content */}
      <div className={cn("relative z-10", innerClassName)}>
        {children}
      </div>

      <style>{`
        .glow-card {
          --glow-line-length: 25%;
          --glow-blur-size: 8px;
          --animation-speed: 1400ms;
        }

        /* blur rect */
        .glow-rect--blur {
          stroke-width: 8px;
          filter: blur(var(--glow-blur-size));
          stroke-dasharray: var(--glow-line-length) 100%;
          stroke-dashoffset: 0;
          opacity: 0;
          transition: opacity var(--animation-speed) ease;
        }

        /* line rect */
        .glow-rect--line {
          stroke-width: 1.5px;
          stroke-dasharray: var(--glow-line-length) 100%;
          stroke-dashoffset: 0;
          opacity: 0;
          transition: opacity var(--animation-speed) ease;
        }

        .glow-card:hover .glow-rect--blur,
        .glow-card:hover .glow-rect--line {
          stroke-dashoffset: -150%;
          transition:
            stroke-dashoffset var(--animation-speed) ease-in,
            stroke-dasharray var(--animation-speed) ease-in;
          animation: glow-visibility var(--animation-speed) ease-in forwards;
        }

        @keyframes glow-visibility {
          0%, 100% { opacity: 0; }
          20%, 80%  { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
