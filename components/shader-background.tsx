"use client"

import { Shader, ChromaFlow } from "shaders/react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useRef, useEffect, useState } from "react"

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkReady = () => {
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsReady(true)
          return true
        }
      }
      return false
    }

    if (checkReady()) return

    const interval = setInterval(() => {
      if (checkReady()) clearInterval(interval)
    }, 100)

    const fallback = setTimeout(() => setIsReady(true), 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"}`}
      style={{ contain: "strict" }}
    >
      {/* Base layer: MeshGradient with full MOLT palette */}
      <MeshGradient
        colors={[
          "#070501", // MOLT BLACK
          "#191411", // MOLT BARK
          "#3d3a30", // TAUPE
          "#4a5260", // ICE
          "#303c4b", // WATER
          "#915a2e", // CLAY
          "#3b4a36", // MOSS
          "#4fb1c5", // BOLT
        ]}
        distortion={0.4}
        swirl={0.07}
        grainMixer={0.18}
        grainOverlay={0.10}
        speed={0.15}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {/* Mouse-reactive layer on top */}
      <div className="absolute inset-0" style={{ mixBlendMode: "screen" }}>
        <Shader className="h-full w-full">
          <ChromaFlow
            baseColor="#070501"
            upColor="#4fb1c5"
            downColor="#4a5260"
            leftColor="#915a2e"
            rightColor="#303c4b"
            intensity={0.50}
            radius={1.4}
            momentum={30}
            maskType="alpha"
            opacity={0.55}
          />
        </Shader>
      </div>
      {/* Dark overlay to deepen the overall look */}
      <div className="absolute inset-0 bg-[#070501]/60" />
    </div>
  )
}
