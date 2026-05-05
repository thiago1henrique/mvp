export default function Cube3D() {
  return (
    <div
      style={{ width: 320, height: 320, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'glow-pulse 3s ease-in-out infinite',
        }}
      />

      {/* Orbit rings */}
      <div className="orbit-ring-outer" />
      <div className="orbit-ring-inner" />

      {/* Cube */}
      <div className="cube-perspective">
        <div className="cube-3d">
          {(['front','back','left','right','top','bottom'] as const).map((f) => (
            <div key={f} className={`cube-face ${f}`} />
          ))}
        </div>
      </div>

      {/* Floating code labels */}
      <FloatingLabel text="<Dev />" top={12} left={-10} delay={0} />
      <FloatingLabel text="{ data }" bottom={20} right={-20} delay={1.5} />
      <FloatingLabel text="AI" top={60} right={0} delay={0.8} small />
    </div>
  )
}

interface LabelProps {
  text: string
  top?: number
  bottom?: number
  left?: number
  right?: number
  delay?: number
  small?: boolean
}

function FloatingLabel({ text, top, bottom, left, right, delay = 0, small }: LabelProps) {
  return (
    <span
      style={{
        position: 'absolute',
        top: top !== undefined ? top : undefined,
        bottom: bottom !== undefined ? bottom : undefined,
        left: left !== undefined ? left : undefined,
        right: right !== undefined ? right : undefined,
        fontFamily: 'Inter, monospace',
        fontSize: small ? 11 : 12,
        color: 'rgba(220,20,60,0.7)',
        backgroundColor: 'rgba(220,20,60,0.06)',
        border: '1px solid rgba(220,20,60,0.2)',
        padding: '2px 8px',
        borderRadius: 4,
        animation: `bounce-down 3s ease-in-out ${delay}s infinite`,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  )
}
