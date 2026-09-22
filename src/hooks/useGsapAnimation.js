import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Runs `setup` inside a `gsap.context` scoped to the `scope` ref, once on mount.
 *
 * The context is reverted on unmount, which kills every tween and ScrollTrigger
 * created inside it and restores the original inline styles — the piece that is
 * easy to forget when wiring GSAP into React. Animations are skipped entirely
 * when the visitor prefers reduced motion.
 *
 * @param {import('react').RefObject<HTMLElement>} scope Element the selectors are scoped to.
 * @param {() => void} setup Builds the tweens. Only the mount-time value is used.
 */
export function useGsapAnimation(scope, setup) {
  const setupRef = useRef(setup)

  useEffect(() => {
    setupRef.current = setup
  })

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const context = gsap.context(() => setupRef.current(), scope)
    return () => context.revert()
  }, [scope])
}
