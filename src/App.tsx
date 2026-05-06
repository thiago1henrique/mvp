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

export default function App() {
  const [activeProfile, setActiveProfile] = useState<Profile>('data')
  const [theme, setTheme] = useState<Theme>('dark')

  const toggle = () => setActiveProfile((p) => (p === 'dev' ? 'data' : 'dev'))
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      {/* Global jellyfish background — fixed behind everything */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: isDark ? '#05050d' : '#e8e8f2',
        }}
      >
        {isDark && <JellyfishBackground count={8} />}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header activeProfile={activeProfile} onToggle={toggle} theme={theme} onThemeToggle={toggleTheme} />
        <main style={{ flex: 1 }}>
          <HeroSection activeProfile={activeProfile} theme={theme} />
          <div style={{ backgroundColor: 'var(--bg-alt)' }}>
            <SkillsSection activeProfile={activeProfile} />
          </div>
          <ProjectsSection activeProfile={activeProfile} />
          <div style={{ backgroundColor: 'var(--bg-alt)' }}>
            <ResearchSection />
          </div>
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
