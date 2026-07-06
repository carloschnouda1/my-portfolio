'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      requestAnimationFrame(() =>
        element.scrollIntoView({ behavior: 'smooth' })
      )
    }
  }

  return (
    <motion.nav
      initial={{ y: -110 }}
      animate={{ y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 z-50 mx-auto w-[92%] max-w-3xl"
    >
      {/* Pill header bar */}
      <div className="rounded-full glass-dark border border-white/10 px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-2 font-mono text-sm font-semibold text-white transition-colors hover:text-primary-300"
          >
            <Terminal className="h-4 w-4 text-primary-400" />
            <span className="gradient-text">~/carlos</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-primary-300' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary-400/10 ring-1 ring-primary-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden rounded-full bg-gradient-cyber px-4 py-1.5 text-sm font-semibold text-[#04110f] shadow-[0_0_18px_rgba(34,211,238,0.25)] transition-shadow hover:shadow-[0_0_28px_rgba(52,211,153,0.45)] md:block"
          >
            Hire me
          </button>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — separate panel below the pill (no pill-radius clipping) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mt-2 overflow-hidden rounded-2xl glass-dark border border-white/10 md:hidden"
          >
            <div className="space-y-1 p-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    active === item.href.slice(1)
                      ? 'bg-primary-400/10 text-primary-300'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 block w-full rounded-lg bg-gradient-cyber px-3 py-2.5 text-center text-sm font-semibold text-[#04110f]"
              >
                Hire me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
