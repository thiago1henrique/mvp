import { motion } from 'framer-motion'
import { education } from '../data/profiles'
import type { Profile } from '../data/profiles'
import { SectionHeader } from './Skills'

interface Props {
  activeProfile: Profile
}

interface EduItem {
  institution: string
  course: string
  period: string
}

export default function EducationSection({ activeProfile }: Props) {
  const showData = activeProfile === 'data'

  return (
    <section id="formacao" style={{ padding: '96px 24px', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(220,20,60,0.3), transparent)',
        }}
      />
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader label="Formação" />

        <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Common items */}
          {education.common.map((item, i) => (
            <TimelineItem key={item.course} item={item} index={i} accent={false} />
          ))}

          {/* Data-only certs */}
          {showData && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  margin: '24px 0 8px 28px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 10,
                    color: '#DC143C',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Certificações · Dados & IA
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(220,20,60,0.2)' }} />
              </motion.div>
              {education.dataOnly.map((item, i) => (
                <TimelineItem
                  key={item.course}
                  item={item}
                  index={education.common.length + i + 1}
                  accent
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index, accent }: { item: EduItem; index: number; accent: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      style={{ display: 'flex', gap: 20, paddingBottom: 32, position: 'relative' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: accent ? '#DC143C' : 'rgba(220,20,60,0.4)',
            border: `2px solid ${accent ? '#DC143C' : 'rgba(220,20,60,0.3)'}`,
            boxShadow: accent ? '0 0 12px rgba(220,20,60,0.5)' : 'none',
            marginTop: 4,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 1,
            flex: 1,
            background: 'linear-gradient(to bottom, rgba(220,20,60,0.3), transparent)',
            marginTop: 4,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'rgba(30,30,39,0.5)',
          border: `1px solid ${accent ? 'rgba(220,20,60,0.2)' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: 12,
          padding: '14px 18px',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: '#f5f5f5',
              }}
            >
              {item.course}
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: '#9ca3af', marginTop: 3 }}>
              {item.institution}
            </p>
          </div>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 11,
              color: accent ? '#DC143C' : '#6b7280',
              backgroundColor: accent ? 'rgba(220,20,60,0.08)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${accent ? 'rgba(220,20,60,0.2)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 999,
              padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {item.period}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
