interface Props {
  items: string[]
  speed?: number
}

export default function TechTicker({ items, speed = 22 }: Props) {
  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrapper w-full py-2">
      <div className="ticker-track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              color: 'rgba(220,20,60,0.8)',
              backgroundColor: 'rgba(220,20,60,0.08)',
              border: '1px solid rgba(220,20,60,0.2)',
              borderRadius: 999,
              padding: '3px 12px',
              marginRight: 10,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
