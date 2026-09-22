import { useMemo, useState } from 'react'
import { ArrowLink } from '../components'
import { projects, projectTypes } from '../data'

const ALL = 'All'

/**
 * Reads the discipline pre-selected by a "related work" link, e.g.
 * `/work/?service=Brand%20Campaign`. Unknown values fall back to showing
 * everything rather than an empty grid.
 */
function getInitialFilter() {
  const requested = new URLSearchParams(window.location.search).get('service')
  return requested && projectTypes.includes(requested) ? requested : ALL
}

/** Project index, filterable by discipline and switchable between grid and list. */
export function Work() {
  // Lazy initial state: the URL is read once on mount, not on every render.
  const [filter, setFilter] = useState(getInitialFilter)
  const [view, setView] = useState('grid')

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter(project => project.type === filter)),
    [filter]
  )

  return (
    <div className="work-page noise-section">
      <section className="work-hero">
        <h1>WORK</h1>
        <ArrowLink href="/archive/">ARCHIVE</ArrowLink>
        <p>
          A selection of films, photographs and visual worlds made for the people shaping tennis.
        </p>

        <div className="work-controls">
          <div className="filters" role="group" aria-label="Filter work">
            {projectTypes.map(type => (
              <button
                key={type}
                type="button"
                className={filter === type ? 'active' : ''}
                onClick={() => setFilter(type)}
                aria-pressed={filter === type}
              >
                {type}
                <span aria-hidden="true">{filter === type ? '−' : '+'}</span>
              </button>
            ))}
          </div>

          <div className="view-switch" role="group" aria-label="Choose project view">
            <span>VIEW</span>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
            >
              ⊞
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === 'list'}
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              ≡
            </button>
          </div>
        </div>
      </section>

      <div className={`work-gallery work-gallery--${view}`}>
        {visible.map((project, index) => (
          <a key={project.slug} href={`/work/${project.slug}/`} className="work-item">
            <div className="work-item-image">
              <img src={project.image} alt={project.title} />
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="work-item-copy">
              <div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
              <span>
                {project.client} · {project.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
