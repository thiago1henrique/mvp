import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, FileDown } from 'lucide-react'
import CodeBlock from './CodeBlock'
import DataDashboard from './DataDashboard'
import { hero } from '../data/profiles'
import type { Profile, Theme } from '../data/profiles'

interface Props {
  activeProfile: Profile
  theme: Theme
}

const ACCENT = '#FF1744'

const BADGES: Record<Profile, [string, string, string]> = {
  dev:  ['TypeScript', 'React 18', 'Node.js'],
  data: ['Python 3.11', '94.2% acc', 'scikit-learn'],
}

export default function HeroSection({ activeProfile, theme }: Props) {
  const isDark = theme === 'dark'
  const panelRef  = useRef<HTMLDivElement>(null)
  const b1Ref     = useRef<HTMLDivElement>(null)
  const b2Ref     = useRef<HTMLDivElement>(null)
  const b3Ref     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth  - 0.5
      const my = e.clientY / window.innerHeight - 0.5
      if (panelRef.current)
        panelRef.current.style.transform =
          `perspective(1000px) rotateX(${my * -8}deg) rotateY(${mx * 8}deg)`
      if (b1Ref.current) b1Ref.current.style.transform = `translate(${mx * 30}px, ${my * 30}px)`
      if (b2Ref.current) b2Ref.current.style.transform = `translate(${mx * -22}px, ${my * -22}px)`
      if (b3Ref.current) b3Ref.current.style.transform = `translate(${mx * 18}px, ${my * -18}px)`
    }
    const onLeave = () => {
      if (panelRef.current) panelRef.current.style.transform = ''
      ;[b1Ref, b2Ref, b3Ref].forEach(r => { if (r.current) r.current.style.transform = '' })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      id="sobre"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: isDark
          ? 'rgba(6,6,14,0.55)'
          : 'rgba(240,240,250,0.82)',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: isDark
            ? 'radial-gradient(ellipse 70% 55% at 65% 20%, rgba(255,23,68,0.06) 0%, transparent 60%), ' +
              'linear-gradient(to bottom, rgba(6,6,14,0.3) 0%, rgba(6,6,14,0.1) 45%, rgba(6,6,14,0.5) 100%)'
            : 'radial-gradient(ellipse 70% 55% at 65% 20%, rgba(255,23,68,0.04) 0%, transparent 60%)',
        }}
      />

      <Blob top={-80}   right={160} size={420} opacity={0.09} dur={10} />
      <Blob bottom={60} left={40}   size={300} opacity={0.07} dur={13} delay={-4} />

      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          width: '100%',
          padding: '0 24px',
          paddingTop: 96,
          paddingBottom: 80,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
        className="flex-col-mobile"
      >
        {/* ── LEFT: Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 12, fontFamily: 'Montserrat, sans-serif',
                color: '#86efac',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 999, padding: '5px 14px', letterSpacing: 0.2,
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  animation: 'pulse-status 2.2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              Disponível para trabalho
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          >
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-2px',
                color: 'var(--text)',
                margin: 0,
              }}
            >
              Débora
              <br />
              <span style={{ color: ACCENT, display: 'inline-block' }}>Alves</span>
            </h1>
            <p
              style={{
                marginTop: 8,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 13,
                color: 'var(--text4)',
                letterSpacing: 0.3,
              }}
            >
              21 anos
            </p>
          </motion.div>

          {/* Dynamic subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeProfile}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                fontWeight: 700,
                color: ACCENT,
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              {hero.subtitles[activeProfile]}
            </motion.p>
          </AnimatePresence>

          {/* Bio */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`bio-${activeProfile}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--text3)',
                margin: 0,
                maxWidth: 440,
              }}
            >
              {hero.summaries[activeProfile]}
            </motion.p>
          </AnimatePresence>

          {/* Contact chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
          >
            <Chip icon={<MapPin size={12} />} text={hero.location} />
            <Chip icon={<Mail size={12} />} text={hero.email} href={`mailto:${hero.email}`} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}
          >
            <button
              onClick={() => window.print()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13,
                letterSpacing: 0.3, color: '#fff',
                backgroundColor: ACCENT, border: `1px solid ${ACCENT}`,
                borderRadius: 9, padding: '11px 22px', cursor: 'pointer',
                transition: 'background 0.18s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c8001a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none' }}
            >
              <FileDown size={14} /> Download CV
            </button>
            <OutlineLink href={hero.github} icon={<GithubIcon />} label="GitHub" />
            <OutlineLink href={hero.linkedin} icon={<LinkedinIcon />} label="LinkedIn" />
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Visual ── */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <div ref={b1Ref} className="tilt-badge" style={{ position: 'absolute', top: 24, right: -10, zIndex: 20 }}>
            <BadgeChip text={BADGES[activeProfile][0]} />
          </div>

          <div ref={b2Ref} className="tilt-badge" style={{ position: 'absolute', bottom: 100, left: -12, zIndex: 20 }}>
            <BadgeChip text={BADGES[activeProfile][1]} />
          </div>

          <div ref={b3Ref} className="tilt-badge" style={{ position: 'absolute', top: 100, left: -12, zIndex: 20 }}>
            <BadgeChip text={BADGES[activeProfile][2]} />
          </div>

          <div ref={panelRef} className="tilt-panel" style={{ width: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  filter: `drop-shadow(0 0 48px ${ACCENT}22)`,
                }}
              >
                {activeProfile === 'dev' ? <CodeBlock /> : <DataDashboard />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute', bottom: 28, left: '50%', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
          animation: 'bounce-down 2.2s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            color: isDark ? '#4b5563' : '#9ca3af',
            letterSpacing: 2.5, textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: 1, height: 36,
            background: `linear-gradient(to bottom, ${ACCENT}99, transparent)`,
          }}
        />
      </div>
    </section>
  )
}

/* ── Helpers ─────────────────────────────────── */

function BadgeChip({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 11, fontWeight: 600,
        color: '#e2e8f0',
        background: 'rgba(10,10,18,0.88)',
        backdropFilter: 'blur(14px)',
        border: `1px solid rgba(255,23,68,0.28)`,
        borderRadius: 8, padding: '6px 12px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
        whiteSpace: 'nowrap', letterSpacing: 0.3,
      }}
    >
      <span style={{ color: '#FF1744', fontSize: 7, lineHeight: 1 }}>◆</span>
      {text}
    </span>
  )
}

function Blob({ top, bottom, left, right, size, opacity, dur, delay = 0 }: {
  top?: number; bottom?: number; left?: number; right?: number
  size: number; opacity: number; dur: number; delay?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top:    top    !== undefined ? top    : undefined,
        bottom: bottom !== undefined ? bottom : undefined,
        left:   left   !== undefined ? left   : undefined,
        right:  right  !== undefined ? right  : undefined,
        width: size, height: size,
        borderRadius: '50%',
        background: '#FF1744',
        opacity,
        filter: 'blur(72px)',
        animation: `blob-float ${dur}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

function Chip({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const inner = (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontFamily: 'Montserrat, sans-serif',
        color: '#6b7280',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 999, padding: '5px 12px',
      }}
    >
      <span style={{ color: '#FF1744' }}>{icon}</span>
      {text}
    </span>
  )
  return href
    ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
    : <>{inner}</>
}

function OutlineLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13,
        letterSpacing: 0.2, color: '#9ca3af',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 9, padding: '11px 20px', textDecoration: 'none',
        transition: 'color 0.18s, border-color 0.18s, transform 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#FF1744'
        e.currentTarget.style.borderColor = 'rgba(255,23,68,0.4)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#9ca3af'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {icon} {label}
    </a>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
