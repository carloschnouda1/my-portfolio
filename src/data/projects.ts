import type { StaticImageData } from 'next/image'
import ReviveClinic from '@/assets/images/revive.png'
import CodehubSolutions from '@/assets/images/codehubsolutions.png'
import GlutesWithTracy from '@/assets/images/gluteswithtracy.png'
import Portfolio from '@/assets/images/portfolio.png'

export interface FreelanceProject {
  name: string
  description: string
  image: StaticImageData
  tech: string[]
  features: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface ContributedProject {
  name: string
  /** short context on what the product/team is */
  description: string
  /** the user's title/role on the team */
  role: string
  /** specific, concrete things the user shipped */
  contribution: string[]
  tech: string[]
  liveUrl?: string
  /** flag placeholder entries so they're obvious to fill in later */
  placeholder?: boolean
}

/** Projects built end-to-end as a freelancer. */
export const freelanceProjects: FreelanceProject[] = [
  {
    name: 'CodeHub Solutions',
    description:
      'Web development agency site showcasing services and portfolio, built with a Laravel backend and a Next.js frontend for performance and SEO.',
    image: CodehubSolutions,
    tech: ['Laravel', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL'],
    features: [
      'Decoupled Laravel API + Next.js frontend',
      'Server-rendered pages for SEO',
      'Content-managed services & portfolio',
    ],
    liveUrl: 'https://codehubsolutions.com',
  },
  {
    name: 'Revive Clinic',
    description:
      'Clinic platform presenting services, teams, and how they collaborate to deliver patient care, with a content-managed backend.',
    image: ReviveClinic,
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL'],
    features: [
      'Custom CMS for services & team content',
      'Responsive, accessible marketing site',
      'Optimized queries & page performance',
    ],
    liveUrl: 'https://revive-lb.com',
  },
  {
    name: 'Glutes with Tracy',
    description:
      'Fitness & wellness platform for personal-training services with workout plans, client management, and progress tracking.',
    image: GlutesWithTracy,
    tech: ['Laravel', 'Next.js', 'Tailwind CSS', 'MySQL'],
    features: [
      'Client management & progress tracking',
      'Workout plan delivery',
      'Laravel API consumed by a Next.js frontend',
    ],
    liveUrl: 'https://gluteswithtracy.com',
  },
  {
    name: 'Personal Portfolio',
    description:
      'This site — a performance-focused personal portfolio with a custom animated background, contact pipeline, and AI assistant.',
    image: Portfolio,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Custom animated canvas background',
      'Contact form → email + MongoDB pipeline',
      'AI assistant powered by an API route',
    ],
    liveUrl: 'https://www.carloschnouda.info',
  },
]

/**
 * Projects contributed to as part of a team.
 * TODO(carlos): replace these PLACEHOLDER entries with real team projects —
 * fill in `role`, concrete `contribution` bullets, `tech`, and `liveUrl`.
 */
export const contributedProjects: ContributedProject[] = [
  {
    name: 'PLACEHOLDER — Team Project A',
    description:
      'Short context on the product and the team you worked with. Replace this entry.',
    role: 'Full Stack Engineer',
    contribution: [
      'Describe a concrete feature you owned (e.g. built the checkout flow)',
      'Describe a system you improved (e.g. refactored the API layer)',
      'Describe measurable impact if any (e.g. cut load time 40%)',
    ],
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL'],
    placeholder: true,
  },
  {
    name: 'PLACEHOLDER — Team Project B',
    description:
      'Short context on the product and the team you worked with. Replace this entry.',
    role: 'Frontend Engineer',
    contribution: [
      'Concrete UI/feature you shipped',
      'A reusable component system or design-system work',
      'Cross-functional collaboration highlight',
    ],
    tech: ['Next.js', 'React Native', 'TypeScript'],
    placeholder: true,
  },
]
