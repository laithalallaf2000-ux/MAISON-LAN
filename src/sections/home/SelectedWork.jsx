import { ArrowLink, Eyebrow } from '../../components'
import { projects } from '../../data'

const FEATURED_COUNT = 4

/** Staggered collage of the four most recent projects. */
export function SelectedWork() {
  return (
    <section className="selected-work noise-section">
      <div className="section-intro" data-reveal>
        <Eyebrow>SELECTED WORK</Eyebrow>
        <p>Where preparation meets light. Stories built point by point, frame by frame.</p>
        <ArrowLink href="/work/">SEE ALL WORK</ArrowLink>
      </div>

      <div className="project-collage">
        {projects.slice(0, FEATURED_COUNT).map((project, index) => (
          <a
            key={project.slug}
            className={`project-tile project-tile--${index + 1}`}
            href={`/work/${project.slug}/`}
            data-reveal
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
            <div className="project-meta">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>{project.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
