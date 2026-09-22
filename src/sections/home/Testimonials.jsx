import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/motion'
import { Eyebrow } from '../../components'
import { testimonials } from '../../data'

/** Returns `step` positions along the list, wrapping at both ends. */
function wrapIndex(index, step) {
  return (index + step + testimonials.length) % testimonials.length
}

/** Manually advanced partner quotes, re-animated each time the quote changes. */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const stage = useRef(null)
  const testimonial = testimonials[index]

  useEffect(() => {
    if (!stage.current || prefersReducedMotion()) return

    // Scoped to this element: a bare selector would also catch a second
    // testimonial block if one were ever added to another section.
    const context = gsap.context(() => {
      gsap.fromTo(
        stage.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power4.out' }
      )
    }, stage)

    return () => context.revert()
  }, [index])

  return (
    <section className="testimonials noise-section">
      <Eyebrow>VOICES FROM THE COURT</Eyebrow>

      <div className="testimonial-stage" ref={stage}>
        <blockquote>“{testimonial.quote}”</blockquote>
        <img src={testimonial.image} alt="" loading="lazy" />
        <h3>{testimonial.name}</h3>
        <p>{testimonial.role}</p>
      </div>

      <div className="testimonial-controls">
        <button
          type="button"
          onClick={() => setIndex(current => wrapIndex(current, -1))}
          aria-label="Previous testimonial"
        >
          PREV
        </button>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => setIndex(current => wrapIndex(current, 1))}
          aria-label="Next testimonial"
        >
          NEXT
        </button>
      </div>
    </section>
  )
}
