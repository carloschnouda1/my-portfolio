'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Fireworks particle for celebration
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#ff6b9d', '#c44569', '#ff9ff3', '#f368e0', '#ff4757', '#ffa502', '#ffdd59']
    let particles: Particle[] = []
    let animationId: number

    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const particleCount = 80 + Math.floor(Math.random() * 40)

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random()
        const speed = 3 + Math.random() * 8
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 80 + Math.random() * 40,
          color,
          size: 2 + Math.random() * 2,
        })
      }
    }

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFirework(
          canvas.width / 2 + (Math.random() - 0.5) * 400,
          canvas.height / 2 + (Math.random() - 0.5) * 300
        )
      }, i * 300)
    }

    // Continuous fireworks
    const fireworkInterval = setInterval(() => {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6
      )
    }, 800)

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.vx *= 0.98
        p.vy *= 0.98
        p.life++

        if (p.life > p.maxLife) return false

        const alpha = 1 - p.life / p.maxLife
        let fillColor: string
        if (p.color.startsWith('#')) {
          const r = parseInt(p.color.slice(1, 3), 16)
          const g = parseInt(p.color.slice(3, 5), 16)
          const b = parseInt(p.color.slice(5, 7), 16)
          fillColor = `rgba(${r}, ${g}, ${b}, ${alpha})`
        } else {
          fillColor = p.color
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = fillColor
        ctx.fill()

        return true
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearInterval(fireworkInterval)
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)' }}
    />
  )
}

export default function InvitationPage() {
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 180, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const moveNoButton = useCallback((clientX?: number, clientY?: number) => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width - 120
    const maxY = container.height - 120
    const minX = 20
    const minY = 20

    let newX: number
    let newY: number

    // On mobile: move button away from where she's tapping (opposite direction)
    if (clientX !== undefined && clientY !== undefined) {
      const touchX = clientX - container.left
      const touchY = clientY - container.top
      const centerX = container.width / 2
      const centerY = container.height / 2
      // Move to opposite quadrant
      newX = touchX > centerX ? minX : maxX - 80
      newY = touchY > centerY ? minY : maxY - 50
    } else {
      // Desktop: random position
      newX = Math.random() * (maxX - minX) + minX
      newY = Math.random() * (maxY - minY) + minY
    }

    setNoPosition({ x: newX, y: newY })
  }, [])

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center relative bg-gradient-to-b from-rose-950/50 via-pink-950/30 to-rose-950/50">
      {accepted ? (
        <>
          <Fireworks />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 mb-4">
              Yay! 🎉
            </h1>
            <p className="text-2xl md:text-4xl text-pink-200 font-light mb-2">
              You said YES!
            </p>
            <p className="text-xl md:text-2xl text-pink-300/90">
              I can&apos;t wait to be your Valentine! 💕
            </p>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-8 text-6xl"
            >
              💖
            </motion.div>
          </motion.div>
        </>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full max-w-lg min-h-[400px] flex flex-col items-center justify-center px-6 py-12"
        >
          <div className="text-center mb-12">
            <div className="text-6xl mb-6 animate-pulse">💝</div>
            <h1 className="text-3xl md:text-4xl font-bold text-pink-100 mb-2">
              Will you be my Valentine?
            </h1>
            <p className="text-pink-200/80 text-lg">I&apos;d be the luckiest person if you said yes!</p>
          </div>

          <div className="flex gap-6 flex-wrap justify-center items-center relative min-h-[120px]">
            <button
              onClick={() => setAccepted(true)}
              className="px-10 py-4 text-xl font-semibold rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 z-10"
            >
              Yes! 💖
            </button>

            <button
              onMouseEnter={() => moveNoButton()}
              onTouchStart={(e) => {
                e.preventDefault()
                moveNoButton(e.touches[0].clientX, e.touches[0].clientY)
              }}
              onClick={(e) => {
                e.preventDefault()
                moveNoButton()
              }}
              style={{
                position: 'absolute',
                left: noPosition.x,
                top: noPosition.y,
                transition: 'left 0.15s ease-out, top 0.15s ease-out',
              }}
              className="px-10 py-4 text-xl font-medium rounded-2xl bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-600/50 cursor-not-allowed select-none z-0 touch-manipulation min-w-[44px] min-h-[44px]"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
