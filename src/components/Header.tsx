import { useState, useEffect } from 'react'
import { Code2, Database } from 'lucide-react'
import type { Profile } from '../data/profiles'

interface Props {
  activeProfile: Profile
  onToggle: () => void
}

const NAV = [
  { label: 'Sobre',    href: '#sobre'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Formação', href: '#formacao' },
]

export default function Header({ activeProfile, onToggle }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: scrolled ? 'rgba(14,14,20,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(26px) saturate(1.8)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(26px) saturate(1.8)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.055)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.03)' : 'none',
        transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          width: '100%',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: '-0.8px',
              color: '#f5f5f5',
              lineHeight: 1,
            }}
          >
            débora<span style={{ color: '#DC143C' }}>.</span>
          </span>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 11,
              color: '#4b5563',
              letterSpacing: 0.5,
              lineHeight: 1,
            }}
          >
            {activeProfile === 'dev' ? 'Full-Stack Developer' : 'Data Analyst · ML'}
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                color: '#6b7280',
                textDecoration: 'none',
                letterSpacing: 0.2,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Profile toggle — liquid glass pill */}
        <button
          onClick={onToggle}
          aria-label="Alternar perfil Dev / Data"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(220,20,60,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
          }}
        >
          {/* Dev side */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: activeProfile === 'dev' ? '#f5f5f5' : '#4b5563',
              transition: 'color 0.2s',
            }}
          >
            <Code2 size={14} />
            Dev
          </span>

          {/* Toggle track */}
          <div
            style={{
              position: 'relative',
              width: 40,
              height: 22,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 3,
                left: activeProfile === 'dev' ? 3 : 19,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#DC143C',
                boxShadow: '0 0 10px rgba(220,20,60,0.7)',
                transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>

          {/* Data side */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: activeProfile === 'data' ? '#f5f5f5' : '#4b5563',
              transition: 'color 0.2s',
            }}
          >
            <Database size={14} />
            Data
          </span>
        </button>
      </div>
    </header>
  )
}
