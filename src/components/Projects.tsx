'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/motion'
import ReviveClinic from '@/assets/images/revive.png'
import CodehubSolutions from '@/assets/images/codehubsolutions.png'
import GlutesWithTracy from '@/assets/images/gluteswithtracy.png'
import Portfolio from '@/assets/images/portfolio.png'
import Image from 'next/image'

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio',
      description: 'My personal portfolio website built with Next.js, Tailwind CSS, TypeScript, and Framer Motion.',
      image: Portfolio,
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
      liveUrl: 'https://www.carloschnouda.info',
      githubUrl: null,
      featured: true
    },
    {
      title: 'Revive Clinic',
      description: 'Revive Clinic is a project in order to learn more about clinic services and the teams that work there and how they work together to provide the best care to their patients.',
      image: ReviveClinic,
      technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'PHP'],
      liveUrl: 'https://revive-lb.com',
      githubUrl: null,
      featured: true
    },
    {
      title: 'CodehubSolutions',
      description: 'A modern web development agency website showcasing services and portfolio. Built with Laravel backend and Next.js frontend for optimal performance.',
      image: CodehubSolutions,
      technologies: ['Laravel', 'Next.js', 'Tailwind CSS', 'MySQL'],
      liveUrl: 'https://codehubsolutions.com',
      githubUrl: null,
      featured: true
    },
    {
      title: 'GlutesWithTracy',
      description: 'A fitness and wellness platform for personal training services. Features workout plans, client management, and progress tracking capabilities.',
      image: GlutesWithTracy,
      technologies: ['Laravel', 'Next.js', 'Tailwind CSS', 'MySQL'],
      liveUrl: 'https://gluteswithtracy.com',
      githubUrl: null,
      featured: true
    }
  ]

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Showcasing my recent work and the technologies I use to bring ideas to life
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group hover:border-primary-500/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-6 group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded text-xs text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Live</span>
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 glass border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-4">
                More Projects & Contributions
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                These are just a few of my recent projects. I&apos;m constantly working on new ideas,
                contributing to open-source projects, and building solutions that make a difference.
                Each project represents a unique challenge and an opportunity to learn and grow.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/carloschnouda', '_blank')}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                View All Projects on GitHub
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
