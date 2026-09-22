import { ArrowLink, Eyebrow, NotFound } from '../components'
import { findProjectBySlug, getNextProject } from '../data'

/**
 * Supporting frames every detail page shares, after the project's own two images.
 * A project may already use one of these, so the gallery can contain duplicates
 * and has to be keyed by position rather than by image path.
 */
const SHARED_FRAMES = [
  '/images/racket-impact.webp',
  '/images/show-court.webp',
  '/images/court-shadows.webp',
  '/images/racket-still.webp'
]

/**
 * Project detail page.
 *
 * `slug` comes from the pathname, so it can point at a project that no longer
 * exists — an old link, or a hand-typed URL.
 */
export function Project({ slug }) {
  const project = findProjectBySlug(slug)

  if (!project) {
    return (
      <NotFound title="Project outside the lines." actionLabel="Back to work" actionHref="/work/" />
    )
  }

  const gallery = [project.image, project.secondary, ...SHARED_FRAMES]
  const next = getNextProject(project)

  return (
    <article className="project-page noise-section">
      <header className="project-head">
        <p className="project-client">{project.client}</p>
        <div className="project-rule">
          <span>{project.type} · Film · Photography</span>
          <strong>MAISON ÉLAN</strong>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <div className="project-lead">
          <p>
            {project.description} Built around a visual language of precision, physical detail and
            the small rituals that make the sport human.
          </p>
          <span>
            Creative direction
            <br />
            Film production
            <br />
            Photography
            <br />
            Post-production
          </span>
        </div>
      </header>

      <div className="project-hero-image">
        <img src={project.image} alt={project.title} />
        <button type="button" aria-label="Play project film">
          <span aria-hidden="true">▶</span>PLAY FILM
        </button>
      </div>

      <section className="project-statement">
        <Eyebrow>THE INTENTION</Eyebrow>
        <p>
          We approached the court as both stage and character — holding tension in the empty space,
          then releasing it through movement.
        </p>
      </section>

      <div className="project-gallery">
        {gallery.map((image, index) => (
          <figure key={index} className={`gallery-frame gallery-frame--${index + 1}`}>
            <img src={image} alt={`${project.title} campaign frame ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>

      <nav className="project-next" aria-label="Next project">
        <span>NEXT STORY</span>
        <a href={`/work/${next.slug}/`}>
          {next.title}
          <i aria-hidden="true">↗</i>
        </a>
      </nav>

      <ArrowLink href="/work/">ALL WORK</ArrowLink>
    </article>
  )
}
