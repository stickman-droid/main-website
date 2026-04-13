"use client"

import * as React from "react"

type Star = {
  x: number
  y: number
  z: number
  ox: number
  oy: number
  brightness: number
  trail: number
}

const COLOR = "61, 61, 61"

function createStars(count: number, spreadX: number, spreadY: number, depth: number) {
  return Array.from({ length: count }, () => {
    const x = (Math.random() - 0.5) * spreadX
    const y = (Math.random() - 0.5) * spreadY

    return {
      x,
      y,
      z: Math.random() * depth,
      ox: x,
      oy: y,
      brightness: 0.35 + Math.random() * 0.65,
      trail: 0.7 + Math.random() * 0.9,
    }
  })
}

export function WarpField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let centerX = 0
    let centerY = 0
    let inView = true

    const fieldDepth = 8000
    const fovMax = 300
    const fovMin = 210
    let fov = fovMax
    let rotation = 0
    let rotationVelocity = 0
    let speed = 2
    let targetSpeed = 2
    let pointerDown = false
    let pointerActive = false
    let lastPointerX = 0
    let wheelTimeout = 0

    let bgStars: Star[] = []
    let stars: Star[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      centerX = width / 2
      centerY = height / 2

      bgStars = createStars(Math.max(500, Math.floor((width * height) / 850)), width * 20, height * 8, fieldDepth)
      stars = createStars(Math.max(1800, Math.floor((width * height) / 180)), width * 10, height * 10, fieldDepth)
    }

    const drawTrail = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)

      speed += (targetSpeed - speed) * 0.1
      if (pointerDown) {
        targetSpeed += 1.8 // Accelerate during long press
      } else {
        targetSpeed *= 0.96 // Decay when released
      }
      targetSpeed = Math.max(2, Math.min(targetSpeed, 300))

      fov += ((pointerActive ? fovMin : fovMax) - fov) * 0.08
      rotation += rotationVelocity
      rotationVelocity *= 0.92 // Steady decay for smooth turning

      const cos = Math.cos(rotation)
      const sin = Math.sin(rotation)

      for (const star of bgStars) {
        const scale = fov / (fov + star.z)
        const x2d = (star.x * scale) + centerX
        const y2d = (star.y * scale) + centerY

        if (x2d > 0 && x2d < width && y2d > 0 && y2d < height) {
          ctx.fillStyle = `rgba(${COLOR}, ${0.12 + star.brightness * 0.18})`
          ctx.fillRect(x2d, y2d, 1.2, 1.2)
        }
      }

      for (const star of stars) {
        star.z -= speed

        if (star.z < -fov + 1) {
          star.z = fieldDepth
          star.x = star.ox
          star.y = star.oy
        }

        const rotatedX = (cos * star.ox) + (sin * star.oy)
        const rotatedY = (cos * star.oy) - (sin * star.ox)
        star.x += (rotatedX - star.x) * 0.08
        star.y += (rotatedY - star.y) * 0.08

        const scale = fov / (fov + star.z)
        const x2d = (star.x * scale) + centerX
        const y2d = (star.y * scale) + centerY

        if (x2d <= 0 || x2d >= width || y2d <= 0 || y2d >= height) {
          continue
        }

        const distancePercent = 1 - (star.z / fieldDepth)
        const alpha = 0.12 + distancePercent * 0.72 * star.brightness
        const size = Math.max(1, distancePercent * 2.4)

        ctx.fillStyle = `rgba(${COLOR}, ${alpha})`
        ctx.fillRect(x2d, y2d, size, size)

        if (speed > 8) {
          const warp = speed * (speed / 110) * star.trail
          const trailZ = star.z + warp
          const trailScale = fov / (fov + trailZ)
          const tx = (star.x * trailScale) + centerX
          const ty = (star.y * trailScale) + centerY
          drawTrail(x2d, y2d, tx, ty, Math.min(0.8, alpha))
        }
      }

      raf = window.requestAnimationFrame(draw)
    }

    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId)
      pointerDown = true
      pointerActive = true
      lastPointerX = event.clientX
      targetSpeed = Math.max(targetSpeed, 110)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return
      const deltaX = event.clientX - lastPointerX
      lastPointerX = event.clientX
      // Clicking and dragging turns the animation left or right
      rotationVelocity += deltaX * 0.0015
      targetSpeed = Math.max(targetSpeed, 80)
    }

    const endPointer = (event?: PointerEvent) => {
      if (event && canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
      pointerDown = false
      pointerActive = false
    }

    const onWheel = (event: WheelEvent) => {
      if (!inView) return
      // On scroll animation plays with speed of mousewheel
      const delta = Math.min(200, Math.abs(event.deltaY))
      targetSpeed = Math.max(targetSpeed, 15 + delta * 2.2)
      pointerActive = true

      window.clearTimeout(wheelTimeout)
      wheelTimeout = window.setTimeout(() => {
        pointerActive = false
      }, 180)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
      },
      { threshold: 0.2 }
    )

    resize()
    observer.observe(canvas)
    draw()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", endPointer)
    canvas.addEventListener("pointercancel", endPointer)
    canvas.addEventListener("pointerleave", endPointer)
    window.addEventListener("wheel", onWheel, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(wheelTimeout)
      resizeObserver.disconnect()
      observer.disconnect()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", endPointer)
      canvas.removeEventListener("pointercancel", endPointer)
      canvas.removeEventListener("pointerleave", endPointer)
      window.removeEventListener("wheel", onWheel)
    }
  }, [])

  return (
    <div className="pointer-events-auto absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
      />
    </div>
  )
}
