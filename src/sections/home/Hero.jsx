import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapAnimation } from '../../hooks'
import { SITE } from '../../site'

/**
 * The headline words, with how far each drifts sideways while the hero scrolls
 * away. Keeping the offsets beside the text means the markup and the parallax
 * can never fall out of step.
 */
const HERO_LINES = [
  { text: 'TENNIS', modifier: 'one', xPercent: 15 },
  { text: 'INTO', modifier: 'two', xPercent: 5 },
  { text: 'CULTURE', modifier: 'three', xPercent: -12 }
]

/** Full-height opening: the serve photograph behind three drifting words. */
export function Hero() {
  const root = useRef(null)

  useGsapAnimation(root, () => {
    const scrub = () => ({ trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 })

    HERO_LINES.forEach(({ modifier, xPercent }) => {
      gsap.to(`.hero-line--${modifier}`, { xPercent, ease: 'none', scrollTrigger: scrub() })
    })

    gsap.to('.hero-media img', { scale: 1.22, yPercent: 8, ease: 'none', scrollTrigger: scrub() })
  })

  return (
    <section className="home-hero" ref={root}>
      <div className="hero-media">
        <img
          src="/images/hero-serve.webp"
          alt="Tennis player serving under evening court lights"
          fetchPriority="high"
        />
      </div>
      <div className="hero-shade" />

      <h1 className="hero-title">
        {HERO_LINES.map(({ text, modifier }) => (
          <span key={modifier} className={`hero-line hero-line--${modifier}`}>
            {text}
          </span>
        ))}
      </h1>

      <p className="hero-intro">
        A film and photography studio shaping the visual culture of tennis — from athlete journeys
        to global brand campaigns.
      </p>
      <p className="hero-index">{SITE.locations.toUpperCase()}</p>
    </section>
  )
}
