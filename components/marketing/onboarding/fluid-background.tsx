"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

class Cell {
  x: number
  y: number
  r: number
  col = 0
  row = 0
  xv = 0
  yv = 0
  pressure = 0
  up?: Cell
  left?: Cell
  up_left?: Cell
  up_right?: Cell
  down?: Cell
  right?: Cell
  down_left?: Cell
  down_right?: Cell

  constructor(x: number, y: number, res: number) {
    this.x = x
    this.y = y
    this.r = res
  }
}

class Particle {
  x: number
  y: number
  px: number
  py: number
  xv = 0
  yv = 0

  constructor(x: number, y: number) {
    this.x = this.px = x
    this.y = this.py = y
  }
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Status of the mouse cursor
    const mouse = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      px: 0,
      py: 0,
      down: false,
    }

    let canvasWidth = window.innerWidth
    let canvasHeight = window.innerHeight
    let pixelRatio = 1
    const resolution = window.innerWidth < 640 ? 14 : 12
    const penSize = window.innerWidth < 640 ? 48 : 56
    const cursorInfluence = 0.13
    const ambientDrift = 0.008
    let numCols = Math.ceil(canvasWidth / resolution)
    let numRows = Math.ceil(canvasHeight / resolution)
    const speckCount = window.innerWidth < 640 ? 5000 : 11000
    let tick = 0

    let vecCells: Cell[][] = []
    let particles: Particle[] = []

    const init = () => {
      canvasWidth = window.innerWidth
      canvasHeight = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.floor(canvasWidth * pixelRatio)
      canvas.height = Math.floor(canvasHeight * pixelRatio)
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      numCols = Math.ceil(canvasWidth / resolution)
      numRows = Math.ceil(canvasHeight / resolution)

      particles = []
      for (let i = 0; i < speckCount; i++) {
        const particle = new Particle(Math.random() * canvasWidth, Math.random() * canvasHeight)
        particle.xv = Math.random() * 0.6 - 0.3
        particle.yv = Math.random() * 0.6 - 0.3
        particles.push(particle)
      }

      vecCells = []
      for (let col = 0; col < numCols; col++) {
        vecCells[col] = []
        for (let row = 0; row < numRows; row++) {
          const cell = new Cell(col * resolution, row * resolution, resolution)
          cell.col = col
          cell.row = row
          cell.xv = Math.random() * 0.1 - 0.05;
          cell.yv = Math.random() * 0.1 - 0.05;
          vecCells[col][row] = cell
        }
      }

      for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
          const cell = vecCells[col][row]
          const row_up = (row - 1 >= 0) ? row - 1 : numRows - 1
          const col_left = (col - 1 >= 0) ? col - 1 : numCols - 1
          const col_right = (col + 1 < numCols) ? col + 1 : 0

          cell.up = vecCells[col][row_up]
          cell.left = vecCells[col_left][row]
          cell.up_left = vecCells[col_left][row_up]
          cell.up_right = vecCells[col_right][row_up]

          cell.up.down = cell
          cell.left.right = cell
          cell.up_left.down_right = cell
          cell.up_right.down_left = cell
        }
      }
    }

    const updateParticle = () => {
      ctx.lineWidth = 1.5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.x >= 0 && p.x < canvasWidth && p.y >= 0 && p.y < canvasHeight) {
          const col = Math.floor(p.x / resolution)
          const row = Math.floor(p.y / resolution)

          if (vecCells[col] && vecCells[col][row]) {
            const cell = vecCells[col][row]
            const ax = (p.x % resolution) / resolution
            const ay = (p.y % resolution) / resolution

            p.xv += (1 - ax) * cell.xv * 0.05
            p.yv += (1 - ay) * cell.yv * 0.05

            if (cell.right) {
              p.xv += ax * cell.right.xv * 0.05
              p.yv += ax * cell.right.yv * 0.05
            }
            if (cell.down) {
              p.xv += ay * cell.down.xv * 0.05
              p.yv += ay * cell.down.yv * 0.05
            }

            p.xv += Math.sin(tick + p.y * 0.01) * 0.01
            p.yv += Math.cos(tick * 0.9 + p.x * 0.01) * 0.01

            p.x += p.xv
            p.y += p.yv

            const dx = p.px - p.x
            const dy = p.py - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const limit = Math.random() * 0.5

            if (dist > limit) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p.px, p.py)
              ctx.stroke()
            } else {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p.x + limit, p.y + limit)
              ctx.stroke()
            }

            p.px = p.x
            p.py = p.y
          }
        } else {
          p.x = p.px = Math.random() * canvasWidth
          p.y = p.py = Math.random() * canvasHeight
          p.xv = Math.random() * 0.4 - 0.2
          p.yv = Math.random() * 0.4 - 0.2
        }
        p.xv *= 0.84
        p.yv *= 0.84
      }
    }

    const updatePressure = (cell: Cell) => {
      const pressure_x = (
        (cell.up_left?.xv || 0) * 0.5
        + (cell.left?.xv || 0)
        + (cell.down_left?.xv || 0) * 0.5
        - (cell.up_right?.xv || 0) * 0.5
        - (cell.right?.xv || 0)
        - (cell.down_right?.xv || 0) * 0.5
      )
      const pressure_y = (
        (cell.up_left?.yv || 0) * 0.5
        + (cell.up?.yv || 0)
        + (cell.up_right?.yv || 0) * 0.5
        - (cell.down_left?.yv || 0) * 0.5
        - (cell.down?.yv || 0)
        - (cell.down_right?.yv || 0) * 0.5
      )
      cell.pressure = (pressure_x + pressure_y) * 0.25
    }

    const updateVelocity = (cell: Cell) => {
      cell.xv += (
        (cell.up_left?.pressure || 0) * 0.5
        + (cell.left?.pressure || 0)
        + (cell.down_left?.pressure || 0) * 0.5
        - (cell.up_right?.pressure || 0) * 0.5
        - (cell.right?.pressure || 0)
        - (cell.down_right?.pressure || 0) * 0.5
      ) * 0.25

      cell.yv += (
        (cell.up_left?.pressure || 0) * 0.5
        + (cell.up?.pressure || 0)
        + (cell.up_right?.pressure || 0) * 0.5
        - (cell.down_left?.pressure || 0) * 0.5
        - (cell.down?.pressure || 0)
        - (cell.down_right?.pressure || 0) * 0.5
      ) * 0.25

      const driftX = Math.sin(tick + cell.row * 0.18) * ambientDrift
      const driftY = Math.cos(tick * 0.85 + cell.col * 0.16) * ambientDrift

      cell.xv += driftX + (Math.random() - 0.5) * 0.006
      cell.yv += driftY + (Math.random() - 0.5) * 0.006

      cell.xv *= 0.99
      cell.yv *= 0.99
    }

    const changeCellVelocity = (cell: Cell, mvelX: number, mvelY: number) => {
      const dx = cell.x - mouse.x
      const dy = cell.y - mouse.y
      const dist = Math.sqrt(dy * dy + dx * dx)

      if (dist < penSize) {
        const actualDist = dist < 4 ? penSize : dist
        const power = (penSize / actualDist) * cursorInfluence
        cell.xv += mvelX * power
        cell.yv += mvelY * power
      }
    }

    const draw = () => {
      tick += 0.012
      mouse.x += (mouse.tx - mouse.x) * 0.22
      mouse.y += (mouse.ty - mouse.y) * 0.22
      const mouse_xv = mouse.x - mouse.px
      const mouse_yv = mouse.y - mouse.py

      for (let i = 0; i < vecCells.length; i++) {
        for (let j = 0; j < vecCells[i].length; j++) {
          const cell = vecCells[i][j]
          // Modified: remove mouse.down check as requested
          changeCellVelocity(cell, mouse_xv, mouse_yv)
          updatePressure(cell)
        }
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.strokeStyle = "rgba(61, 61, 61, 0.48)"

      updateParticle()

      for (let i = 0; i < vecCells.length; i++) {
        for (let j = 0; j < vecCells[i].length; j++) {
          updateVelocity(vecCells[i][j])
        }
      }

      mouse.px = mouse.x
      mouse.py = mouse.y
      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
    }

    const handleResize = () => {
      init()
    }

    init()
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    draw()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
