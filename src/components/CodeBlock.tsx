import { useState, useEffect } from 'react'

type Token = { t: string; c: string }
type Line  = Token[]

// Syntax colors — One Dark inspired, intentional palette
const K = '#c792ea' // keyword/import
const S = '#c3e88d' // string
const T = '#82aaff' // type
const P = '#f78c6c' // property/param
const C = '#546e7a' // comment
const B = '#89ddff' // bracket/operator
const W = '#e2e8f0' // white / default

const LINES: Line[] = [
  [{ t: '// ReqON · sistema de requerimentos', c: C }],
  [],
  [{ t: 'import ', c: K }, { t: '{ useState, useEffect }', c: B }, { t: " from ", c: K }, { t: "'react'", c: S }],
  [{ t: 'import type ', c: K }, { t: '{ FC }', c: B }, { t: ' from ', c: K }, { t: "'react'", c: S }],
  [],
  [{ t: 'interface ', c: K }, { t: 'Requerimento ', c: T }, { t: '{', c: B }],
  [{ t: '  id:      ', c: P }, { t: 'number', c: T }],
  [{ t: '  aluno:   ', c: P }, { t: 'string', c: T }],
  [{ t: "  status:  ", c: P }, { t: "'pendente'", c: S }, { t: ' | ', c: B }, { t: "'aprovado'", c: S }],
  [{ t: '}', c: B }],
  [],
  [{ t: 'const ', c: K }, { t: 'Dashboard', c: T }, { t: ': FC = () => {', c: B }],
  [{ t: '  const ', c: K }, { t: '[reqs, setReqs]', c: W }, { t: ' =', c: B }],
  [{ t: '    useState', c: T }, { t: '<', c: B }, { t: 'Requerimento[]', c: T }, { t: '>([])', c: B }],
  [],
  [{ t: '  useEffect', c: T }, { t: '(() => {', c: B }],
  [{ t: '    api.', c: W }, { t: 'get', c: T }, { t: "(", c: B }, { t: "'/requerimentos'", c: S }, { t: ')', c: B }],
  [{ t: '       .then', c: W }, { t: '(res => ', c: B }, { t: 'setReqs', c: T }, { t: '(res.data))', c: B }],
  [{ t: '  }, [])', c: B }],
  [],
  [{ t: '  return ', c: K }, { t: '<', c: B }, { t: 'ReqList ', c: T }, { t: 'data', c: P }, { t: '={reqs} />', c: B }],
  [{ t: '}', c: B }],
]

export default function CodeBlock() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < LINES.length) {
      const delay = LINES[count].length === 0 ? 40 : 105
      const t = setTimeout(() => setCount(v => v + 1), delay)
      return () => clearTimeout(t)
    }
    // All lines shown — pause then restart
    const t = setTimeout(() => setCount(0), 4000)
    return () => clearTimeout(t)
  }, [count])

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
        fontFamily: '"Cascadia Code", "Fira Code", "JetBrains Mono", ui-monospace, monospace',
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
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
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: '#4b5563',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          dashboard.tsx — ReqON
        </span>
        <span style={{ fontSize: 10, color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
          TSX
        </span>
      </div>

      {/* Code lines */}
      <div style={{ padding: '14px 0 14px', minHeight: 340, overflowY: 'hidden' }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              minHeight: 22,
              opacity: i < count ? 1 : 0,
              transition: 'opacity 0.08s ease',
            }}
          >
            {/* Line number */}
            <span
              style={{
                width: 42,
                flexShrink: 0,
                textAlign: 'right',
                paddingRight: 16,
                fontSize: 12,
                lineHeight: '22px',
                color: '#2e3a42',
                userSelect: 'none',
              }}
            >
              {i + 1}
            </span>
            {/* Tokens */}
            <span style={{ fontSize: 12.5, lineHeight: '22px' }}>
              {line.map((token, j) => (
                <span key={j} style={{ color: token.c }}>
                  {token.t}
                </span>
              ))}
              {/* Blinking cursor on current typing line */}
              {i === count - 1 && count < LINES.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: 13,
                    backgroundColor: '#DC143C',
                    marginLeft: 1,
                    verticalAlign: 'middle',
                    animation: 'blink-cursor 0.9s step-end infinite',
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(220,20,60,0.07)',
        }}
      >
        <span style={{ fontSize: 11, color: '#DC143C', fontFamily: 'Montserrat, sans-serif', letterSpacing: 0.3 }}>
          ● TypeScript React
        </span>
        <span style={{ fontSize: 11, color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
          Ln {count} / {LINES.length}
        </span>
      </div>
    </div>
  )
}

function MacDot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 11,
        height: 11,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.9,
      }}
    />
  )
}
