import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Variant = 'sphere' | 'helix'

interface Props {
  isDark?: boolean
  variant?: Variant
  opacity?: number
}

/* ── Returns scene objects + cleanup for geometries/materials ── */
function buildSphere(scene: THREE.Scene, isDark: boolean) {
  const group = new THREE.Group()
  scene.add(group)

  const nodeCount = 110
  const positions: number[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = phi * i
    const r = 2.1
    positions.push(radius * Math.cos(theta) * r, y * r, radius * Math.sin(theta) * r)
  }

  const pointsGeo = new THREE.BufferGeometry()
  pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const pointsMat = new THREE.PointsMaterial({
    color: isDark ? 0x22d3ee : 0x0369a1,
    size: isDark ? 0.058 : 0.065,
    transparent: true,
    opacity: isDark ? 0.88 : 0.82,
    sizeAttenuation: true,
  })
  group.add(new THREE.Points(pointsGeo, pointsMat))

  // Connections between nearby nodes
  const maxDist = 1.15
  const linePos: number[] = []
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        linePos.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        )
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
  const lineMat = new THREE.LineBasicMaterial({
    color: isDark ? 0x67e8f9 : 0x0284c7,
    transparent: true,
    opacity: isDark ? 0.14 : 0.11,
  })
  group.add(new THREE.LineSegments(lineGeo, lineMat))

  return {
    group,
    dispose: () => {
      pointsGeo.dispose(); lineGeo.dispose()
      pointsMat.dispose(); lineMat.dispose()
      scene.remove(group)
    },
    tick: (t: number, mx: number, my: number) => {
      group.rotation.y = t * 0.1 + mx * 0.35
      group.rotation.x = Math.sin(t * 0.06) * 0.12 + my * 0.25
    },
  }
}

function buildHelix(scene: THREE.Scene, isDark: boolean) {
  const group = new THREE.Group()
  scene.add(group)

  const n = 55
  const helixPos: number[] = []
  const rungPos: number[] = []
  const lineA: number[] = []
  const lineB: number[] = []

  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * Math.PI * 4 - Math.PI * 2
    const y = (i / (n - 1)) * 4.2 - 2.1
    const r = 1.1
    const ax = Math.cos(t) * r, az = Math.sin(t) * r
    const bx = Math.cos(t + Math.PI) * r, bz = Math.sin(t + Math.PI) * r

    helixPos.push(ax, y, az, bx, y, bz)
    if (i % 5 === 0) rungPos.push(ax, y, az, bx, y, bz)

    if (i < n - 1) {
      const t2 = ((i + 1) / (n - 1)) * Math.PI * 4 - Math.PI * 2
      const y2 = ((i + 1) / (n - 1)) * 4.2 - 2.1
      lineA.push(ax, y, az, Math.cos(t2) * r, y2, Math.sin(t2) * r)
      lineB.push(bx, y, bz, Math.cos(t2 + Math.PI) * r, y2, Math.sin(t2 + Math.PI) * r)
    }
  }

  const makeGeo = (pos: number[]) => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    return g
  }
  const makeLine = (pos: number[], color: number, opacity: number) => {
    const g = makeGeo(pos)
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    group.add(new THREE.LineSegments(g, m))
    return { g, m }
  }

  const helixGeo = makeGeo(helixPos)
  const helixMat = new THREE.PointsMaterial({
    color: isDark ? 0xa855f7 : 0x7c3aed,
    size: isDark ? 0.06 : 0.07,
    transparent: true,
    opacity: isDark ? 0.85 : 0.78,
    sizeAttenuation: true,
  })
  group.add(new THREE.Points(helixGeo, helixMat))

  const la = makeLine(lineA, isDark ? 0xc084fc : 0x7c3aed, isDark ? 0.32 : 0.26)
  const lb = makeLine(lineB, isDark ? 0x818cf8 : 0x4f46e5, isDark ? 0.28 : 0.22)
  const rungGeo = makeGeo(rungPos)
  const rungMat = new THREE.LineBasicMaterial({ color: isDark ? 0xe879f9 : 0x9333ea, transparent: true, opacity: isDark ? 0.20 : 0.14 })
  group.add(new THREE.LineSegments(rungGeo, rungMat))

  return {
    group,
    dispose: () => {
      helixGeo.dispose(); helixMat.dispose()
      la.g.dispose(); la.m.dispose()
      lb.g.dispose(); lb.m.dispose()
      rungGeo.dispose(); rungMat.dispose()
      scene.remove(group)
    },
    tick: (t: number, mx: number, my: number) => {
      group.rotation.y = t * 0.14 + mx * 0.3
      group.rotation.x = my * 0.2
    },
  }
}

export default function ThreeScene({ isDark = true, variant = 'sphere', opacity = 1 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 400

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 100)
    camera.position.z = variant === 'helix' ? 5.5 : 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const built = variant === 'sphere'
      ? buildSphere(scene, isDark)
      : buildHelix(scene, isDark)

    let mouseX = 0
    let mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5)
      mouseY = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const clock = new THREE.Clock()
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      built.tick(clock.getElapsedTime(), mouseX, mouseY)
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', handleResize)
      built.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [isDark, variant])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}
