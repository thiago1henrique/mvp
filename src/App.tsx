import { useState } from 'react'
import type { Profile } from './data/profiles'
import Header from './components/Header'
import HeroSection from './components/Hero'
import SkillsSection from './components/Skills'
import ProjectsSection from './components/Projects'
import EducationSection from './components/Education'
import Footer from './components/Footer'

export default function App() {
  const [activeProfile, setActiveProfile] = useState<Profile>('dev')
  const toggle = () => setActiveProfile((p) => (p === 'dev' ? 'data' : 'dev'))

  return (
    <>
      <Header activeProfile={activeProfile} onToggle={toggle} />
      <main style={{ flex: 1 }}>
        <HeroSection activeProfile={activeProfile} />
        <div style={{ backgroundColor: 'rgba(18,18,24,0.8)' }}>
          <SkillsSection activeProfile={activeProfile} />
        </div>
        <ProjectsSection activeProfile={activeProfile} />
        <div style={{ backgroundColor: 'rgba(18,18,24,0.8)' }}>
          <EducationSection activeProfile={activeProfile} />
        </div>
      </main>
      <Footer />
    </>
  )
}
