const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const COARSE_POINTER = '(pointer: coarse)'

/** True when the visitor has asked their system to limit animation. */
export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches
}

/** True on touch devices, where a cursor-following effect has nothing to follow. */
export function hasCoarsePointer() {
  return window.matchMedia(COARSE_POINTER).matches
}
