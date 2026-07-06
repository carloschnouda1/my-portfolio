'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import TechBadge from './ui/TechBadge'
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/motion'

const stats = [
  { label: 'Years building', value: '4+' },
  { label: 'Projects shipped', value: '10+' },
  { label: 'Core stacks', value: '5' },
  { label: 'Happy clients', value: '5+' },
]

const highlights = [
  'Architecture-first thinking',
  'Clean, maintainable code',
  'Performance optimization',
  'Web & mobile delivery',
  'Cross-functional collaboration',
  'From concept to deployment',
]

const coreTech = ['Laravel', 'Next.js', 'TypeScript', 'React', 'React Native', 'MySQL', 'Node.js']

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="01 — about"
            title="I turn complex problems into shippable products"
            subtitle="Full Stack Engineer focused on the whole picture — data models, APIs, and the interfaces people actually use."
          />

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Bio */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <p className="text-lg leading-relaxed text-white/80">
                  I&apos;m a Full Stack Engineer with 4 years of experience building dynamic,
                  responsive web and mobile applications. I care less about tools and more about
                  outcomes: reliable systems, clean architecture, and interfaces that convert.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-white/80">
                  Day to day I work across Laravel, Next.js, TypeScript, React and React Native —
                  shipping CMS systems, e-commerce platforms, and dynamic frontends from first
                  commit to production. I also freelance and collaborate with teams on larger
                  builds.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <motion.div
                    key={h}
                    variants={staggerItem}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary-400/15">
                      <Check className="h-3 w-3 text-secondary-300" />
                    </span>
                    <span className="text-sm text-white/75">{h}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats + tech */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    className="glass ring-glow rounded-2xl p-6 text-center transition-colors hover:border-primary-400/40"
                  >
                    <div className="gradient-text text-3xl font-bold md:text-4xl">{stat.value}</div>
                    <div className="mt-1 font-mono text-xs text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <h4 className="mono-label mb-4 text-sm text-primary-300">core_stack</h4>
                <div className="flex flex-wrap gap-2">
                  {coreTech.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
