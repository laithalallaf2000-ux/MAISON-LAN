import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registering here — rather than in each page — guarantees the plugin is
// installed exactly once, before any module tries to build a ScrollTrigger.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
