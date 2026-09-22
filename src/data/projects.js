/**
 * @typedef {object} Project
 * @property {string} slug     URL segment under `/work/`.
 * @property {string} title    Display name.
 * @property {string} client   Fictional partner the work was made for.
 * @property {string} year     Release year, as text — it is only ever displayed.
 * @property {string} type     Discipline, also used as the filter facet on `/work/`.
 * @property {string} image    Lead image, used on cards and as the detail hero.
 * @property {string} secondary Supporting image, used in the detail gallery.
 * @property {string} description One-line summary, reused as the page meta description.
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: 'after-the-bounce',
    title: 'After the Bounce',
    client: 'Élan Originals',
    year: '2026',
    type: 'Athlete Stories',
    image: '/images/court-tunnel.webp',
    secondary: '/images/recovery-portrait.webp',
    description: 'A quiet portrait of the seconds between pressure and possibility.'
  },
  {
    slug: 'night-service',
    title: 'Night Service',
    client: 'Luma Court',
    year: '2026',
    type: 'Brand Campaign',
    image: '/images/night-rally.webp',
    secondary: '/images/racket-impact.webp',
    description: 'Electric court light, precision and the ritual of the late session.'
  },
  {
    slug: 'red-season',
    title: 'Red Season',
    client: 'Terre No. 8',
    year: '2025',
    type: 'Event Coverage',
    image: '/images/clay-slide.webp',
    secondary: '/images/crowd-flare.webp',
    description: 'A clay-court story about friction, rhythm and earned grace.'
  },
  {
    slug: 'the-green-line',
    title: 'The Green Line',
    client: 'The Lawn Society',
    year: '2025',
    type: 'Editorial',
    image: '/images/grass-footwork.webp',
    secondary: '/images/clubhouse.webp',
    description: 'Tradition reframed through movement, tailoring and summer light.'
  },
  {
    slug: 'geometry-of-play',
    title: 'Geometry of Play',
    client: 'Court / Form',
    year: '2025',
    type: 'Strategy',
    image: '/images/court-shadows.webp',
    secondary: '/images/show-court.webp',
    description: 'An architectural study of lines, anticipation and empty space.'
  },
  {
    slug: 'objects-of-devotion',
    title: 'Objects of Devotion',
    client: 'Maison Élan',
    year: '2026',
    type: 'Still Life',
    image: '/images/racket-still.webp',
    secondary: '/images/racket-impact.webp',
    description: 'The tools of the game photographed with the reverence of design objects.'
  }
]

/** Every discipline present in the catalogue, prefixed with the "show all" facet. */
export const projectTypes = ['All', ...new Set(projects.map(project => project.type))]

/** @returns {Project | undefined} */
export function findProjectBySlug(slug) {
  return projects.find(project => project.slug === slug)
}

/** The next project in the catalogue, wrapping around at the end. */
export function getNextProject(project) {
  const index = projects.indexOf(project)
  return projects[(index + 1) % projects.length]
}
