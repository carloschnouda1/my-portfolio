import { Layers, AppWindow, FileCode2, ShoppingCart, type LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  description: string
  icon: LucideIcon
  points: string[]
}

export const services: Service[] = [
  {
    title: 'Full-Stack Development',
    description:
      'End-to-end delivery — from database and API design to a polished, responsive frontend.',
    icon: Layers,
    points: ['Architecture & data modeling', 'Laravel / Node APIs', 'Next.js frontends'],
  },
  {
    title: 'Web App Development',
    description:
      'Dynamic, high-performance web applications built to scale with your product.',
    icon: AppWindow,
    points: ['SPA & SSR apps', 'Auth & dashboards', 'Third-party integrations'],
  },
  {
    title: 'CMS Systems',
    description:
      'Custom content management so your team can update the site without touching code.',
    icon: FileCode2,
    points: ['Custom admin panels', 'Role-based access', 'Structured content models'],
  },
  {
    title: 'E-commerce Solutions',
    description:
      'Storefronts and checkout flows engineered for conversion and reliability.',
    icon: ShoppingCart,
    points: ['Product & inventory', 'Payment integration', 'Order management'],
  },
]
