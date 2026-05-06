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

function drawJelly(ctx: CanvasRenderingContext2D, j: Jelly, t: number) {
  const pulse = 0.88 + Math.sin(t * 0.0014 + j.phase) * 0.12
  const bw = j.r * pulse
  const bh = j.r * 0.55

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
  const mainGrd = ctx.createRadialGradient(0, -bh * 0.9, 0, 0, -bh * 0.3, bw * 1.3)
  mainGrd.addColorStop(0, `hsla(${j.hue - 10}, 85%, 88%, ${j.alpha * 1.7})`)
  mainGrd.addColorStop(0.45, `hsla(${j.hue}, 80%, 70%, ${j.alpha * 1.2})`)
  mainGrd.addColorStop(0.8, `hsla(${j.hue + 18}, 75%, 58%, ${j.alpha * 0.6})`)
  mainGrd.addColorStop(1, `hsla(${j.hue + 30}, 70%, 48%, 0)`)
  ctx.fillStyle = mainGrd
  ctx.fill()

  // Rim glow
  ctx.beginPath()
  ctx.moveTo(-bw, 0)
  ctx.bezierCurveTo(-bw * 0.98, -bh * 2.5, bw * 0.98, -bh * 2.5, bw, 0)
  ctx.strokeStyle = `hsla(${j.hue - 20}, 92%, 92%, ${j.alpha * 3})`
  ctx.lineWidth = 0.9
  ctx.stroke()

  // Inner highlight (light refraction on bell)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const ig = ctx.createRadialGradient(bw * 0.18, -bh * 1.5, 0, bw * 0.18, -bh * 1.1, bw * 0.44)
  ig.addColorStop(0, `hsla(${j.hue - 30}, 96%, 98%, ${j.alpha * 1.1})`)
  ig.addColorStop(1, `hsla(${j.hue}, 88%, 80%, 0)`)
  ctx.beginPath()
  ctx.ellipse(bw * 0.18, -bh * 1.25, bw * 0.36, bh * 0.36, -0.35, 0, Math.PI * 2)
  ctx.fillStyle = ig
  ctx.fill()
  ctx.restore()

  // Internal "gonad" structure (visible through translucent bell)
  ctx.save()
  ctx.globalAlpha = j.alpha * 0.4
  const cx4 = bw * 0.04
  const cy4 = -bh * 0.85
  const gSize = j.r * 0.2
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.sin(t * 0.001 + j.phase) * 0.2
    const gx = cx4 + Math.cos(angle) * gSize * 0.5
    const gy = cy4 + Math.sin(angle) * gSize * 0.3
    ctx.beginPath()
    ctx.ellipse(gx, gy, gSize * 0.55, gSize * 0.35, angle, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${j.hue + 40}, 80%, 72%, 0.8)`
    ctx.fill()
  }
  ctx.restore()

  // Tentacles
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
    tGrd.addColorStop(0, `hsla(${j.hue}, 82%, 82%, ${j.alpha * 1.6})`)
    tGrd.addColorStop(0.55, `hsla(${j.hue + 14}, 76%, 68%, ${j.alpha * 0.7})`)
    tGrd.addColorStop(1, `hsla(${j.hue + 28}, 70%, 58%, 0)`)
    ctx.strokeStyle = tGrd
    ctx.lineWidth = 0.45 + (1 - Math.abs(i - j.tCount / 2) / j.tCount) * 0.5
    ctx.stroke()
  }

  ctx.restore()
}

export default function JellyfishBackground({ count = 7 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

      for (const j of jellies) {
        j.y -= j.vy
        j.x += j.vx + Math.sin(t * 0.0007 + j.phase) * 0.16
        if (j.y + j.r * 4 < 0) {
          j.y = h + j.r * 2
          j.x = Math.random() * w
        }
        if (j.x < -j.r * 3) j.x = w + j.r
        if (j.x > w + j.r * 3) j.x = -j.r
        drawJelly(ctx, j, t)
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
