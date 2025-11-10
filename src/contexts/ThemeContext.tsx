'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  currentDisplayTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  const currentDisplayTheme = theme

  // Handle hydration mismatch and initial theme setup
  useEffect(() => {
    setMounted(true)

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // Default to dark theme
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Save theme to localStorage
    localStorage.setItem('theme', theme)

    // Apply the actual display theme to document
    document.documentElement.setAttribute('data-theme', theme)

    // Update CSS custom properties
    const root = document.documentElement
    if (theme === 'light') {
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
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentDisplayTheme, setTheme }}>
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
