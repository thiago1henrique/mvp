import { motion } from 'framer-motion'
import { Code2, Monitor, Server, Database, ShieldCheck, BarChart2, Brain, Layers, PieChart } from 'lucide-react'
import { skills } from '../data/profiles'
import type { Profile } from '../data/profiles'

interface Props {
  activeProfile: Profile
}

type LucideIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

const ICONS: Record<string, LucideIcon> = {
  'Linguagens':           Code2,
  'Frontend':             Monitor,
  'Backend':              Server,
  'Banco de Dados':       Database,
  'Qualidade':            ShieldCheck,
  'Manipulação de Dados': BarChart2,
  'Machine Learning':     Brain,
  'Deep Learning':        Layers,
  'Visualização & BI':    PieChart,
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function SkillsSection({ activeProfile }: Props) {
  const groups = skills[activeProfile]

  return (
    <section id="skills" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right, transparent, rgba(220,20,60,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader label="Habilidades" />

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
  const Icon = (ICONS[group.label] ?? Code2) as LucideIcon

  return (
    <motion.div
      variants={cardVariant}
      style={{
        background: 'rgba(16,16,22,0.85)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding: '22px 22px 20px',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        y: -5,
        borderColor: 'rgba(220,20,60,0.38)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.35), 0 0 32px rgba(220,20,60,0.06)',
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 120, height: 120,
          background: 'radial-gradient(circle at 0% 0%, rgba(220,20,60,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 44, height: 44, borderRadius: 13,
          background: 'rgba(220,20,60,0.1)',
          border: '1px solid rgba(220,20,60,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
          boxShadow: '0 0 20px rgba(220,20,60,0.1)',
        }}
      >
        <Icon size={20} color="#DC143C" strokeWidth={1.8} />
      </div>

      {/* Category name */}
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 14, fontWeight: 700,
          color: '#f0f0f0',
          marginBottom: 14,
          letterSpacing: '-0.2px',
        }}
      >
        {group.label}
      </p>

      {/* Skill pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {group.items.map(skill => (
          <span
            key={skill}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 11, fontWeight: 500,
              color: '#9ca3af',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6, padding: '4px 10px',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#f5f5f5'
              e.currentTarget.style.background = 'rgba(220,20,60,0.09)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#9ca3af'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function SectionHeader({ label }: { label: string }) {
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
          color: '#f5f5f5',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1, height: 2,
          background: 'linear-gradient(to right, #DC143C, transparent)',
          borderRadius: 999,
        }}
      />
    </motion.div>
  )
}
