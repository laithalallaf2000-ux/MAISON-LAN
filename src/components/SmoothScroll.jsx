import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Enables Lenis inertial scrolling for the whole document.
 *
 * Renders nothing — it exists so the scroll loop is mounted and torn down with
 * the page shell rather than living as a stray module-level side effect.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.1 })

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
