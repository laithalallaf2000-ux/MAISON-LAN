import { ArrowLink, Eyebrow } from '../../components'

/** Studio point of view, linking through to the about page. */
export function Story() {
  return (
    <section className="story-section noise-section">
      <Eyebrow>OUR POINT OF VIEW</Eyebrow>
      <div className="story-image" data-reveal>
        <img src="/images/court-shadows.webp" alt="Geometric tennis court shadows" loading="lazy" />
      </div>
      <p className="story-copy" data-reveal>
        Tennis lives between opposites: control and instinct, tradition and reinvention, silence and
        impact. Maison Élan was created to photograph that tension — and turn it into stories people
        remember.
      </p>
      <ArrowLink href="/about/">ABOUT THE STUDIO</ArrowLink>
    </section>
  )
}
