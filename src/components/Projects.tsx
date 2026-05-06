import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, BarChart2 } from 'lucide-react'
import { projects } from '../data/profiles'
import type { Profile, Project } from '../data/profiles'
import { SectionHeader } from './Skills'

interface Props {
  activeProfile: Profile
  isDark?: boolean
}

export default function ProjectsSection({ activeProfile }: Props) {
  const list = projects[activeProfile]
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => { setActiveIdx(0) }, [activeProfile])

  const project = list[activeIdx]
  const num = String(activeIdx + 1).padStart(2, '0')

  return (
    <section id="projetos" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        <SectionHeader label="Projetos em Destaque" />

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28, marginBottom: 24 }}>
          {list.map((p, i) => {
            const active = activeIdx === i
            return (
              <button
                key={p.title}
                onClick={() => setActiveIdx(i)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  fontFamily: 'Outfit, sans-serif', fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : 'var(--text3)',
                  backgroundColor: active ? '#FF1744' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? '#FF1744' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 10, padding: '9px 18px',
                  cursor: 'pointer', outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.borderColor = 'rgba(255,23,68,0.4)'
                    e.currentTarget.style.backgroundColor = 'rgba(255,23,68,0.06)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text3)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
                  }
                }}
              >
                <span style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 600,
                  color: active ? 'rgba(255,255,255,0.65)' : 'var(--text4)',
                  letterSpacing: 0.5,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {p.title}
              </button>
            )
          })}
        </div>

        {/* Expanded content panel */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--card)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProfile}-${activeIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              {project.embedUrl
                ? <EmbedLayout project={project} num={num} />
                : <NormalLayout project={project} num={num} />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

/* ── Normal layout — visual left / info right ── */
function NormalLayout({ project, num }: { project: Project; num: string }) {
  return (
    <div className="project-detail-grid">

      {/* Visual col */}
      <div style={{
        position: 'relative',
        minHeight: 360,
        overflow: 'hidden',
        background: 'linear-gradient(140deg, #14080d 0%, #100810 55%, #0c0a18 100%)',
        borderRight: '1px solid var(--border)',
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,23,68,0.055) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,23,68,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 320,
          background: 'radial-gradient(ellipse, rgba(255,23,68,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Number watermark */}
        <span style={{
          position: 'absolute', bottom: -20, right: 8,
          fontFamily: 'Outfit, sans-serif', fontSize: 180, fontWeight: 800,
          color: 'rgba(255,23,68,0.045)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: -6,
        }}>
          {num}
        </span>
        {/* Tech chips */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: 10, padding: '24px',
        }}>
          {project.techs.map(tech => (
            <span key={tech} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.72)',
              background: 'rgba(255,23,68,0.08)',
              border: '1px solid rgba(255,23,68,0.2)',
              borderRadius: 8, padding: '6px 14px',
              backdropFilter: 'blur(6px)',
              letterSpacing: 0.2,
            }}>
              {tech}
            </span>
          ))}
        </div>
        <div className="scan-line" />
      </div>

      {/* Info col */}
      <div style={{
        padding: '36px 36px 32px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 16,
      }}>
        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 10,
          color: '#FF1744', letterSpacing: 2.5, textTransform: 'uppercase',
        }}>
          Projeto {num}
        </span>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
          fontWeight: 800, color: 'var(--text)', margin: 0, lineHeight: 1.2,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 14,
          color: 'var(--text3)', lineHeight: 1.75, margin: 0,
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techs.map(tech => (
            <span key={tech} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 500,
              color: '#FF1744', backgroundColor: 'rgba(255,23,68,0.08)',
              border: '1px solid rgba(255,23,68,0.18)',
              borderRadius: 999, padding: '3px 10px',
            }}>
              {tech}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          {project.demo ? (
            <ActionBtn href={project.demo} primary label="Ver Projeto" icon={<ExternalLink size={13} />} />
          ) : (
            <ActionBtn
              href={project.github}
              primary={!!project.github}
              label="Ver no GitHub"
              icon={<GithubIcon />}
              disabled={!project.github}
            />
          )}
          {project.github && project.demo && (
            <ActionBtn href={project.github} label="GitHub" icon={<GithubIcon />} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Embed layout — iframe left / info right ── */
function EmbedLayout({ project, num }: { project: Project; num: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const directUrl = project.embedUrl?.replace(
    'datastudio.google.com/embed/reporting/',
    'lookerstudio.google.com/reporting/',
  )

  // Fix: clicking inside iframe (Looker pagination) causes parent to scroll up.
  // We save scroll position on focus and restore it the next frame.
  const handleFocus = () => {
    const saved = window.scrollY
    requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'instant' }))
  }

  return (
    <div className="project-embed-grid">

      {/* Desktop iframe col — hidden on mobile via CSS */}
      <div className="embed-iframe-col" style={{
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(10,10,16,0.4)',
          flexShrink: 0,
        }}>
          <BarChart2 size={13} color="#FF1744" />
          <span style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 11,
            color: 'var(--text3)', letterSpacing: 1,
          }}>
            DATA STUDIO · LIVE DASHBOARD
          </span>
          <span style={{
            marginLeft: 'auto',
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: '#22c55e',
            animation: 'pulse-status 2.2s ease-in-out infinite',
            display: 'inline-block',
          }} />
        </div>
        <iframe
          ref={iframeRef}
          src={project.embedUrl}
          onFocus={handleFocus}
          style={{ width: '100%', flex: 1, minHeight: 420, border: 'none', display: 'block' }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          title={project.title}
        />
      </div>

      {/* Info col */}
      <div style={{
        padding: '36px 32px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 16,
      }}>

        {/* Mobile-only area: scaled preview + notice */}
        <div className="embed-mobile-area">
          <MobileIframePreview src={project.embedUrl ?? ''} />
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 10,
            padding: '14px 16px',
            borderRadius: '0 0 10px 10px',
            background: 'rgba(255,23,68,0.04)',
            border: '1px solid rgba(255,23,68,0.13)',
            borderTop: 'none',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 11.5,
              color: 'var(--text3)', margin: 0, lineHeight: 1.55,
            }}>
              Para melhor experiência, acesse no desktop
            </p>
            {directUrl && (
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700,
                  color: '#fff', backgroundColor: '#FF1744',
                  border: '1px solid #FF1744',
                  borderRadius: 8, padding: '9px 18px', textDecoration: 'none',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c8001a' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FF1744' }}
              >
                <ExternalLink size={12} /> Abrir no Data Studio
              </a>
            )}
          </div>
        </div>

        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 10,
          color: '#FF1744', letterSpacing: 2.5, textTransform: 'uppercase',
        }}>
          Projeto {num}
        </span>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          fontWeight: 800, color: 'var(--text)', margin: 0, lineHeight: 1.25,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 13.5,
          color: 'var(--text3)', lineHeight: 1.75, margin: 0,
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techs.map(tech => (
            <span key={tech} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 500,
              color: '#FF1744', backgroundColor: 'rgba(255,23,68,0.08)',
              border: '1px solid rgba(255,23,68,0.18)',
              borderRadius: 999, padding: '3px 10px',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile iframe preview — scales iframe to fit container width ── */
function MobileIframePreview({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.34)
  const NATIVE_W = 960
  const NATIVE_H = 540

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetWidth / NATIVE_W)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div ref={wrapRef} style={{
      position: 'relative',
      width: '100%',
      height: Math.round(NATIVE_H * scale),
      overflow: 'hidden',
      borderRadius: '10px 10px 0 0',
      border: '1px solid rgba(255,23,68,0.13)',
      borderBottom: 'none',
    }}>
      {/* Scaled iframe */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: NATIVE_W, height: NATIVE_H,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        <iframe
          src={src}
          width={NATIVE_W}
          height={NATIVE_H}
          style={{ border: 'none', display: 'block' }}
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          title="preview"
        />
      </div>
      {/* Transparent overlay — blocks interaction so it stays read-only */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
    </div>
  )
}

/* ── Action button ── */
function ActionBtn({ href, label, icon, primary = false, disabled = false }: {
  href?: string
  label: string
  icon: React.ReactNode
  primary?: boolean
  disabled?: boolean
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    fontFamily: primary ? 'Outfit, sans-serif' : 'Montserrat, sans-serif',
    fontSize: 13, fontWeight: primary ? 700 : 600,
    borderRadius: 9, padding: '10px 20px', textDecoration: 'none',
    transition: 'background 0.18s, color 0.18s, border-color 0.18s, transform 0.15s',
  }

  if (disabled || !href) {
    return (
      <span style={{
        ...base, color: 'var(--text4)',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: 0.5, cursor: 'default',
      }}>
        {icon} {label}
      </span>
    )
  }

  if (primary) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ ...base, color: '#fff', backgroundColor: '#FF1744', border: '1px solid #FF1744' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#c8001a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FF1744'; e.currentTarget.style.transform = 'none' }}
      >
        {icon} {label}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ ...base, color: 'var(--text2)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#FF1744'
        e.currentTarget.style.borderColor = 'rgba(255,23,68,0.35)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text2)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {icon} {label}
    </a>
  )
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
