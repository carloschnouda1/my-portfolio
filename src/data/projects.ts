import type { StaticImageData } from 'next/image'
import ReviveClinic from '@/assets/images/revive-clinic.png'
import CodehubSolutions from '@/assets/images/codehubsolutions.png'
import GlutesWithTracy from '@/assets/images/gluteswithtracy.png'
import Portfolio from '@/assets/images/portfolio.png'
import ManaraEvents from '@/assets/images/manara.png'
import QuintaGroup from '@/assets/images/quinta.jpg'
import NokNok from '@/assets/images/noknok.png'
import Bullix from '@/assets/images/bullix.png'
import RasmalVentures from '@/assets/images/rasmal.jpg'
import MustafaAlKadhimi from '@/assets/images/mustafaalkadhimi.png'
import Mabrook from '@/assets/images/mabrook.png'
import Oreyeon from '@/assets/images/oreyeon.png'
import StrategyHub from '@/assets/images/strategyhub.png'

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
  /** short label of what the user's contribution covered (shown on the card) */
  scope: string
  /** specific, concrete things the user shipped */
  contribution: string[]
  tech?: string[]
  liveUrl?: string
  /** the site's SEO / Open Graph image, when it has a usable one */
  image?: StaticImageData
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

/** Projects contributed to as part of a team, with the scope of my work on each. */
export const contributedProjects: ContributedProject[] = [
  {
    name: 'Manara Events',
    description:
      'Riyadh-based events & entertainment company creating experiential AR/VR events, with full-service planning, production, and logistics.',
    role: 'Full Stack Engineer',
    scope: 'Frontend & Backend',
    contribution: [
      'Built the full site end-to-end — frontend and backend',
      'Implemented content management for services and events',
    ],
    liveUrl: 'https://www.manaraevents.net/en',
    image: ManaraEvents,
  },
  {
    name: 'The Quinta Group',
    description:
      'Agricultural & horticulture company supplying greenhouses, irrigation, seeds, and farming solutions across Lebanon and the MENA region.',
    role: 'Backend Engineer',
    scope: 'Backend',
    contribution: ['Developed the backend and data layer for the platform'],
    liveUrl: 'https://www.thequintagroup.com/',
    image: QuintaGroup,
  },
  {
    name: 'NokNok',
    description:
      'Rapid grocery & goods delivery app in Lebanon and Ghana, delivering everyday essentials with live inventory in one touch.',
    role: 'Frontend Engineer',
    scope: 'Features & UI',
    contribution: ['Added new features and enhanced the existing UI'],
    liveUrl: 'https://noknok.co/',
    image: NokNok,
  },
  {
    name: 'Bullix',
    description:
      'Precious-metals portfolio tracker that lets investors monitor holdings in real time across multiple accounts.',
    role: 'Full Stack Engineer',
    scope: 'Full Rebuild',
    contribution: [
      'Rebuilt the site from Webflow into a custom Laravel app',
      'Delivered both the frontend and backend',
    ],
    liveUrl: 'https://bullix.io/',
    image: Bullix,
  },
  {
    name: 'Mustafa Al-Kadhimi',
    image: MustafaAlKadhimi,
    description:
      'Personal platform and blog for the former Iraqi Prime Minister, documenting his work in governance, reform, and regional diplomacy.',
    role: 'Full Stack Engineer',
    scope: 'Frontend & Backend',
    contribution: ['Built the site end-to-end — frontend and backend'],
    liveUrl: 'https://www.mustafaalkadhimi.net/',
  },
  {
    name: 'Mabrook',
    image: Mabrook,
    description:
      'Sales-incentive and rewards platform giving customers of participating brands cash rewards and prizes based on purchase achievements.',
    role: 'Backend Engineer',
    scope: 'Backend',
    contribution: [
      'Fixed and hardened existing backend logic',
      'Added new backend features',
    ],
    liveUrl: 'https://www.mabrouks.com/',
  },
  {
    name: 'Oreyeon',
    image: Oreyeon,
    description:
      'Aviation-safety company whose Runway Surface Monitoring System automates and digitizes airfield inspections and safety reporting.',
    role: 'Backend Engineer',
    scope: 'Backend',
    contribution: ['Developed the backend for the monitoring platform'],
    liveUrl: 'https://www.oreyeon.com/',
  },
  {
    name: 'StrategyHub',
    image: StrategyHub,
    description: 'Qatar-based strategy and management consultancy.',
    role: 'Backend Engineer',
    scope: 'Backend',
    contribution: ['Developed the backend for the site'],
    liveUrl: 'https://strategyhub.qa/',
  },
  {
    name: 'Rasmal Ventures',
    description:
      'Qatar venture-capital firm backing and scaling early-stage market leaders.',
    role: 'Backend Engineer',
    scope: 'Backend',
    contribution: ['Developed the backend for the site'],
    liveUrl: 'https://www.rasmalventures.com/en',
    image: RasmalVentures,
  },
]
