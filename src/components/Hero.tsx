'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import Scene3D from './canvas/Scene3D'
import { fadeInUp, staggerContainer } from '@/utils/motion'

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4 md:space-y-12"
        >
          {/* Main Title */}
          <motion.div variants={fadeInUp} className="space-y-4 md:space-y-8">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold">
              <span className="gradient-text">Carlos Chnouda</span>
            </h1>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-semibold text-white/90">
              Full Stack Web Developer
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              4 years of experience building dynamic, responsive web applications.
              Skilled in both front-end and back-end technologies, delivering seamless
              and efficient digital solutions from concept to deployment.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:carlos.chnouda@gmail.com')}
              className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-6"
          >
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/carloschnouda1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/carloschnouda"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:carlos.chnouda@gmail.com"
              className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-white" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToAbout}
          className="flex flex-col justify-center items-center text-white/60 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
