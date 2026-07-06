'use client'

import { useEffect, useRef } from 'react'

/**
 * Lightweight animated "cyber" background: a faint engineering grid plus a
 * drifting node field with cyan/emerald links. Pure 2D canvas (no three.js),
 * capped DPR + node count, and disabled under prefers-reduced-motion.
 */
const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
    }
    let nodes: Node[] = []

    const buildNodes = () => {
      // density scales with area but is capped for performance
      const count = Math.min(70, Math.floor((width * height) / 22000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // move + draw nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(34, 211, 238, ${alpha})`)
            grad.addColorStop(1, `rgba(52, 211, 153, ${alpha})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // node dots
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(103, 232, 249, 0.6)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let running = false
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || prefersReduced) return
      running = true
      loop()
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    window.addEventListener('resize', resize)

    // Pause the animation loop while the hero is scrolled out of view to
    // avoid needless CPU/jank (helps responsiveness on mobile).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    if (prefersReduced) {
      draw() // one static frame
    } else {
      start()
    }

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* faint engineering grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* radial fade so the grid/nodes dissolve toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 30%, var(--background) 85%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* central glow aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px]" />
    </div>
  )
}

export default CyberBackground
