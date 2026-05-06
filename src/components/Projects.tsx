import { motion } from 'framer-motion'
import { ExternalLink, BarChart2 } from 'lucide-react'
import { projects } from '../data/profiles'
import type { Profile, Project } from '../data/profiles'
import TechTicker from './TechTicker'
import { SectionHeader } from './Skills'

interface Props {
  activeProfile: Profile
  isDark?: boolean
}

export default function ProjectsSection({ activeProfile }: Props) {
  const list = projects[activeProfile]

  return (
    <section id="projetos" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,23,68,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', marginBottom: 40 }}>
        <SectionHeader label="Projetos em Destaque" />
        <p style={{
          marginTop: 10,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 13,
          color: 'var(--text4)',
          letterSpacing: 0.3,
        }}>
          Arraste para explorar →
        </p>
      </div>

      <motion.div
        className="projects-scroll"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
      >
        {list.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
      }}
      style={{
        flexShrink: 0,
        width: project.embedUrl ? 'min(860px, calc(100vw - 48px))' : 'min(700px, calc(100vw - 48px))',
        scrollSnapAlign: 'start',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      whileHover={{
        borderColor: 'rgba(255,23,68,0.32)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 40px rgba(255,23,68,0.06)',
      }}
    >
      {project.embedUrl ? (
        <EmbedLayout project={project} num={num} />
      ) : (
        <NormalLayout project={project} num={num} />
      )}
    </motion.div>
  )
}

/* ── Embed (Data Studio iframe) layout ── */
function EmbedLayout({ project, num }: { project: Project; num: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Iframe area */}
      <div style={{ position: 'relative', background: 'rgba(10,10,16,0.6)' }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(10,10,16,0.4)',
          }}
        >
          <BarChart2 size={13} color="#FF1744" />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'var(--text3)', letterSpacing: 1 }}>
            LOOKER STUDIO · LIVE DASHBOARD
          </span>
          <span
            style={{
              marginLeft: 'auto',
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: '#22c55e',
              animation: 'pulse-status 2.2s ease-in-out infinite',
              display: 'inline-block',
            }}
          />
        </div>
        <iframe
          src={project.embedUrl}
          style={{ width: '100%', height: 380, border: 'none', display: 'block' }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          title={project.title}
        />
      </div>

      {/* Project info */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: '#FF1744', letterSpacing: 2.5, textTransform: 'uppercase' }}>
              Projeto {num}
            </span>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', margin: '4px 0 0', lineHeight: 1.2 }}>
              {project.title}
            </h3>
          </div>
        </div>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techs.map(tech => (
            <span
              key={tech}
              style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 500,
                color: '#FF1744', backgroundColor: 'rgba(255,23,68,0.08)',
                border: '1px solid rgba(255,23,68,0.18)',
                borderRadius: 999, padding: '3px 10px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Normal (GIF + info) layout ── */
function NormalLayout({ project, num }: { project: Project; num: string }) {
  return (
    <div className="project-card-inner">
      {/* LEFT — GIF placeholder + tech ticker */}
      <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)' }}>
        <div style={{ flex: 1, position: 'relative', minHeight: 200 }} className="gif-placeholder-bg">
          <div className="scan-line" />
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,23,68,0.04) 1px, transparent 1px), ' +
                'linear-gradient(90deg, rgba(255,23,68,0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: '50%',
                border: '1.5px solid rgba(255,23,68,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 0, height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: '12px solid rgba(255,23,68,0.55)',
                  marginLeft: 3,
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 9,
                color: 'rgba(255,23,68,0.45)', letterSpacing: 2.5, textTransform: 'uppercase',
              }}
            >
              GIF Preview
            </span>
          </div>
          <span
            style={{
              position: 'absolute', top: 10, left: 10,
              fontFamily: 'Montserrat, sans-serif', fontSize: 9,
              color: 'rgba(255,23,68,0.45)',
              backgroundColor: 'rgba(22,22,29,0.75)',
              padding: '2px 8px', borderRadius: 4,
              border: '1px solid rgba(255,23,68,0.12)',
            }}
          >
            ● REC
          </span>
        </div>

        <div style={{ backgroundColor: 'rgba(10,10,16,0.9)', padding: '6px 0', borderTop: '1px solid rgba(255,23,68,0.07)' }}>
          <TechTicker items={project.techs} speed={11} />
        </div>
      </div>

      {/* RIGHT — Project info */}
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, position: 'relative', minHeight: 240 }}>
        <span
          style={{
            position: 'absolute', top: 14, right: 18,
            fontFamily: 'Outfit, sans-serif',
            fontSize: 72, fontWeight: 800,
            color: 'rgba(255,23,68,0.05)',
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}
        >
          {num}
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: '#FF1744', letterSpacing: 2.5, textTransform: 'uppercase' }}>
            Projeto {num}
          </span>
          <h3
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              fontWeight: 800, color: 'var(--text)',
              lineHeight: 1.2, margin: 0,
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, color: 'var(--text3)', lineHeight: 1.75, margin: 0 }}>
            {project.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.techs.map(tech => (
              <span
                key={tech}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 500,
                  color: '#FF1744', backgroundColor: 'rgba(255,23,68,0.08)',
                  border: '1px solid rgba(255,23,68,0.18)',
                  borderRadius: 999, padding: '3px 10px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700,
                  color: '#fff', backgroundColor: '#FF1744',
                  border: '1px solid #FF1744', borderRadius: 8,
                  padding: '9px 20px', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#b01030' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FF1744' }}
              >
                <ExternalLink size={13} /> Ver Projeto
              </a>
            ) : (
              <a
                href={project.github ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700,
                  color: '#fff', backgroundColor: '#FF1744',
                  border: '1px solid #FF1744', borderRadius: 8,
                  padding: '9px 20px', textDecoration: 'none',
                  transition: 'background 0.2s',
                  opacity: project.github ? 1 : 0.4,
                  pointerEvents: project.github ? 'auto' : 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#b01030' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FF1744' }}
              >
                <GithubIcon /> Ver no GitHub
              </a>
            )}
            {project.github && project.demo && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
                  color: 'var(--text2)',
                  background: 'var(--card)',
                  border: '1px solid var(--border2)',
                  borderRadius: 8, padding: '9px 18px', textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FF1744'; e.currentTarget.style.borderColor = 'rgba(255,23,68,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
              >
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
