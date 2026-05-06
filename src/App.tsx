import { useState, useEffect } from 'react'
import type { Profile, Theme } from './data/profiles'
import Header from './components/Header'
import HeroSection from './components/Hero'
import SkillsSection from './components/Skills'
import ProjectsSection from './components/Projects'
import ResearchSection from './components/Research'
import ContactSection from './components/Contact'
import Footer from './components/Footer'
import JellyfishBackground from './components/JellyfishBackground'

// Smooth gradient overlay between sections — fades in and out at edges
function SectionWave({ isDark }: { isDark: boolean }) {
  const dark = isDark
    ? 'rgba(8,13,10,0.88)'
    : 'rgba(215,228,218,0.82)'

  return (
    <div
      style={{
        background: `linear-gradient(to bottom,
          transparent 0%,
          ${dark} 7%,
          ${dark} 93%,
          transparent 100%)`,
        transition: 'background 0.35s ease',
      }}
    />
  )
}

export default function App() {
  const [activeProfile, setActiveProfile] = useState<Profile>('data')
  const [theme, setTheme] = useState<Theme>('dark')

  const toggle = () => setActiveProfile((p) => (p === 'dev' ? 'data' : 'dev'))
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const bgBase = isDark ? '#05050d' : '#e8e8f2'
  const altBg  = isDark
    ? 'linear-gradient(to bottom, transparent 0%, rgba(8,13,10,0.90) 7%, rgba(8,13,10,0.90) 93%, transparent 100%)'
    : 'linear-gradient(to bottom, transparent 0%, rgba(224,224,238,0.72) 7%, rgba(224,224,238,0.72) 93%, transparent 100%)'

  return (
    <>
      {/* Global fixed background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: bgBase,
          transition: 'background 0.35s ease',
        }}
      >
        <JellyfishBackground count={8} isDark={isDark} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header activeProfile={activeProfile} onToggle={toggle} theme={theme} onThemeToggle={toggleTheme} />
        <main style={{ flex: 1 }}>
          <HeroSection activeProfile={activeProfile} theme={theme} />

          {/* Skills — smooth gradient band */}
          <div style={{ background: altBg, transition: 'background 0.35s ease' }}>
            <SkillsSection activeProfile={activeProfile} isDark={isDark} />
          </div>

          <ProjectsSection activeProfile={activeProfile} isDark={isDark} />

          {/* Research — smooth gradient band */}
          <div style={{ background: altBg, transition: 'background 0.35s ease' }}>
            <ResearchSection isDark={isDark} />
          </div>

          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
