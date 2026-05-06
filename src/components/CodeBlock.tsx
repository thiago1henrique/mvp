import { useState, useEffect } from 'react'

type Token = { t: string; c: string }
type Line  = Token[]

// Dracula-inspired vivid palette (artistic, not editor-grey)
const K = '#FF79C6' // keyword — pink
const S = '#A8FF5F' // string — lime
const T = '#8BE9FD' // type/call — cyan
const P = '#FFB86C' // property — orange
const C = '#4e6070' // comment — steel
const B = '#D4F1F9' // bracket — ice
const W = '#F8F8F2' // default — warm white

const LINES: Line[] = [
  [{ t: '// classificação · CardioAI', c: C }],
  [],
  [{ t: 'import ', c: K }, { t: 'pandas', c: T }, { t: ' as ', c: K }, { t: 'pd', c: W }],
  [{ t: 'from ', c: K }, { t: 'sklearn.ensemble', c: T }, { t: ' import ', c: K }, { t: 'RandomForestClassifier', c: T }],
  [{ t: 'from ', c: K }, { t: 'sklearn.metrics', c: T }, { t: ' import ', c: K }, { t: 'accuracy_score', c: T }],
  [],
  [{ t: 'df', c: W }, { t: ' = ', c: B }, { t: 'pd.', c: W }, { t: 'read_csv', c: T }, { t: '(', c: B }, { t: '"heart.csv"', c: S }, { t: ')', c: B }],
  [{ t: 'X', c: P }, { t: ' = df.', c: W }, { t: 'drop', c: T }, { t: '(', c: B }, { t: '"target"', c: S }, { t: ', axis=', c: B }, { t: '1', c: S }, { t: ')', c: B }],
  [{ t: 'y', c: P }, { t: ' = df[', c: W }, { t: '"target"', c: S }, { t: ']', c: B }],
  [],
  [{ t: 'model', c: W }, { t: ' = ', c: B }, { t: 'RandomForestClassifier', c: T }, { t: '(', c: B }],
  [{ t: '  n_estimators', c: P }, { t: '=', c: B }, { t: '200', c: S }, { t: ',', c: B }, { t: ' max_depth', c: P }, { t: '=', c: B }, { t: '6', c: S }],
  [{ t: ')', c: B }],
  [],
  [{ t: 'model.', c: W }, { t: 'fit', c: T }, { t: '(X_train, y_train)', c: B }],
  [{ t: 'preds', c: W }, { t: ' = model.', c: W }, { t: 'predict', c: T }, { t: '(X_test)', c: B }],
  [],
  [{ t: 'acc', c: W }, { t: ' = ', c: B }, { t: 'accuracy_score', c: T }, { t: '(y_test, preds)', c: B }],
  [{ t: 'print', c: T }, { t: '(', c: B }, { t: 'f"Acurácia: ', c: S }, { t: '{acc:.2%}', c: K }, { t: '"', c: S }, { t: ')', c: B }],
]

export default function CodeBlock() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < LINES.length) {
      const delay = LINES[count].length === 0 ? 35 : 90
      const t = setTimeout(() => setCount(v => v + 1), delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount(0), 4200)
    return () => clearTimeout(t)
  }, [count])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 460,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(155deg, rgba(6,4,20,0.97) 0%, rgba(14,4,10,0.97) 100%)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", ui-monospace, monospace',
      }}
    >
      {/* Animated gradient border */}
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: 18, zIndex: 0,
          padding: 1,
          background: 'linear-gradient(135deg, rgba(255,23,68,0.5) 0%, rgba(139,233,253,0.25) 40%, rgba(255,184,108,0.3) 70%, rgba(255,23,68,0.4) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }}
      />

      {/* Glow beneath */}
      <div
        style={{
          position: 'absolute', inset: -1, borderRadius: 20, zIndex: -1,
          boxShadow: '0 0 60px rgba(255,23,68,0.12), 0 32px 80px rgba(0,0,0,0.7)',
          pointerEvents: 'none',
        }}
      />

      {/* Header bar */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(255,23,68,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Decorative accent mark */}
          <div style={{
            width: 22, height: 22, borderRadius: 7,
            background: 'rgba(255,23,68,0.15)',
            border: '1px solid rgba(255,23,68,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#FF1744', fontSize: 9, lineHeight: 1 }}>◆</span>
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700,
            color: 'rgba(248,248,242,0.75)', letterSpacing: 0.3,
          }}>
            cardio_ai.py
          </span>
        </div>

        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 600,
          color: '#8BE9FD',
          background: 'rgba(139,233,253,0.08)',
          border: '1px solid rgba(139,233,253,0.18)',
          borderRadius: 6, padding: '3px 10px', letterSpacing: 0.8,
        }}>
          Python
        </span>
      </div>

      {/* Code lines */}
      <div style={{ position: 'relative', zIndex: 1, padding: '14px 0 14px', minHeight: 340, overflowY: 'hidden' }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              minHeight: 21,
              opacity: i < count ? 1 : 0,
              transition: 'opacity 0.07s ease',
            }}
          >
            {/* Line number */}
            <span
              style={{
                width: 42, flexShrink: 0, textAlign: 'right', paddingRight: 16,
                fontSize: 11.5, lineHeight: '21px',
                color: 'rgba(78,96,112,0.6)',
                userSelect: 'none',
              }}
            >
              {i + 1}
            </span>
            {/* Tokens */}
            <span style={{ fontSize: 12, lineHeight: '21px' }}>
              {line.map((token, j) => (
                <span key={j} style={{ color: token.c }}>
                  {token.t}
                </span>
              ))}
              {/* Blinking cursor on current line */}
              {i === count - 1 && count < LINES.length && (
                <span
                  style={{
                    display: 'inline-block', width: 2, height: 13,
                    backgroundColor: '#FF1744', marginLeft: 1,
                    verticalAlign: 'middle',
                    animation: 'blink-cursor 0.9s step-end infinite',
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 18px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'linear-gradient(to right, rgba(255,23,68,0.06), rgba(139,233,253,0.04))',
        }}
      >
        <span style={{
          fontSize: 10, color: '#FF1744',
          fontFamily: 'Montserrat, sans-serif', letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
            display: 'inline-block', boxShadow: '0 0 6px #22c55e',
          }} />
          scikit-learn · CardioAI
        </span>
        <span style={{ fontSize: 10, color: '#4e6070', fontFamily: 'Montserrat, sans-serif' }}>
          {count} / {LINES.length}
        </span>
      </div>
    </div>
  )
}
