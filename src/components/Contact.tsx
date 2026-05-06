import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { hero } from '../data/profiles'
import { SectionHeader } from './Skills'

export default function ContactSection() {
  return (
    <section id="contato" style={{ padding: '96px 24px 80px', position: 'relative' }}>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionHeader label="Contato" />
        <p style={{
          marginTop: 12,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 14,
          color: 'var(--text3)',
          lineHeight: 1.6,
          maxWidth: 480,
        }}>
          Disponível para projetos, colaborações e oportunidades. Entre em contato!
        </p>

        <div
          className="contact-grid"
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
              Direto
            </p>
            <ContactRow href={`mailto:${hero.email}`} icon={<Mail size={16} />} label="Email" value={hero.email} />
            <ContactRow href={`tel:+55${hero.phone.replace(/\D/g, '')}`} icon={<Phone size={16} />} label="Telefone" value={hero.phone} />
            <ContactRow href="#" icon={<MapPin size={16} />} label="Localização" value={hero.location} nolink />
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
              Redes
            </p>
            <ContactRow
              href={hero.github}
              icon={<GithubIcon />}
              label="GitHub"
              value="github.com/debbtrbl"
              external
            />
            <ContactRow
              href={hero.linkedin}
              icon={<LinkedinIcon />}
              label="LinkedIn"
              value="in/debora-leticia-alves"
              external
            />
          </motion.div>
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: 32,
            background: 'linear-gradient(135deg, rgba(255,23,68,0.08) 0%, rgba(255,23,68,0.02) 100%)',
            border: '1px solid rgba(255,23,68,0.2)',
            borderRadius: 16,
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 6px' }}>
              Vamos trabalhar juntos?
            </h3>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, color: 'var(--text3)', margin: 0 }}>
              Aberta a oportunidades em Dados, Machine Learning e Desenvolvimento.
            </p>
          </div>
          <a
            href={`mailto:${hero.email}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700,
              color: '#fff', backgroundColor: '#FF1744',
              border: '1px solid #FF1744', borderRadius: 9,
              padding: '11px 24px', textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c8001a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF1744'; e.currentTarget.style.transform = 'none' }}
          >
            <Mail size={14} /> Enviar Email
          </a>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactRowProps {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  external?: boolean
  nolink?: boolean
}

function ContactRow({ href, icon, label, value, external, nolink }: ContactRowProps) {
  const inner = (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '14px 18px',
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: nolink ? 'default' : 'pointer',
      }}
      onMouseEnter={e => {
        if (!nolink) {
          e.currentTarget.style.borderColor = 'rgba(255,23,68,0.35)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,23,68,0.06)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(255,23,68,0.1)',
          border: '1px solid rgba(255,23,68,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, color: '#FF1744',
        }}
      >
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'var(--text4)', letterSpacing: 1, textTransform: 'uppercase' }}>
          {label}
        </span>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500,
            color: 'var(--text2)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )

  if (nolink) return <div>{inner}</div>

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {inner}
    </a>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
