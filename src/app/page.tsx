import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  return (
    <>
      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      {/* AI Assistant - Floating Button */}
      <AIAssistant />
    </>
  )
}