'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Close menu after a small delay to ensure scroll starts
      setTimeout(() => setIsOpen(false), 100)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -110 }}
      animate={{ y: 20, borderRadius: '45px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed left-0 right-0 z-50 transition-all duration-300 glass backdrop-blur-md border-b border-white/10 w-fit mx-auto'
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="block md:hidden text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            Carlos Chnouda
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <div className='hidden md:block'>
              <ThemeToggle />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='mobile-menu'
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '500px' }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-dark border-t border-white/10 rounded-b-45px overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                  }}
                  className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 py-2 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
