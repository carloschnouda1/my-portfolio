'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { services } from '@/data/services'
import { staggerContainer, staggerItem } from '@/utils/motion'

const Services = () => {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="04 — services"
            title="What I can build for you"
            subtitle="Freelance engineering across the full lifecycle — pick a lane or bring the whole product."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.button
                  key={service.title}
                  variants={staggerItem}
                  whileHover={{ y: -6 }}
                  onClick={scrollToContact}
                  className="glass ring-glow group flex flex-col rounded-2xl p-6 text-left transition-colors hover:border-primary-400/40"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-400/25 bg-primary-400/5 text-primary-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-primary-300" />
                  </div>

                  <h3 className="mb-2 text-base font-semibold text-white">{service.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/60">
                    {service.description}
                  </p>

                  <ul className="mt-auto space-y-1.5">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 font-mono text-xs text-white/50">
                        <span className="text-secondary-400">–</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
