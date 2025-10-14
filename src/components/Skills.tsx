'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Palette, 
  Database, 
  Zap
} from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'SCSS', level: 85 },
      ]
    },
    {
      title: 'Backend',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PHP', level: 90 },
        { name: 'Laravel', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'jQuery', level: 80 },
        { name: 'AJAX', level: 85 },
        { name: 'REST APIs', level: 80 },
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'phpMyAdmin', level: 80 },
        { name: 'Database Design', level: 80 },
        { name: 'Query Optimization', level: 75 },
        { name: 'Data Modeling', level: 75 },
      ]
    },
    {
      title: 'Tools & Others',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', level: 80 },
        { name: 'Responsive Design', level: 90 },
        { name: 'Bootstrap', level: 85 },
        { name: 'Version Control', level: 80 },
        { name: 'Testing', level: 70 },
        { name: 'Deployment', level: 75 },
      ]
    }
  ]

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary-900/20 via-transparent to-primary-900/20" />
      
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
              Skills & Expertise
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              A comprehensive toolkit for building modern, scalable web applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-2xl hover:border-primary-500/50 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-primary-400 text-sm font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Continuous Learning & Growth
              </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  I&apos;m passionate about staying up-to-date with the latest technologies and best practices. 
                  I regularly participate in online courses, contribute to open-source projects, and experiment 
                  with new frameworks and tools to expand my skill set and deliver cutting-edge solutions.
                </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Always Learning', 'Problem Solver', 'Team Player', 'Detail Oriented', 'Performance Focused'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-full text-sm text-white/80"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
