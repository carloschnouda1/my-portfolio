'use client'

import { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { freelanceProjects, contributedProjects } from '@/data/projects'
import { staggerContainer, staggerItem } from '@/utils/motion'

interface MediaProject {
  name: string
  description: string
  tech: string[]
  liveUrl?: string
  image?: StaticImageData
  placeholder?: boolean
}

// Merge both categories into one unified media grid (all 6 projects).
const projects: MediaProject[] = [
  ...freelanceProjects.map((p) => ({
    name: p.name,
    description: p.description,
    tech: p.tech,
    liveUrl: p.liveUrl,
    image: p.image,
  })),
  ...contributedProjects.map((p) => ({
    name: p.name,
    description: p.description,
    tech: p.tech,
    liveUrl: p.liveUrl,
    placeholder: p.placeholder,
  })),
]

// Distinct hover border colors (RGB triplets), cycled per card.
const hoverColors = ['251,191,36', '34,197,94', '244,63,94', '125,211,252', '0,212,200']
const colorVars = (rgb: string): CSSProperties =>
  ({ ['--c']: `rgb(${rgb})`, ['--g']: `rgba(${rgb},0.22)` } as CSSProperties)

const cardHover =
  'border border-white/10 transition-all duration-300 hover:border-[color:var(--c)] hover:shadow-[0_0_30px_var(--g)]'

const featured = projects[0]
const rest = projects.slice(1)

/** Image tile, or a gradient placeholder when a project has no image. */
const MediaImage = ({
  project,
  badge,
  className = '',
}: {
  project: MediaProject
  badge: string
  className?: string
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    {project.image ? (
      <Image
        src={project.image}
        alt={project.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="grid-bg flex h-full w-full items-center justify-center bg-surface/60">
        <FolderGit2 className="h-10 w-10 text-white/20" />
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-transparent to-transparent" />
    {/* source-style badge */}
    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[var(--background)]/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-white/80 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--c)' }} />
      {badge}
    </span>
  </div>
)

// Visual affordance only — the whole card is the link (see ProjectCard).
const ViewLink = ({ href }: { href?: string }) =>
  href ? (
    <span className="inline-flex items-center gap-1 font-mono text-sm text-white/70 transition-colors group-hover:text-[color:var(--c)]">
      View Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 font-mono text-sm text-white/30">
      Private <ArrowUpRight className="h-4 w-4" />
    </span>
  )

// Renders as a link when the project has a URL, otherwise a plain article.
const cardLinkProps = (href?: string) =>
  href
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer', 'aria-label': `View project (opens in new tab)` }
    : {}

const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="03 — work"
            title="FeaturedProjects"
            subtitle="A selection of products I've built and shipped."
          />

          {/* Featured card */}
          <motion.a
            variants={staggerItem}
            style={colorVars(hoverColors[4])}
            {...cardLinkProps(featured.liveUrl)}
            className={`group mb-6 grid overflow-hidden rounded-2xl bg-white/[0.02] md:grid-cols-2 ${cardHover} ${
              featured.liveUrl ? 'cursor-pointer' : ''
            }`}
          >
            <MediaImage project={featured} badge={featured.tech[0]} className="min-h-[240px] md:min-h-[340px]" />

            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--c)]">
                Featured · {featured.tech.slice(0, 2).join(' · ')}
              </div>
              <h3 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                {featured.name}
              </h3>
              <p className="mt-4 leading-relaxed text-white/60">{featured.description}</p>
              <div className="mt-8">
                <ViewLink href={featured.liveUrl} />
              </div>
            </div>
          </motion.a>

          {/* Row of smaller cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((project, i) => (
              <motion.a
                key={project.name}
                variants={staggerItem}
                style={colorVars(hoverColors[i % hoverColors.length])}
                {...cardLinkProps(project.liveUrl)}
                className={`group flex flex-col overflow-hidden rounded-2xl bg-white/[0.02] ${cardHover} ${
                  project.liveUrl ? 'cursor-pointer' : ''
                }`}
              >
                <MediaImage
                  project={project}
                  badge={project.placeholder ? 'placeholder' : project.tech[0]}
                  className="h-44"
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 font-mono text-xs uppercase tracking-wider text-white/40">
                    {project.tech.slice(0, 2).join(' · ')}
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-white">{project.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>
                  <div className="mt-5 pt-1">
                    <ViewLink href={project.liveUrl} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
