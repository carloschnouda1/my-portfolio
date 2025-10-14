'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  // Default to dark theme for SSR
  const currentTheme = theme || 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-3 glass rounded-full hover:bg-white/10 transition-all duration-300 group"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: currentTheme === 'light' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {currentTheme === 'light' ? (
          <Moon className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors duration-300" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
        )}
      </motion.div>
      
      {/* Tooltip */}
      {/* <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
          {currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
      </div> */}
    </motion.button>
  )
}

export default ThemeToggle
