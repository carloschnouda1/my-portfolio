'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import CyberBackground from './canvas/CyberBackground'
import HeroTerminal from './HeroTerminal'
import Button from './ui/Button'
import { fadeInUp, staggerContainer } from '@/utils/motion'

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-28 sm:py-24 lg:py-0"
    >
      <CyberBackground />

      <div className="relative z-10 mx-auto w-full max-w-full px-6 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: main info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            {/* Eyebrow / status */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/70"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-400" />
              <span className="text-secondary-300">{'>'}</span>
              available for freelance &amp; collaboration
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-6xl xl:text-7xl"
            >
              Carlos Chnouda
              <span className="mt-3 block gradient-text p-3">Full Stack Engineer</span>
            </motion.h1>

            {/* Value proposition */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-xl lg:mx-0"
            >
              I build scalable web &amp; mobile apps, CMS and e-commerce platforms with Laravel,
              Next.js, TypeScript &amp; React — from architecture to deployment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button variant="solid" onClick={() => scrollTo('#contact')}>
                Hire me <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => scrollTo('#projects')}>
                View projects
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex justify-center gap-4 lg:justify-start"
            >
              {[
                { icon: Github, href: 'https://github.com/carloschnouda1', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/carloschnouda', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:carlos.chnouda@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-white/80 transition-colors hover:border-primary-400/50 hover:text-primary-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: interactive terminal */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <HeroTerminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/50 transition-colors hover:text-white"
        aria-label="Scroll to about"
      >
        <span className="mb-2 font-mono text-xs">scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </section>
  )
}

export default Hero
