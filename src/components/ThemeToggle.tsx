'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme, isSystemTheme, currentDisplayTheme } = useTheme()

  // Get the icon and label for current theme
  const getThemeInfo = () => {
    switch (theme) {
      case 'system':
        return {
          icon: <Monitor className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />,
          label: 'Using System Theme - Click to set Light Mode',
          nextMode: 'Light'
        }
      case 'light':
        return {
          icon: <Moon className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors duration-300" />,
          label: 'Light Mode - Click to set Dark Mode',
          nextMode: 'Dark'
        }
      case 'dark':
        return {
          icon: <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />,
          label: 'Dark Mode - Click to set System Theme',
          nextMode: 'System'
        }
      default:
        return {
          icon: <Monitor className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />,
          label: 'System Theme',
          nextMode: 'Light'
        }
    }
  }

  const themeInfo = getThemeInfo()

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="relative p-3 glass rounded-full hover:bg-white/10 transition-all duration-300"
        aria-label={`Switch to ${themeInfo.nextMode} mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'light' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {themeInfo.icon}
        </motion.div>
      </motion.button>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
          {themeInfo.label}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
      </div>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          theme === 'system' ? 'bg-blue-400' : 'bg-gray-400 dark:bg-gray-600'
        }`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          theme === 'light' ? 'bg-slate-700' : 'bg-gray-400 dark:bg-gray-600'
        }`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          theme === 'dark' ? 'bg-yellow-400' : 'bg-gray-400 dark:bg-gray-600'
        }`} />
      </div>
    </div>
  )
}

export default ThemeToggle
