'use client'

import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'
import TechBadge from './ui/TechBadge'
import { skillGroups } from '@/data/skills'
import { staggerContainer, staggerItem } from '@/utils/motion'

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      {/* section aura */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-secondary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="02 — stack"
            title="A senior toolkit, grouped by layer"
            subtitle="Not a laundry list — the technologies I reach for across the frontend, backend, and everything that ships them."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  variants={staggerItem}
                  whileHover={{ y: -6 }}
                  className="glass ring-glow group rounded-2xl p-7 transition-colors hover:border-primary-400/40"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-cyber text-[#04110f] shadow-[0_0_18px_rgba(34,211,238,0.25)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                      <p className="font-mono text-xs text-white/45">{group.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <TechBadge
                        key={skill}
                        label={skill}
                        tone={i === 0 ? 'emerald' : 'cyan'}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
