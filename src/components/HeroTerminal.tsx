'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cosmetic terminal window for the Hero: auto-types a scripted sequence of
 * command → output lines with a blinking cursor, then loops. Not
 * command-interactive. Renders the full transcript statically under
 * prefers-reduced-motion (mirrors the guard in CyberBackground.tsx).
 */

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string }

const script: Line[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Carlos Chnouda — Full Stack Engineer' },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'out', text: 'Laravel · Next.js · TypeScript · React · React Native' },
  { type: 'cmd', text: './ship --scalable' },
  { type: 'out', text: 'web apps · mobile apps · CMS · e-commerce' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: '● available for freelance & collaboration' },
]

const TYPE_MS = 38 // per char while typing a command
const OUT_DELAY = 260 // pause before output prints
const LINE_DELAY = 500 // pause after an output line
const LOOP_DELAY = 3200 // pause before restarting the sequence

interface Rendered {
  type: 'cmd' | 'out'
  text: string
  done: boolean
}

const HeroTerminal = () => {
  const [lines, setLines] = useState<Rendered[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setReducedMotion(true)
      setLines(script.map((l) => ({ ...l, done: true })))
      return
    }

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timers.current.push(id)
    }

    const run = () => {
      setLines([])
      let delay = 400

      script.forEach((line) => {
        if (line.type === 'cmd') {
          // push an empty command line, then type it out char by char
          schedule(() => {
            setLines((prev) => [...prev, { type: 'cmd', text: '', done: false }])
          }, delay)

          for (let i = 1; i <= line.text.length; i++) {
            delay += TYPE_MS
            schedule(() => {
              setLines((prev) => {
                const next = [...prev]
                next[next.length - 1] = {
                  type: 'cmd',
                  text: line.text.slice(0, i),
                  done: i === line.text.length,
                }
                return next
              })
            }, delay)
          }
          delay += OUT_DELAY
        } else {
          schedule(() => {
            setLines((prev) => [...prev, { type: 'out', text: line.text, done: true }])
          }, delay)
          delay += LINE_DELAY
        }
      })

      // loop
      delay += LOOP_DELAY
      schedule(run, delay)
    }

    run()

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0b0a26]/85 text-left shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-secondary-400/70" />
        <span className="ml-2 font-mono text-xs text-white/40">carlos@portfolio: ~/carlos</span>
      </div>

      {/* body — fixed height, top-anchored so typing/looping never resizes it */}
      <div className="flex h-[300px] flex-col justify-start space-y-1.5 overflow-hidden p-4 font-mono text-xs leading-relaxed lg:h-[460px] sm:text-sm">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1
          if (line.type === 'cmd') {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="select-none text-secondary-400">$</span>
                <span className="text-white/90">
                  {line.text}
                  {!reducedMotion && isLast && !line.done && (
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary-400" />
                  )}
                </span>
              </div>
            )
          }
          return (
            <div key={i} className="pl-4 text-primary-200/80">
              {line.text}
            </div>
          )
        })}

        {/* trailing prompt cursor when idle between/after lines */}
        {!reducedMotion &&
          (lines.length === 0 || lines[lines.length - 1]?.type === 'out') && (
            <div className="flex items-start gap-2">
              <span className="select-none text-secondary-400">$</span>
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary-400" />
            </div>
          )}
      </div>
    </div>
  )
}

export default HeroTerminal
