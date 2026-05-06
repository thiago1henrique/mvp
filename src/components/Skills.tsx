import { motion } from 'framer-motion'
import {
  Code2, Monitor, Server, Database, ShieldCheck,
  BarChart2, Brain, Layers, PieChart, Cpu, Activity, FlaskConical,
} from 'lucide-react'
import { skills } from '../data/profiles'
import type { Profile } from '../data/profiles'
import ThreeScene from './ThreeScene'

interface Props {
  activeProfile: Profile
  isDark?: boolean
}

type LucideIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

const ICONS: Record<string, LucideIcon> = {
  'Linguagens':           Code2,
  'Frontend':             Monitor,
  'Backend':              Server,
  'Banco de Dados':       Database,
  'Qualidade':            ShieldCheck,
  'Testes':               FlaskConical,
  'Análise de Dados':     BarChart2,
  'Visualização de Dados': PieChart,
  'Machine Learning':     Brain,
  'Deep Learning':        Layers,
  'Técnicas':             Activity,
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

const GREEN = '#22C55E'

export default function SkillsSection({ activeProfile, isDark = true }: Props) {
  const groups = skills[activeProfile]

  return (
    <section id="skills" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Three.js neural network — decorative background */}
      <ThreeScene isDark={isDark} variant="sphere" opacity={isDark ? 0.38 : 0.22} />

      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${GREEN}55, transparent)`,
        }}
      />

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader label="Skills Técnicas" accentColor={GREEN} />

        <motion.div
          key={activeProfile}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
        >
          {groups.map(group => (
            <SkillCard key={group.label} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ group }: { group: { label: string; items: string[] } }) {
  const Icon = (ICONS[group.label] ?? Cpu) as LucideIcon
  const accent = '#FF1744'

  return (
    <motion.div
      variants={cardVariant}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '22px 22px 20px',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        y: -5,
        borderColor: `${accent}60`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.3), 0 0 32px ${accent}10`,
      }}
    >
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 100, height: 100,
          background: `radial-gradient(circle at 0% 0%, ${accent}14 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: 42, height: 42, borderRadius: 12,
          background: `${accent}18`,
          border: `1px solid ${accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 14,
          boxShadow: `0 0 16px ${accent}18`,
        }}
      >
        <Icon size={19} color={accent} strokeWidth={1.8} />
      </div>

      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 13, fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 12,
          letterSpacing: '-0.2px',
        }}
      >
        {group.label}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.items.map(skill => (
          <span
            key={skill}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 11, fontWeight: 500,
              color: 'var(--text3)',
              background: `${accent}08`,
              border: '1px solid var(--border)',
              borderRadius: 6, padding: '3px 9px',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = accent
              e.currentTarget.style.background = `${accent}15`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text3)'
              e.currentTarget.style.background = `${accent}08`
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function SectionHeader({ label, accentColor = '#22C55E' }: { label: string; accentColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', gap: 16 }}
    >
      <h2
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 800,
          color: 'var(--text)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1, height: 2,
          background: `linear-gradient(to right, ${accentColor}, transparent)`,
          borderRadius: 999,
        }}
      />
    </motion.div>
  )
}
