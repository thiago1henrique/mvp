import { useEffect, useRef, useState } from 'react'

interface BarItem { label: string; value: number }

interface Dataset {
  title: string
  algo: string
  bars: BarItem[]
  line: number[]
  kpi: { acuracia: string; amostras: string; modelos: string }
}

const DATASETS: Dataset[] = [
  {
    title: 'CardioAI · Treino',
    algo: 'Random Forest · 847 amostras',
    bars: [
      { label: 'Acurácia', value: 94 },
      { label: 'Precisão', value: 91 },
      { label: 'Recall',   value: 88 },
      { label: 'F1 Score', value: 92 },
      { label: 'AUC-ROC',  value: 97 },
    ],
    line: [38, 51, 47, 62, 58, 71, 68, 80, 75, 87, 84, 94],
    kpi: { acuracia: '94.2%', amostras: '847', modelos: '3' },
  },
  {
    title: 'TumoresAI · Validação',
    algo: 'Xception CNN · 2341 amostras',
    bars: [
      { label: 'Acurácia', value: 97 },
      { label: 'Precisão', value: 95 },
      { label: 'Recall',   value: 93 },
      { label: 'F1 Score', value: 94 },
      { label: 'AUC-ROC',  value: 98 },
    ],
    line: [45, 52, 61, 68, 74, 79, 83, 87, 90, 93, 95, 97],
    kpi: { acuracia: '97.1%', amostras: '2341', modelos: '5' },
  },
  {
    title: 'BostonHousing · EDA',
    algo: 'Gradient Boost · 1204 amostras',
    bars: [
      { label: 'R²',        value: 89 },
      { label: 'MAE',       value: 78 },
      { label: 'RMSE',      value: 82 },
      { label: 'Validação', value: 86 },
      { label: 'Treino',    value: 91 },
    ],
    line: [42, 48, 55, 60, 66, 71, 76, 79, 83, 86, 88, 89],
    kpi: { acuracia: '89.4%', amostras: '1204', modelos: '7' },
  },
]

export default function DataDashboard() {
  const [dsIdx, setDsIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 350)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setMounted(false)
      setTimeout(() => {
        setDsIdx(i => (i + 1) % DATASETS.length)
        setTimeout(() => setMounted(true), 120)
      }, 250)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const ds = DATASETS[dsIdx]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 460,
        borderRadius: 14,
        overflow: 'hidden',
        background: 'rgba(10, 10, 16, 0.92)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex', alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <MacDot color="#ff5f57" />
          <MacDot color="#febc2e" />
          <MacDot color="#28c840" />
        </div>
        <span
          style={{
            flex: 1, textAlign: 'center', fontSize: 12, color: '#4b5563',
            transition: 'opacity 0.25s',
            opacity: mounted ? 1 : 0.4,
          }}
        >
          {ds.title}
        </span>
        <span style={{ fontSize: 10, color: '#374151' }}>Python · sklearn</span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <KPI label="Score"    value={ds.kpi.acuracia} accent mounted={mounted} delay={0} />
          <KPI label="Amostras" value={ds.kpi.amostras} mounted={mounted} delay={80} />
          <KPI label="Modelos"  value={ds.kpi.modelos}  mounted={mounted} delay={160} />
        </div>

        {/* Bar chart */}
        <ChartBox title="Métricas do Modelo">
          <BarChart bars={ds.bars} mounted={mounted} />
        </ChartBox>

        {/* Line chart — key on dsIdx to remount & re-animate */}
        <ChartBox
          title="Score / Época"
          right={<span style={{ fontSize: 10, color: '#DC143C' }}>● ao vivo</span>}
        >
          <LineChart key={dsIdx} points={ds.line} mounted={mounted} />
        </ChartBox>
      </div>

      {/* Status bar */}
      <div
        style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '7px 16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(220,20,60,0.07)',
        }}
      >
        <span style={{ fontSize: 11, color: '#DC143C', letterSpacing: 0.3 }}>● Modelo treinado</span>
        <span
          style={{
            fontSize: 11, color: '#374151',
            transition: 'opacity 0.25s',
            opacity: mounted ? 1 : 0.3,
          }}
        >
          {ds.algo}
        </span>
      </div>
    </div>
  )
}

/* ── Sub-components ──────────────────────────── */

function MacDot({ color }: { color: string }) {
  return <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: color, opacity: 0.9 }} />
}

function KPI({ label, value, accent, mounted, delay = 0 }: {
  label: string; value: string; accent?: boolean; mounted: boolean; delay?: number
}) {
  return (
    <div
      style={{
        background: accent ? 'rgba(220,20,60,0.1)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${accent ? 'rgba(220,20,60,0.22)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 8, padding: '10px 8px', textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 19, fontWeight: 800,
          color: accent ? '#DC143C' : '#f5f5f5',
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 9, color: '#6b7280', marginTop: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {label}
      </p>
    </div>
  )
}

function ChartBox({ title, right, children }: {
  title: string; right?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: 10, padding: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p style={{ fontSize: 10, color: '#6b7280', letterSpacing: 1.2, textTransform: 'uppercase' }}>{title}</p>
        {right}
      </div>
      {children}
    </div>
  )
}

function BarChart({ bars, mounted }: { bars: BarItem[]; mounted: boolean }) {
  const max = Math.max(...bars.map(b => b.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 76 }}>
      {bars.map((bar, i) => {
        const h = (bar.value / max) * 52
        return (
          <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 9, color: '#9ca3af', opacity: mounted ? 1 : 0, transition: `opacity 0.3s ${i * 80 + 200}ms` }}>
              {bar.value}%
            </span>
            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 52 }}>
              <div
                style={{
                  width: '100%',
                  height: mounted ? h : 0,
                  background: 'linear-gradient(to top, #DC143C, rgba(220,20,60,0.45))',
                  borderRadius: '4px 4px 0 0',
                  transition: `height 0.7s cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 70 + 100}ms`,
                }}
              />
            </div>
            <span style={{ fontSize: 8, color: '#6b7280', textAlign: 'center', lineHeight: 1.2 }}>
              {bar.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function LineChart({ points, mounted }: { points: number[]; mounted: boolean }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)

  const W = 400, H = 52
  const min = Math.min(...points)
  const max = Math.max(...points)
  const pad = 4

  const coords = points.map((v, i) => ({
    x: (i / (points.length - 1)) * W,
    y: H - pad - ((v - min) / (max - min)) * (H - pad * 2),
  }))

  const linePath = coords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [points])

  const offset = mounted ? 0 : (len || 1000)

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 52, overflow: 'visible' }}>
      {[0, 0.33, 0.66, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC143C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#DC143C" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke="#DC143C"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len || 1000}
        strokeDashoffset={offset}
        style={{ transition: len ? 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1) 200ms' : 'none' }}
      />
      {coords.length > 0 && (
        <circle
          cx={coords[coords.length - 1].x}
          cy={coords[coords.length - 1].y}
          r={3}
          fill="#DC143C"
          opacity={mounted ? 1 : 0}
          style={{ transition: 'opacity 0.3s 1.4s' }}
        />
      )}
    </svg>
  )
}
