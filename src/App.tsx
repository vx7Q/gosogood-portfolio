import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { GridBackground } from '@/components/ui/GridBackground'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Cursor } from '@/components/ui/Cursor'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Experience } from '@/sections/Experience'
import { Services } from '@/sections/Services'
import { Contact } from '@/sections/Contact'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { scrollToId } from '@/lib/utils'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [heroReady, setHeroReady] = useState(false)
  useLockBodyScroll(isLoading)

  const handleLoaded = useCallback(() => {
    setIsLoading(false)
    window.setTimeout(() => setHeroReady(true), 160)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const hash = window.location.hash
    if (!hash) return
    const timer = window.setTimeout(() => scrollToId(hash), 900)
    return () => window.clearTimeout(timer)
  }, [isLoading])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[210] -translate-y-24 rounded-full bg-pearl px-4 py-2 text-xs font-medium text-ink opacity-0 transition-all focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>

      <GridBackground />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <AnimatePresence>
        {isLoading && <LoadingScreen onDone={handleLoaded} />}
      </AnimatePresence>

      <main id="main-content" className="relative z-10">
        <Hero ready={heroReady} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
