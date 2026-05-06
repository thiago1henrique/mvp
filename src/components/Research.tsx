import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, FlaskConical, ArrowUpRight } from 'lucide-react'
import { research } from '../data/profiles'
import type { ResearchItem } from '../data/profiles'
import { SectionHeader } from './Skills'
import ThreeScene from './ThreeScene'

type LucideIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Estudo':             BookOpen,
  'Artigo':             FlaskConical,
  'Exploração Teórica': Lightbulb,
}

const CATEGORY_COLORS: Record<string, string> = {
  'Estudo':             '#FF1744',
  'Artigo':             '#a855f7',
  'Exploração Teórica': '#f59e0b',
}

const GREEN = '#22C55E'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

interface ResearchProps {
  isDark?: boolean
}

export default function ResearchSection({ isDark = true }: ResearchProps) {
  return (
    <section id="pesquisa" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Three.js data helix — decorative background */}
      <ThreeScene isDark={isDark} variant="helix" opacity={isDark ? 0.32 : 0.18} />

      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${GREEN}55, transparent)`,
        }}
      />

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader label="Pesquisa & Artigos" accentColor={GREEN} />
        <p style={{
          marginTop: 12,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 14,
          color: 'var(--text3)',
          lineHeight: 1.6,
          maxWidth: 540,
        }}>
          Estudos acadêmicos, explorações teóricas e investigações em Machine Learning e Inteligência Artificial.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          {research.map(item => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ResearchCard({ item }: { item: ResearchItem }) {
  const Icon = (CATEGORY_ICONS[item.category] ?? BookOpen) as LucideIcon
  const accent = CATEGORY_COLORS[item.category] ?? '#FF1744'

  return (
    <motion.div
      variants={cardVariant}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px 28px',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        gap: 22,
        alignItems: 'flex-start',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        borderColor: `${accent}55`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.25), 0 0 20px ${accent}12`,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3, borderRadius: '16px 0 0 16px',
          background: `linear-gradient(to bottom, ${accent}, ${accent}44)`,
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${accent}18`,
          border: `1px solid ${accent}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 2,
        }}
      >
        <Icon size={22} color={accent} strokeWidth={1.8} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <h3
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {item.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 11, fontWeight: 600,
                color: accent,
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
                borderRadius: 999,
                padding: '3px 10px',
                letterSpacing: 0.3,
                whiteSpace: 'nowrap',
              }}
            >
              {item.category}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 12,
                color: 'var(--text3)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.year}
            </span>
          </div>
        </div>

        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 13.5,
            color: 'var(--text3)',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {item.description}
        </p>

        {/* Tags + CTA row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {item.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 11, fontWeight: 500,
                  color: 'var(--text3)',
                  background: 'rgba(255,23,68,0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '3px 9px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={item.href ?? '#'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700,
              color: accent,
              background: `${accent}10`,
              border: `1px solid ${accent}30`,
              borderRadius: 8,
              padding: '6px 14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 0.18s, border-color 0.18s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${accent}20`
              e.currentTarget.style.borderColor = `${accent}60`
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${accent}10`
              e.currentTarget.style.borderColor = `${accent}30`
              e.currentTarget.style.transform = 'none'
            }}
          >
            Leia aqui <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
