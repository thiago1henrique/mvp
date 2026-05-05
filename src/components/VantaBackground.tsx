import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// @ts-ignore — vanta ships no TS declarations
import WAVES from 'vanta/dist/vanta.waves.min'

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fxRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    if (fxRef.current || !containerRef.current) return
    try {
      fxRef.current = WAVES({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x1e0608,       // very dark crimson — matches #DC143C accent
        shininess: 30,
        waveHeight: 22,
        waveSpeed: 0.42,
        zoom: 0.82,
      })
    } catch {
      // WebGL not available — section falls back to solid bg
    }
    return () => {
      fxRef.current?.destroy()
      fxRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
