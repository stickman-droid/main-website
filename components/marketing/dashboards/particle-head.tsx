"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  AmbientLight,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  Points,
  PointsMaterial,
} from "three"
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"

function ParticleModel() {
  const pointsRef = useRef<Points<BufferGeometry, PointsMaterial> | null>(null)
  const obj = useLoader(OBJLoader, "https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj") as Group

  const originalPositions = useMemo(() => {
    if (!obj) return null

    const basePositions: number[] = []
    obj.traverse((child: any) => {
      if (!(child instanceof Mesh)) return

      const pos = child.geometry.attributes.position
      if (!pos) return

      const scale = 8.8
      for (let i = 0; i < pos.count; i++) {
        basePositions.push(
          pos.getX(i) * scale,
          pos.getY(i) * scale,
          pos.getZ(i) * scale
        )
      }
    })

    const positions: number[] = [...basePositions]
    const stride = 3
    const sourcePointCount = basePositions.length / stride

    // Densify the cloud by adding interpolated points with a small jitter.
    for (let i = 0; i < sourcePointCount - 1; i += 5) {
      const a = i * stride
      const b = (i + 1) * stride

      const ax = basePositions[a]
      const ay = basePositions[a + 1]
      const az = basePositions[a + 2]
      const bx = basePositions[b]
      const by = basePositions[b + 1]
      const bz = basePositions[b + 2]

      positions.push(
        ax * 0.67 + bx * 0.33 + (Math.random() - 0.5) * 0.22,
        ay * 0.67 + by * 0.33 + (Math.random() - 0.5) * 0.22,
        az * 0.67 + bz * 0.33 + (Math.random() - 0.5) * 0.22,
      )

    }

    return new Float32Array(positions)
  }, [obj])

  const pointsObject = useMemo(() => {
    if (!originalPositions) return null

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new Float32BufferAttribute(originalPositions, 3))

    const material = new PointsMaterial({
      color: "#252525",
      size: 1.35,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })

    return new Points(geometry, material)
  }, [originalPositions])

  useEffect(() => {
    return () => {
      if (pointsObject) {
        pointsObject.geometry.dispose()
        pointsObject.material.dispose()
      }
    }
  }, [pointsObject])

  useFrame((state) => {
    if (!pointsRef.current || !originalPositions) return

    const points = pointsRef.current
    const { x: mouseX, y: mouseY } = state.pointer

    // Head rotation to follow mouse
    const targetRotX = mouseY * -0.3
    const targetRotY = mouseX * 0.4

    points.rotation.x += (targetRotX - points.rotation.x) * 0.08
    points.rotation.y += (targetRotY - points.rotation.y) * 0.08

    // Camera move slightly to add parallax
    const camTargetX = mouseX * 15
    const camTargetY = mouseY * 12

    state.camera.position.x += (camTargetX - state.camera.position.x) * 0.05
    state.camera.position.y += (-camTargetY - state.camera.position.y) * 0.05
    state.camera.lookAt(0, 0, 0)
  })

  if (!pointsObject) return null
  return <primitive ref={pointsRef} object={pointsObject} />
}

export function ParticleHead() {
  return (
    <div className="relative h-full w-full pointer-events-none sm:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 470], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <primitive object={new AmbientLight(0xffffff, 0.5)} />
        <Suspense fallback={null}>
          <ParticleModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
