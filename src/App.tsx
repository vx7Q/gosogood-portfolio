import { useI18n } from '@/lib/i18n'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Toolkit } from '@/sections/Toolkit'
import { Projects } from '@/sections/Projects'
import { Journey } from '@/sections/Journey'
import { Skills } from '@/sections/Skills'
import { Contact } from '@/sections/Contact'

export default function App() {
  const { copy } = useI18n()

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-pearl focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-ink"
      >
        {copy.common.skipToContent}
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Toolkit />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
