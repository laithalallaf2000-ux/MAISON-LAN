import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { SITE } from '../site'

const SEEN_KEY = 'elan-seen'
const LOGO_LETTERS = SITE.name.toUpperCase().split('')

// Session storage throws when the browser blocks site data (Safari private
// browsing, hardened privacy settings). A failed read just replays the intro.
function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Nothing to do — the intro simply plays again next navigation.
  }
}

/**
 * Full-screen intro curtain, played once per browsing session.
 *
 * Because every navigation is a full page load, the session flag is what stops
 * the animation replaying on each click.
 */
export function Loader() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const node = root.current
    if (!node) return

    if (hasSeenIntro() || prefersReducedMotion()) {
      node.style.display = 'none'
      return
    }

    const lines = node.querySelectorAll('.loader-line')
    const letters = node.querySelectorAll('.loader-letter')

    document.documentElement.classList.add('is-loading')

    const timeline = gsap.timeline({
      onComplete: () => {
        node.style.display = 'none'
        document.documentElement.classList.remove('is-loading')
        rememberIntro()
      }
    })

    timeline
      .to(lines, { scale: 1, duration: 0.7, stagger: 0.06, ease: 'power4.out' })
      .fromTo(
        letters,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, stagger: 0.035, ease: 'power4.out' },
        '-=.45'
      )
      .to(letters, { yPercent: -130, duration: 0.55, stagger: 0.025, ease: 'power3.in' }, '+=.35')
      .to(node, { clipPath: 'circle(0% at 50% 50%)', duration: 0.95, ease: 'power4.inOut' }, '-=.2')

    return () => {
      timeline.kill()
      document.documentElement.classList.remove('is-loading')
    }
  }, [])

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-grid">
        <i className="loader-line h a" />
        <i className="loader-line h b" />
        <i className="loader-line v c" />
        <i className="loader-line v d" />
        <i className="loader-line v e" />
      </div>
      <p className="loader-logo">
        {LOGO_LETTERS.map((letter, index) => (
          <span key={index}>
            <b className="loader-letter">{letter === ' ' ? ' ' : letter}</b>
          </span>
        ))}
      </p>
    </div>
  )
}
