'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('Failed to send message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'carlos.chnouda@gmail.com',
      href: 'mailto:carlos.chnouda@gmail.com'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'carloschnouda',
      href: 'https://github.com/carloschnouda'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'carloschnouda',
      href: 'https://linkedin.com/in/carloschnouda'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lebanon',
      href: null
    }
  ]

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
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
              Get In Touch
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life.
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <motion.div variants={staggerItem} className="space-y-10">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8">
                  Let&apos;s Connect
                </h3>
                <p className="text-white/70 leading-relaxed mb-10 text-lg">
                  I&apos;m always excited to work on new projects and collaborate with fellow developers. 
                  Whether you have a specific project in mind or just want to chat about web development, 
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    variants={staggerItem}
                    whileHover={{ x: 10 }}
                    className="glass p-4 rounded-xl hover:border-primary-500/50 transition-all duration-300"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4 group"
                      >
                        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white/60 text-sm">{info.label}</div>
                          <div className="text-white font-medium group-hover:text-primary-300 transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white/60 text-sm">{info.label}</div>
                          <div className="text-white font-medium">{info.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <div className="glass p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-medium">Available for new projects</span>
                </div>
                <p className="text-white/70 text-sm">
                  I&apos;m currently available for freelance projects and full-time opportunities. 
                  Response time is usually within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={staggerItem} className="glass p-10 rounded-2xl">
              <h3 className="text-2xl font-semibold text-white mb-8">
                Send a Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-white/70">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="What&apos;s this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
