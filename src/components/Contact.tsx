'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/utils/motion'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'carlos.chnouda@gmail.com', href: 'mailto:carlos.chnouda@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/carloschnouda', href: 'https://linkedin.com/in/carloschnouda' },
  { icon: Github, label: 'GitHub', value: 'carloschnouda1', href: 'https://github.com/carloschnouda1' },
  { icon: MapPin, label: 'Location', value: 'Lebanon · Remote', href: null },
]

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('Failed to send message. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/35 transition-colors focus:border-primary-400/60 focus:outline-none focus:ring-1 focus:ring-primary-400/40'

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-secondary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="05 — contact"
            title="Let's build something"
            subtitle="Have a project, a role, or an idea? Tell me what you're building — I usually reply within 24 hours."
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Info */}
            <motion.div variants={fadeInLeft} className="space-y-4">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-400/25 bg-secondary-400/5 px-4 py-1.5 font-mono text-xs text-secondary-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-400" />
                available for new projects
              </div>

              {contactInfo.map((info) => {
                const Icon = info.icon
                const inner = (
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-400/25 bg-primary-400/5 text-primary-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-white/45">{info.label}</div>
                      <div className="font-medium text-white transition-colors group-hover:text-primary-300">
                        {info.value}
                      </div>
                    </div>
                  </div>
                )
                return info.href ? (
                  <motion.a
                    key={info.label}
                    whileHover={{ x: 6 }}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-primary-400/30"
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <div
                    key={info.label}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    {inner}
                  </div>
                )
              })}
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInRight} className="glass rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="mb-4 h-14 w-14 text-secondary-400" />
                  <h4 className="mb-2 text-xl font-semibold text-white">Message sent</h4>
                  <p className="text-white/60">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block font-mono text-xs text-white/60">
                        name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block font-mono text-xs text-white/60">
                        email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block font-mono text-xs text-white/60">
                      subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block font-mono text-xs text-white/60">
                      message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button type="submit" variant="solid" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </Button>
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
