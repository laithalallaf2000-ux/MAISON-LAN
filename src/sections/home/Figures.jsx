import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapAnimation } from '../../hooks'
import { Eyebrow } from '../../components'

const FIGURES = [
  { value: 84, suffix: '+', label: 'productions delivered' },
  { value: 19, suffix: '+', label: 'tennis partners' },
  { value: 32, suffix: 'M+', label: 'organic views' },
  { value: 14, suffix: '', label: 'countries covered' }
]

const COUNT_DURATION = 1.8

/**
 * Studio numbers that count up as they scroll into view.
 *
 * The final figures are rendered into the markup rather than starting at zero,
 * so they are correct before the tween runs — which is what visitors with
 * reduced motion, or without JavaScript, actually see.
 */
export function Figures() {
  const root = useRef(null)
  const valueRefs = useRef([])

  useGsapAnimation(root, () => {
    valueRefs.current.forEach((node, index) => {
      if (!node) return

      const { value, suffix } = FIGURES[index]
      const counter = { current: 0 }

      gsap.to(counter, {
        current: value,
        duration: COUNT_DURATION,
        ease: 'power3.out',
        scrollTrigger: { trigger: node, start: 'top 88%', once: true },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.current)}${suffix}`
        }
      })
    })
  })

  return (
    <section className="figures noise-section" ref={root}>
      <Eyebrow>IN NUMBERS</Eyebrow>
      <div className="figure-grid">
        {FIGURES.map((figure, index) => (
          <article key={figure.label}>
            <span>{String(index + 1).padStart(2, '0')}.</span>
            <strong
              ref={node => {
                valueRefs.current[index] = node
              }}
            >
              {figure.value}
              {figure.suffix}
            </strong>
            <p>{figure.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
