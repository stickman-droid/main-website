"use client";

import * as React from "react";

type Dot = {
  baseX: number;
  baseY: number;
  baseRadius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
};

type InteractiveDotGridProps = {
  className?: string;
};

const MAX_DOT_PUSH = 16;
const INFLUENCE_RADIUS = 120;

export function InteractiveDotGrid({
  className,
}: InteractiveDotGridProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const parent = canvas.parentElement;

    if (!parent) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    const buildDots = () => {
      const nextDots: Dot[] = [];
      const spacing = width >= 1024 ? 42 : width >= 640 ? 34 : 28;
      const radius = width >= 1024 ? 1.55 : 1.3;
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = offsetX + col * spacing;
          const y = offsetY + row * spacing;

          nextDots.push({
            baseX: x,
            baseY: y,
            baseRadius: radius,
            x,
            y,
            vx: 0,
            vy: 0,
            radius,
            targetRadius: radius,
          });
        }
      }

      dots = nextDots;
    };

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;

      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      buildDots();
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const bounds = parent.getBoundingClientRect();
      pointer.x = clientX - bounds.left;
      pointer.y = clientY - bounds.top;
      pointer.active = true;
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(24, 24, 27, 0.24)";

      for (const dot of dots) {
        if (pointer.active) {
          const dx = dot.baseX - pointer.x;
          const dy = dot.baseY - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < INFLUENCE_RADIUS) {
            const force = (1 - distance / INFLUENCE_RADIUS) * MAX_DOT_PUSH;
            dot.vx += (dx / distance) * force * 0.12;
            dot.vy += (dy / distance) * force * 0.12;
            dot.targetRadius = 2.35;
          } else {
            dot.targetRadius = dot.baseRadius;
          }
        } else {
          dot.targetRadius = dot.baseRadius;
        }

        dot.vx += (dot.baseX - dot.x) * 0.08;
        dot.vy += (dot.baseY - dot.y) * 0.08;
        dot.vx *= 0.82;
        dot.vy *= 0.82;
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.radius += (dot.targetRadius - dot.radius) * 0.16;

        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    render();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
