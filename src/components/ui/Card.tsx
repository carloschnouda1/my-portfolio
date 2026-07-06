'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode
  /** lift on hover */
  hover?: boolean
  /** show animated cyan/emerald gradient border on hover */
  ring?: boolean
}

const Card = ({ children, hover = true, ring = true, className = '', ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      className={`glass rounded-2xl transition-all duration-300 ${
        ring ? 'ring-glow' : ''
      } hover:border-primary-400/40 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
