import { useRef, useEffect } from 'react'

interface Jelly {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  phase: number
  hue: number
  alpha: number
  tCount: number
  tLengths: number[]
  tOffsets: number[]
}

function mkJelly(w: number, h: number, startMid?: boolean): Jelly {
  const r = 18 + Math.random() * 48
  const tCount = 8 + Math.floor(Math.random() * 6)
  return {
    x: Math.random() * w,
    y: startMid ? Math.random() * h : h + r * 3,
    r,
    vy: 0.12 + Math.random() * 0.28,
    vx: (Math.random() - 0.5) * 0.22,
    phase: Math.random() * Math.PI * 2,
    hue: 188 + Math.random() * 72,
    alpha: 0.09 + Math.random() * 0.17,
    tCount,
    tLengths: Array.from({ length: tCount }, () => r * (1.0 + Math.random() * 0.9)),
    tOffsets: Array.from({ length: tCount }, () => Math.random() * Math.PI * 2),
  }
}

function drawJelly(ctx: CanvasRenderingContext2D, j: Jelly, t: number, isDark: boolean) {
  const alphaScale = isDark ? 1 : 4.2
  const lightnessBase = isDark ? 88 : 48
  const lightnessShift = isDark ? 0 : -20
  const satBase = isDark ? 85 : 78

  const pulse = 0.88 + Math.sin(t * 0.0014 + j.phase) * 0.12
  const bw = j.r * pulse
  const bh = j.r * 0.55
  const a = j.alpha * alphaScale

  ctx.save()
  ctx.translate(j.x, j.y)

  // Bell shape
  ctx.beginPath()
  ctx.moveTo(-bw, 0)
  ctx.bezierCurveTo(-bw * 0.98, -bh * 2.5, bw * 0.98, -bh * 2.5, bw, 0)

  // Undulating bottom edge
  const edgeSegs = 12
  for (let i = edgeSegs; i >= 0; i--) {
    const px = -bw + (bw * 2 / edgeSegs) * i
    const wave = Math.sin((i / edgeSegs) * Math.PI * 3.5 + t * 0.003 + j.phase) * bh * 0.28
    ctx.lineTo(px, wave + bh * 0.06)
  }
  ctx.closePath()

  // Main fill
  const l0 = lightnessBase
  const l1 = lightnessBase - 18 + lightnessShift
  const l2 = lightnessBase - 30 + lightnessShift
  const l3 = lightnessBase - 40 + lightnessShift
  const mainGrd = ctx.createRadialGradient(0, -bh * 0.9, 0, 0, -bh * 0.3, bw * 1.3)
  mainGrd.addColorStop(0,   `hsla(${j.hue - 10}, ${satBase}%, ${l0}%, ${a * 1.7})`)
  mainGrd.addColorStop(0.45,`hsla(${j.hue},      ${satBase - 5}%, ${l1}%, ${a * 1.2})`)
  mainGrd.addColorStop(0.8, `hsla(${j.hue + 18}, ${satBase - 10}%, ${l2}%, ${a * 0.6})`)
  mainGrd.addColorStop(1,   `hsla(${j.hue + 30}, ${satBase - 15}%, ${l3}%, 0)`)
  ctx.fillStyle = mainGrd
  ctx.fill()

  // Rim glow
  ctx.beginPath()
  ctx.moveTo(-bw, 0)
  ctx.bezierCurveTo(-bw * 0.98, -bh * 2.5, bw * 0.98, -bh * 2.5, bw, 0)
  const rimL = isDark ? 92 : 38
  ctx.strokeStyle = `hsla(${j.hue - 20}, 92%, ${rimL}%, ${a * 3})`
  ctx.lineWidth = 0.9
  ctx.stroke()

  // Inner highlight (light refraction on bell)
  ctx.save()
  ctx.globalCompositeOperation = isDark ? 'lighter' : 'screen'
  const hlL = isDark ? 98 : 68
  const hlL2 = isDark ? 80 : 55
  const ig = ctx.createRadialGradient(bw * 0.18, -bh * 1.5, 0, bw * 0.18, -bh * 1.1, bw * 0.44)
  ig.addColorStop(0, `hsla(${j.hue - 30}, 96%, ${hlL}%, ${a * 1.1})`)
  ig.addColorStop(1, `hsla(${j.hue},      88%, ${hlL2}%, 0)`)
  ctx.beginPath()
  ctx.ellipse(bw * 0.18, -bh * 1.25, bw * 0.36, bh * 0.36, -0.35, 0, Math.PI * 2)
  ctx.fillStyle = ig
  ctx.fill()
  ctx.restore()

  // Internal "gonad" structure
  ctx.save()
  ctx.globalAlpha = a * 0.4
  const cx4 = bw * 0.04
  const cy4 = -bh * 0.85
  const gSize = j.r * 0.2
  const gonadL = isDark ? 72 : 42
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.sin(t * 0.001 + j.phase) * 0.2
    const gx = cx4 + Math.cos(angle) * gSize * 0.5
    const gy = cy4 + Math.sin(angle) * gSize * 0.3
    ctx.beginPath()
    ctx.ellipse(gx, gy, gSize * 0.55, gSize * 0.35, angle, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${j.hue + 40}, 80%, ${gonadL}%, 0.8)`
    ctx.fill()
  }
  ctx.restore()

  // Tentacles
  const tentL0 = isDark ? 82 : 45
  const tentL1 = isDark ? 68 : 35
  const tentL2 = isDark ? 58 : 28
  for (let i = 0; i < j.tCount; i++) {
    const tx = -bw * 0.85 + (bw * 1.7 / (j.tCount - 1)) * i
    const tLen = j.tLengths[i]
    const tOff = j.tOffsets[i]
    const steps = 22

    ctx.beginPath()
    ctx.moveTo(tx, 0)
    for (let s = 1; s <= steps; s++) {
      const prog = s / steps
      const amp = bw * 0.32 * Math.pow(prog, 0.6)
      const wx = Math.sin(t * 0.0021 + j.phase + tOff + prog * 4.8) * amp
      ctx.lineTo(tx + wx, prog * tLen)
    }

    const tGrd = ctx.createLinearGradient(0, 0, 0, tLen)
    tGrd.addColorStop(0,    `hsla(${j.hue},      82%, ${tentL0}%, ${a * 1.6})`)
    tGrd.addColorStop(0.55, `hsla(${j.hue + 14}, 76%, ${tentL1}%, ${a * 0.7})`)
    tGrd.addColorStop(1,    `hsla(${j.hue + 28}, 70%, ${tentL2}%, 0)`)
    ctx.strokeStyle = tGrd
    ctx.lineWidth = 0.45 + (1 - Math.abs(i - j.tCount / 2) / j.tCount) * 0.5
    ctx.stroke()
  }

  ctx.restore()
}

interface Props {
  count?: number
  isDark?: boolean
}

export default function JellyfishBackground({ count = 7, isDark = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const jellies: Jelly[] = Array.from({ length: count }, (_, i) =>
      mkJelly(w, h, i < Math.ceil(count * 0.65))
    )

    let raf: number
    const animate = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const dark = isDarkRef.current

      for (const j of jellies) {
        j.y -= j.vy
        j.x += j.vx + Math.sin(t * 0.0007 + j.phase) * 0.16
        if (j.y + j.r * 4 < 0) {
          j.y = h + j.r * 2
          j.x = Math.random() * w
        }
        if (j.x < -j.r * 3) j.x = w + j.r
        if (j.x > w + j.r * 3) j.x = -j.r
        drawJelly(ctx, j, t, dark)
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: isDark ? 'normal' : 'multiply',
      }}
    />
  )
}
