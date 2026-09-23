/**
 * Post-build step: turns the single Vite bundle into one static HTML file per
 * route, each with its own title, description, canonical URL, Open Graph tags
 * and JSON-LD — then writes `sitemap.xml` and `robots.txt`.
 *
 * Routes come from `src/routes.js`, the same table the browser router uses, so
 * a new page can never ship with a page but no metadata (or the reverse).
 *
 * Run indirectly through `npm run build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { notFoundRoute, routes } from '../src/routes.js'
import { SITE } from '../src/site.js'

const DIST = resolve(process.cwd(), 'dist')
const ORIGIN = (process.env.SITE_URL || SITE.defaultOrigin).replace(/\/$/, '')

/** Fallback social preview image for routes without a project image of their own. */
const SOCIAL_IMAGE = '/images/hero-serve.webp'

const HTML_ESCAPES = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' }
const escapeHtml = value => value.replace(/[&"<>]/g, character => HTML_ESCAPES[character])

/**
 * Schema.org description of a route: the studio itself on the home page,
 * a creative work on project pages, a plain page everywhere else.
 */
function buildStructuredData({ route, canonical }) {
  const base = { '@context': 'https://schema.org', url: canonical, description: route.description }

  if (route.project) {
    return {
      ...base,
      '@type': 'CreativeWork',
      name: route.project.title,
      creator: { '@type': 'Organization', name: SITE.name }
    }
  }

  if (route.path === '/') {
    return {
      ...base,
      '@type': 'Organization',
      name: route.title,
      email: SITE.email,
      areaServed: 'Worldwide',
      knowsAbout: [
        'Tennis film production',
        'Sports photography',
        'Brand campaigns',
        'Athlete storytelling'
      ]
    }
  }

  return { ...base, '@type': 'WebPage', name: route.title }
}

/** Social preview tags and JSON-LD, indented to match the template's `<head>`. */
function buildHead({ route, canonical }) {
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const image = `${ORIGIN}${route.project?.image ?? SOCIAL_IMAGE}`
  const structuredData = JSON.stringify(buildStructuredData({ route, canonical }))

  return [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${structuredData}</script>`
  ]
    .map(tag => `    ${tag}`)
    .join('\n')
}

/**
 * Swaps a single tag in the template, and fails the build if it is not there.
 *
 * The tags being replaced live in a hand-edited `index.html`, so a stray
 * reformat or rename would otherwise leave every route quietly sharing the
 * home page's metadata.
 */
function replaceOnce({ html, pattern, replacement, label }) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: no ${label} tag found in index.html — update the pattern.`)
  }
  return html.replace(pattern, replacement)
}

function renderRoute({ template, route }) {
  const canonical = `${ORIGIN}${route.path}`
  const robots = route.indexable === false ? 'noindex, follow' : 'index, follow'

  const replacements = [
    {
      label: 'title',
      pattern: /<title>[\s\S]*?<\/title>/,
      replacement: `<title>${escapeHtml(route.title)}</title>`
    },
    {
      label: 'description',
      pattern: /<meta\s+name="description"[\s\S]*?\/>/,
      replacement: `<meta name="description" content="${escapeHtml(route.description)}" />`
    },
    {
      label: 'robots',
      pattern: /<meta\s+name="robots"[\s\S]*?\/>/,
      replacement: `<meta name="robots" content="${robots}" />`
    },
    {
      label: 'canonical',
      pattern: /<link\s+rel="canonical"[\s\S]*?\/>/,
      replacement: `<link rel="canonical" href="${canonical}" />`
    },
    {
      label: 'closing head',
      // Matches the whitespace before `</head>` so the injected tags line up
      // with the tags already in the template.
      pattern: /[ \t]*<\/head>/,
      replacement: `${buildHead({ route, canonical })}\n  </head>`
    }
  ]

  return replacements.reduce(
    (html, { label, pattern, replacement }) => replaceOnce({ html, pattern, replacement, label }),
    template
  )
}

function buildSitemap(indexableRoutes) {
  const entries = indexableRoutes.map(route => {
    const changefreq = route.path === '/' ? 'weekly' : 'monthly'
    const priority = route.path === '/' ? '1.0' : route.path === '/work/' ? '0.9' : '0.7'
    return `  <url><loc>${ORIGIN}${route.path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    ''
  ].join('\n')
}

const template = await readFile(resolve(DIST, 'index.html'), 'utf8')

for (const route of routes) {
  const directory = route.path === '/' ? DIST : resolve(DIST, route.path.slice(1))
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), renderRoute({ template, route }))
}

// Served by the host for any unknown URL, so a mistyped link lands on the
// site's own 404 rather than the host's default error page.
await writeFile(resolve(DIST, '404.html'), renderRoute({ template, route: notFoundRoute }))

await writeFile(
  resolve(DIST, 'sitemap.xml'),
  buildSitemap(routes.filter(r => r.indexable !== false))
)
await writeFile(
  resolve(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`
)

if (!process.env.SITE_URL) {
  console.warn(
    `\n  ! SITE_URL is not set, so canonical and sitemap URLs point at ${SITE.defaultOrigin}.\n` +
      `    Pointing them at a domain you do not control tells search engines to\n` +
      `    credit that domain instead of yours. Build with:\n\n` +
      `      SITE_URL=https://your-domain.com npm run build\n`
  )
}

console.log(`Prerendered ${routes.length} static routes with SEO metadata.`)
