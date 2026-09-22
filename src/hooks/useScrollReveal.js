import { gsap } from '../lib/gsap'
import { useGsapAnimation } from './useGsapAnimation'

/**
 * Fades and lifts every `[data-reveal]` element inside `scope` as it scrolls in.
 *
 * The attribute — rather than a class — keeps the animation hook out of the
 * stylesheet's namespace: it is behaviour, not styling, and marks an element as
 * animatable without implying it is also styled.
 */
export function useScrollReveal(scope) {
  useGsapAnimation(scope, () => {
    gsap.utils.toArray('[data-reveal]').forEach(element => {
      gsap.from(element, {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      })
    })
  })
}
