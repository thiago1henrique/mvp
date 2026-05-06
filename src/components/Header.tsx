import { useState, useEffect } from 'react'
import { Code2, Database, Sun, Moon, Menu, X } from 'lucide-react'
import type { Profile, Theme } from '../data/profiles'

interface Props {
  activeProfile: Profile
  onToggle: () => void
  theme: Theme
  onThemeToggle: () => void
}

const NAV = [
  { label: 'Sobre',    href: '#sobre'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Pesquisa', href: '#pesquisa' },
  { label: 'Contato',  href: '#contato'  },
]

const ACCENT = '#FF1744'

export default function Header({ activeProfile, onToggle, theme, onThemeToggle }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on any scroll
  useEffect(() => {
    if (!menuOpen) return
    const fn = () => setMenuOpen(false)
    window.addEventListener('scroll', fn, { passive: true, once: true })
    return () => window.removeEventListener('scroll', fn)
  }, [menuOpen])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const ctrlBorder = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'
  const ctrlBg     = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
  const headerBg   = scrolled
    ? isDark ? 'rgba(10,10,16,0.88)' : 'rgba(240,240,248,0.92)'
    : 'transparent'

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 72,
          display: 'flex', alignItems: 'center',
          backgroundColor: headerBg,
          backdropFilter: scrolled ? 'blur(26px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(26px) saturate(1.8)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${isDark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.1)'}`
            : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.2)' : 'none',
          transition: 'background-color 0.35s, backdrop-filter 0.35s, border-color 0.35s, box-shadow 0.35s',
        }}
      >
        <div
          style={{
            maxWidth: 1060, margin: '0 auto', width: '100%',
            padding: '0 24px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 20,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20,
              letterSpacing: '-0.8px', color: 'var(--text)', lineHeight: 1,
            }}>
              débora<span style={{ color: ACCENT }}>.</span>
            </span>
            <span style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 10,
              color: 'var(--text4)', letterSpacing: 0.5, lineHeight: 1,
            }}>
              {activeProfile === 'dev' ? 'Full-Stack Developer' : 'Data Analyst · ML'}
            </span>
          </div>

          {/* Nav — desktop only */}
          <nav className="nav-desktop">
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500,
                  color: 'var(--text3)', textDecoration: 'none',
                  letterSpacing: 0.2, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              aria-label="Alternar tema"
              style={{
                width: 36, height: 36, borderRadius: 9,
                border: `1px solid ${ctrlBorder}`, background: ctrlBg,
                color: 'var(--text3)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s, color 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,23,68,0.45)'; e.currentTarget.style.color = ACCENT }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ctrlBorder; e.currentTarget.style.color = 'var(--text3)' }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Profile switch — desktop only, Data (left) | Dev (right) */}
            <button
              onClick={onToggle}
              aria-label="Alternar perfil Data / Dev"
              className="profile-switch-desktop"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                borderRadius: 999, border: `1px solid ${ctrlBorder}`, background: ctrlBg,
                backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,23,68,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ctrlBorder }}
            >
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600,
                color: activeProfile === 'data' ? ACCENT : 'var(--text4)', transition: 'color 0.2s',
              }}>
                <Database size={13} /> Data
              </span>

              <div style={{
                position: 'relative', width: 36, height: 20, borderRadius: 999,
                backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              }}>
                <div style={{
                  position: 'absolute', top: 3,
                  left: activeProfile === 'data' ? 2 : 17,
                  width: 12, height: 12, borderRadius: '50%',
                  backgroundColor: ACCENT,
                  boxShadow: `0 0 8px ${ACCENT}b0`,
                  transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
              </div>

              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600,
                color: activeProfile === 'dev' ? ACCENT : 'var(--text4)', transition: 'color 0.2s',
              }}>
                <Code2 size={13} /> Dev
              </span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Abrir menu"
              className="hamburger-btn"
              style={{
                width: 40, height: 40, borderRadius: 10,
                border: `1px solid ${ctrlBorder}`, background: ctrlBg,
                color: 'var(--text)', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 55,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Slide drawer — from right */}
      <div
        style={{
          position: 'fixed', top: 0, bottom: 0, right: 0, zIndex: 60,
          width: 300, maxWidth: '88vw',
          background: isDark ? 'rgba(8,8,14,0.98)' : 'rgba(244,244,252,0.98)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'}`,
          boxShadow: '-24px 0 64px rgba(0,0,0,0.45)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column',
          padding: '76px 28px 40px',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: 18, right: 18,
            width: 38, height: 38, borderRadius: 10,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'}`,
            background: 'transparent', color: 'var(--text3)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={16} />
        </button>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800,
                color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.5px',
                padding: '12px 0',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                transition: 'color 0.2s, padding-left 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.paddingLeft = '6px' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.paddingLeft = '0' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Drawer controls */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Profile switch in drawer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px',
            borderRadius: 14,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, color: activeProfile === 'data' ? ACCENT : 'var(--text4)' }}>
              Data
            </span>

            <button
              onClick={onToggle}
              style={{
                position: 'relative', width: 48, height: 26, borderRadius: 999,
                backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                cursor: 'pointer', padding: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 4,
                left: activeProfile === 'data' ? 4 : 22,
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}bb`,
                transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </button>

            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, color: activeProfile === 'dev' ? ACCENT : 'var(--text4)' }}>
              Dev
            </span>
          </div>

          {/* Theme toggle in drawer */}
          <button
            onClick={onThemeToggle}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', borderRadius: 14,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              color: 'var(--text3)', cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500,
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            {isDark ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>
      </div>
    </>
  )
}
