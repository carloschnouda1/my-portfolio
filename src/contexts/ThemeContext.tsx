'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isSystemTheme: boolean
  currentDisplayTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark' // Default fallback for SSR
  }

  // Get the actual display theme (light or dark) based on current theme setting
  const getCurrentDisplayTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return getSystemTheme()
    }
    return theme
  }

  // Computed values
  const isSystemTheme = theme === 'system'
  const currentDisplayTheme = getCurrentDisplayTheme()

  // Handle hydration mismatch and initial theme setup
  useEffect(() => {
    setMounted(true)

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'system' || savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // Default to system theme
      setTheme('system')
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = () => {
      // Only update if we're currently using system theme
      if (theme === 'system') {
        // Force re-render by updating state (the display theme will be recalculated)
        setTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [mounted, theme])

  useEffect(() => {
    if (!mounted) return

    // Save theme to localStorage
    localStorage.setItem('theme', theme)

    // Apply the actual display theme to document
    const displayTheme = currentDisplayTheme
    document.documentElement.setAttribute('data-theme', displayTheme)

    // Update CSS custom properties
    const root = document.documentElement
    if (displayTheme === 'light') {
      root.style.setProperty('--background', '#ffffff')
      root.style.setProperty('--foreground', '#1a1a1a')
      root.style.setProperty('--primary', '#a855f7')
      root.style.setProperty('--secondary', '#667eea')
      root.style.setProperty('--accent', '#4facfe')
    } else {
      root.style.setProperty('--background', '#0a0a0a')
      root.style.setProperty('--foreground', '#ededed')
      root.style.setProperty('--primary', '#a855f7')
      root.style.setProperty('--secondary', '#667eea')
      root.style.setProperty('--accent', '#4facfe')
    }
  }, [theme, currentDisplayTheme, mounted])

  const toggleTheme = () => {
    // Cycle through: system -> light -> dark -> system
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme, currentDisplayTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
