"use client"

import React, { useEffect, useRef } from "react"

export function NoiseAnimation({
  className = "",
  density = 0.1,
  frames = 4,
  opacity = 1
}: {
  className?: string
  density?: number
  frames?: number
  opacity?: number
}) {
  const outputRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!outputRef.current || !canvasRef.current) return

    const output = outputRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const noiseWidth = 1
    const noiseHeight = 1

    // Setup canvas
    const width = output.offsetWidth || 320
    const height = (output.offsetHeight || 320) * frames
    canvas.width = width
    canvas.height = height

    // Draw Noise
    for (let i = width; i >= 0; i -= noiseWidth) {
      for (let j = height; j >= 0; j -= noiseHeight) {
        if (Math.random() > density) continue
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`
        ctx.fillRect(i, j, noiseWidth, noiseHeight)
      }
    }

    const img = canvas.toDataURL()
    output.style.backgroundImage = `url(${img})`
    output.style.imageRendering = "pixelated"
    output.style.backgroundSize = "100%"

    let count = 0
    let animationId: number

    const render = () => {
      count++
      const offset = Math.floor(Math.random() * 100)
      output.style.backgroundPosition = `0 ${offset * count}%`
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [density, frames])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div
        ref={outputRef}
        className="h-full w-full"
        style={{ opacity }}
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
