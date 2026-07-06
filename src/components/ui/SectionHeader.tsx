'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/utils/motion'

interface SectionHeaderProps {
  /** Mono eyebrow label, e.g. "01 — about" (the `//` prefix is added automatically) */
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) => {
  const isCenter = align === 'center'
  return (
    <motion.div
      variants={fadeInUp}
      className={isCenter ? 'text-center mb-14 md:mb-20' : 'mb-14 md:mb-20'}
    >
      <div
        className={`mono-label text-sm text-primary-400 mb-4 flex items-center gap-2 ${
          isCenter ? 'justify-center' : ''
        }`}
      >
        <span className="text-secondary-400">{'//'}</span>
        <span>{eyebrow}</span>
        <span className="h-px w-10 bg-gradient-to-r from-primary-400/60 to-transparent" />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg text-[var(--muted)] mt-5 leading-relaxed ${
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeader
