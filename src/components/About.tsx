'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Users } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/motion'

const About = () => {
  const stats = [
    { icon: Code, label: 'Years Experience', value: '4+' },
    { icon: Database, label: 'Projects Completed', value: '10+' },
    { icon: Globe, label: 'Technologies', value: '10+' },
    { icon: Users, label: 'Happy Clients', value: '5+' },
  ]

  const highlights = [
    'Full-stack development expertise',
    'Modern web technologies',
    'Responsive design mastery',
    'Clean, maintainable code',
    'Cross-functional collaboration',
    'Performance optimization',
  ]

  return (
    <section id="about" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
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
              About Me
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences through innovative web solutions
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Content */}
            <motion.div variants={fadeInLeft} className="space-y-10">
              <div className="glass p-10 rounded-2xl">
                <h3 className="text-2xl font-semibold text-white mb-8">
                  Full Stack Web Developer
                </h3>
                <p className="text-white/80 leading-relaxed mb-8 text-lg">
                  I&apos;m a passionate Full Stack Web Developer with 4 years of experience building 
                  dynamic, responsive web applications. I specialize in both front-end and back-end 
                  technologies, delivering seamless and efficient digital solutions from concept to deployment.
                </p>
                <p className="text-white/80 leading-relaxed text-lg">
                  My expertise spans modern JavaScript frameworks, PHP with Laravel, database design, 
                  and creating user-friendly interfaces. I&apos;m committed to writing clean, maintainable 
                  code and staying up-to-date with the latest web development trends and best practices.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((highlight) => (
                  <motion.div
                    key={highlight}
                    variants={staggerItem}
                    className="flex items-center space-x-3 glass p-4 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex-shrink-0" />
                    <span className="text-white/80 text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div variants={fadeInRight} className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-2xl text-center group hover:border-primary-500/50 transition-all duration-300"
                >
                    <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-4 group-hover:text-primary-300 transition-colors" />
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills Preview */}
              <div className="glass p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Next.js', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Node.js'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-full text-sm text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  Ready to Work Together?
                </h4>
                <p className="text-white/70 mb-4">
                  Let&apos;s discuss your next project and bring your ideas to life
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
