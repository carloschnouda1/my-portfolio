import { Layout, Server, Wrench, type LucideIcon } from 'lucide-react'

export interface SkillGroup {
  title: string
  tagline: string
  icon: LucideIcon
  /** the first item is highlighted as a "core" skill */
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    tagline: 'Interfaces that scale',
    icon: Layout,
    skills: [
      'Next.js',
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5 / CSS3',
    ],
  },
  {
    title: 'Backend',
    tagline: 'APIs & architecture',
    icon: Server,
    skills: [
      'Laravel',
      'PHP',
      'Node.js',
      'REST APIs',
      'MySQL',
      'PostgreSQL',
      'Auth & Sessions',
      'CMS Systems',
    ],
  },
  {
    title: 'Tools & Practices',
    tagline: 'Ship with confidence',
    icon: Wrench,
    skills: [
      'Git',
      'CI / Deployment',
      'Vercel',
      'Performance Optimization',
      'Responsive Design',
      'Clean Architecture',
      'Testing',
      'SEO',
    ],
  },
]
