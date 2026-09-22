import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { NotFound, PageShell } from './components'
import { About, Archive, Contact, Home, Legal, Project, Work } from './pages'
import { findRoute, normalizePath } from './routes'

/**
 * Browser entry point.
 *
 * The site is prerendered to one HTML file per route, so navigation is a normal
 * full page load and there is no history handling to do here: read the
 * pathname once, render the matching page, done. That keeps the whole router
 * to a lookup table and one regular expression.
 */

/** Static routes, keyed by their canonical trailing-slash pathname. */
const PAGES = {
  '/': () => <Home />,
  '/work/': () => <Work />,
  '/about/': () => <About />,
  '/contact/': () => <Contact />,
  '/archive/': () => <Archive />,
  '/privacy/': () => <Legal type="privacy" />,
  '/terms/': () => <Legal type="terms" />
}

const PROJECT_PATH = /^\/work\/([^/]+)\/$/

function resolvePage(path) {
  const renderPage = PAGES[path]
  if (renderPage) return renderPage()

  const projectMatch = path.match(PROJECT_PATH)
  if (projectMatch) return <Project slug={projectMatch[1]} />

  return (
    <NotFound
      title={
        <>
          Point lost.
          <br />
          Match continues.
        </>
      }
      actionLabel="Return home"
      actionHref="/"
    />
  )
}

/**
 * Re-applies the route's title and description after hydration.
 *
 * The prerendered HTML already carries the right tags, so this only matters
 * when a route is served by a host that falls back to the root `index.html`.
 */
function applyRouteMeta(path) {
  const route = findRoute(path)
  if (!route) return

  document.title = route.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', route.description)
}

const path = normalizePath(window.location.pathname)
applyRouteMeta(path)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageShell>{resolvePage(path)}</PageShell>
  </StrictMode>
)
