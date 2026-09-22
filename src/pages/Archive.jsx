import { projects } from '../data'

const STUDY_YEAR = '2024'

/**
 * Archive rows: every project, followed by an earlier "study" of each one.
 *
 * The studies have no page of their own — they are catalogue entries that point
 * back at the work index, which is why they share the `/work/` destination.
 */
const archiveEntries = [
  ...projects.map(project => ({
    id: project.slug,
    year: project.year,
    title: project.title,
    client: project.client,
    type: project.type,
    href: `/work/${project.slug}/`
  })),
  ...projects.map(project => ({
    id: `${project.slug}-study`,
    year: STUDY_YEAR,
    title: `${project.title} — Study`,
    client: project.client,
    type: project.type,
    href: '/work/'
  }))
]

/** Full chronological index of the studio's output. */
export function Archive() {
  return (
    <div className="archive-page noise-section">
      <header>
        <h1>ARCHIVE</h1>
        <p>Every season leaves a trace.</p>
      </header>

      <div className="archive-list">
        <div className="archive-head">
          <span>YEAR</span>
          <span>PROJECT</span>
          <span>PARTNER</span>
          <span>TYPE</span>
          <span />
        </div>

        {archiveEntries.map(entry => (
          <a key={entry.id} href={entry.href}>
            <span>{entry.year}</span>
            <strong>{entry.title}</strong>
            <span>{entry.client}</span>
            <span>{entry.type}</span>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </div>
  )
}
