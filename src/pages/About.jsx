import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useGsapAnimation } from '../hooks'
import { ArrowLink, Eyebrow } from '../components'
import { services } from '../data'

const MANIFESTO =
  'Tennis is a game of margins, but its culture is expansive. We think before we shoot — building every image around an idea, a feeling and a reason to exist. Our purpose is simple: turn the emotion of tennis into stories that move beyond the court.'

const DIM = '#3d4039'
const BRIGHT = '#f3f0e7'

const VALUES = [
  { number: '01', title: 'INTENTION', body: 'Every frame begins with a reason.' },
  { number: '02', title: 'PROXIMITY', body: 'We stay close to the people and the pressure.' },
  { number: '03', title: 'CRAFT', body: 'Small decisions create lasting images.' },
  { number: '04', title: 'PACE', body: 'Built for both the moment and the archive.' }
]

const COLLAGE = [
  { src: '/images/clay-slide.webp', alt: 'Clay court movement' },
  { src: '/images/recovery-portrait.webp', alt: 'Athlete portrait' },
  { src: '/images/show-court.webp', alt: 'Architectural tennis court' },
  { src: '/images/racket-impact.webp', alt: 'Ball meeting racket strings' }
]

/** Studio page: manifesto, origin story, working principles and capabilities. */
export function About() {
  const root = useRef(null)

  useGsapAnimation(root, () => {
    // The manifesto brightens word by word as it is read.
    gsap.fromTo(
      '.manifesto span',
      { color: DIM },
      {
        color: BRIGHT,
        stagger: 0.04,
        scrollTrigger: { trigger: '.manifesto', start: 'top 75%', end: 'bottom 45%', scrub: 1 }
      }
    )

    // Alternating drift gives the overlapping collage its sense of depth.
    gsap.utils.toArray('.about-collage img').forEach((image, index) => {
      gsap.to(image, {
        yPercent: index % 2 ? 18 : -14,
        ease: 'none',
        scrollTrigger: { trigger: '.about-intro', start: 'top top', end: 'bottom top', scrub: 1 }
      })
    })
  })

  return (
    <div ref={root} className="about-page noise-section">
      <section className="about-intro">
        <h1>ABOUT</h1>
        <div className="about-collage">
          {COLLAGE.map(image => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      </section>

      <h2 className="manifesto">
        {MANIFESTO.split(' ').map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </h2>

      <section className="about-story">
        <Eyebrow>OUR STORY</Eyebrow>
        <div className="about-story-grid">
          <div className="about-story-images">
            <img src="/images/clubhouse.webp" alt="Maison Élan clubhouse" />
            <img src="/images/court-tunnel.webp" alt="Walk onto court" />
          </div>
          <div>
            <p>
              Maison Élan began with a shared frustration: tennis imagery often captured the score,
              but missed the atmosphere.
            </p>
            <p>
              So we built a studio for the feeling around the game — the walk through the tunnel,
              the dust lifting from clay, the quiet before service, the objects and traditions that
              give tennis its identity.
            </p>
            <p>
              Today we work with athletes, tournaments and brands to create films and photography
              with strategic purpose and lasting visual value.
            </p>
            <ArrowLink href="/contact/">WORK WITH US</ArrowLink>
          </div>
        </div>
      </section>

      <section className="about-values">
        <Eyebrow>HOW WE WORK</Eyebrow>
        <div>
          {VALUES.map(value => (
            <article key={value.number}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-services">
        <Eyebrow>CAPABILITIES</Eyebrow>
        {services.map(service => (
          <div key={service.number}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.items.join(' · ')}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
