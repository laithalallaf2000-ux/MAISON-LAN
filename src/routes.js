import { projects } from './data/projects.js'
import { SITE } from './site.js'

/**
 * Every route the site can serve, with the metadata that describes it.
 *
 * This table is the single source of truth for routing: the browser entry
 * (`main.jsx`) uses it to set the document title and description, and the
 * build step (`scripts/prerender.mjs`) uses it to emit one static HTML file,
 * canonical URL and sitemap entry per route. Adding a page means adding a
 * row here and a component in `PAGES`.
 *
 * @typedef {object} Route
 * @property {string} path Canonical pathname, with a trailing slash except for `/`.
 * @property {string} title Document title.
 * @property {string} description Meta description, also used for Open Graph.
 * @property {boolean} [indexable] False keeps the route out of `sitemap.xml`.
 */

/** @type {Route[]} */
const staticRoutes = [
  {
    path: '/',
    title: `${SITE.name} — Tennis, Told Beautifully`,
    description: `${SITE.name} is a tennis film and photography studio creating cinematic campaigns, athlete stories and cultural moments.`
  },
  {
    path: '/work/',
    title: `Selected Work — ${SITE.name}`,
    description: `Explore ${SITE.name} tennis films, athlete portraits, campaigns, event coverage and editorial photography.`
  },
  {
    path: '/archive/',
    title: `Archive — ${SITE.name}`,
    description: `Browse the ${SITE.name} archive of tennis films, photography, campaigns and visual studies.`
  },
  {
    path: '/about/',
    title: `About ${SITE.name} — Tennis Film Studio`,
    description: `Meet ${SITE.name}, an independent tennis film and photography studio working across Paris, London and worldwide.`
  },
  {
    path: '/contact/',
    title: `Contact ${SITE.name} — Start a Project`,
    description: `Contact ${SITE.name} about tennis campaigns, athlete stories, event production, photography and creative strategy.`
  },
  {
    path: '/privacy/',
    title: `Privacy — ${SITE.name}`,
    description: `Privacy information for the ${SITE.name} website.`,
    indexable: false
  },
  {
    path: '/terms/',
    title: `Terms — ${SITE.name}`,
    description: `Terms of use for the ${SITE.name} website.`,
    indexable: false
  }
]

/** One detail route per project, derived so the catalogue never drifts from the sitemap. */
const projectRoutes = projects.map(project => ({
  path: `/work/${project.slug}/`,
  title: `${project.title} — ${SITE.name}`,
  description: project.description,
  project
}))

/** @type {Route[]} */
export const routes = [...staticRoutes, ...projectRoutes]

const routesByPath = new Map(routes.map(route => [route.path, route]))

/**
 * Normalises a browser pathname to the canonical form used in `routes`:
 * exactly one trailing slash, so `/work`, `/work/` and `/work//` all match.
 */
export function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : `${trimmed}/`
}

/** @returns {Route | undefined} */
export function findRoute(pathname) {
  return routesByPath.get(normalizePath(pathname))
}

/**
 * Metadata for the not-found page.
 *
 * This is not a route — nothing links to it and it has no path of its own.
 * The build writes it to `dist/404.html`, which static hosts serve for any
 * unknown URL. Without it the host shows its own branded error page instead
 * of the site's.
 */
export const notFoundRoute = {
  path: '/404.html',
  title: `Page not found — ${SITE.name}`,
  description: `The page you are looking for is not part of the ${SITE.name} website.`,
  indexable: false
}
