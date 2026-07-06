'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

type Variant = 'solid' | 'ghost' | 'outline'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: Variant
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm md:text-base px-7 py-3.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  solid:
    'bg-gradient-cyber text-[#04110f] shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_34px_rgba(52,211,153,0.45)]',
  ghost:
    'glass text-white border border-white/10 hover:border-primary-400/50 hover:bg-white/5',
  outline:
    'bg-transparent text-primary-300 border border-primary-400/40 hover:bg-primary-400/10 hover:border-primary-400',
}

const Button = ({ variant = 'solid', children, className = '', ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.04 }}
      whileTap={{ scale: props.disabled ? 1 : 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
