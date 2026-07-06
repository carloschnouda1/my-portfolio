'use client'

import { Github, Linkedin, Mail, Terminal } from 'lucide-react'

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Github, href: 'https://github.com/carloschnouda1', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/carloschnouda', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:carlos.chnouda@gmail.com', label: 'Email' },
]

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/8 px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Signature */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Terminal className="h-4 w-4 text-primary-400" />
            <span className="gradient-text">~/carlos</span>
          </div>
          <p className="font-mono text-xs text-white/40">Full Stack Engineer · Building for the web &amp; mobile</p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {quickLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/55 transition-colors hover:text-primary-300"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition-colors hover:border-primary-400/50 hover:text-primary-300"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center font-mono text-xs text-white/35">
        © {new Date().getFullYear()} Carlos Chnouda — built with Next.js, TypeScript &amp; Tailwind
      </div>
    </footer>
  )
}

export default Footer
