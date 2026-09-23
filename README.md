# Maison Élan — Tennis Stories

A static, prerendered React site for a fictional tennis film and photography studio.
No backend, no database, no server runtime — it builds to plain HTML, CSS and JavaScript
that can be dropped on any static host.

The studio, its projects and its partners are invented. The site exists to explore
scroll-driven motion design and to keep a build-time SEO pipeline honest.

---

## Highlights

- **Prerendered multi-page output.** The build emits one real HTML file per route, each with
  its own title, description, canonical URL, Open Graph tags and JSON-LD — plus `sitemap.xml`
  and `robots.txt`. Crawlers and social previews get correct metadata without a server.
- **One routing table.** [`src/routes.js`](src/routes.js) is the single source of truth. The browser
  entry and the prerender script both read it, so a page can never ship with missing metadata.
- **Motion that respects the visitor.** Every GSAP timeline, the Lenis smooth scroll and the
  cursor trail are skipped under `prefers-reduced-motion`, and the content reads correctly
  without them.
- **No framework for routing or state.** Navigation is a normal page load, so the whole router
  is a lookup table and one regular expression.

## Stack

| Concern   | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Build     | [Vite](https://vite.dev)                                 |
| UI        | [React](https://react.dev) (no router, no state library) |
| Motion    | [GSAP](https://gsap.com) + ScrollTrigger                 |
| Scrolling | [Lenis](https://lenis.darkroom.engineering)              |
| Styling   | Hand-written CSS with custom properties                  |
| Quality   | ESLint (flat config) + Prettier                          |

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints.

### Scripts

| Command                | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                          |
| `npm run build`        | Production bundle, then prerenders every route into `dist/` |
| `npm run preview`      | Serves the built `dist/` locally                            |
| `npm run lint`         | ESLint over the project                                     |
| `npm run format`       | Prettier, writing in place                                  |
| `npm run format:check` | Prettier in check mode, for CI                              |

## Deploying

```bash
npm run build
```

Upload the **contents of `dist/`** to any static host. Every route is a real directory with an
`index.html`, so no SPA rewrite rule is needed.

Set the public URL at build time so canonical, Open Graph and sitemap URLs match the final domain:

```bash
SITE_URL=https://your-domain.com npm run build
```

This matters more than it looks. Without it the canonical tags point at the placeholder
domain, which tells search engines to credit **that** domain rather than yours — so the
build prints a warning when `SITE_URL` is missing.

The build also writes `dist/404.html`. Most static hosts serve it for unknown URLs, which
keeps mistyped links on the site's own 404 page instead of the host's branded error page.

## Project structure

```
src/
  main.jsx            Entry point: reads the pathname, renders one page
  routes.js           Route table — shared with the prerender script
  site.js             Studio identity, navigation and footer links
  data/               Projects, services and testimonials
  lib/                GSAP plugin registration and media-query helpers
  hooks/              useGsapAnimation, useScrollReveal
  components/         Site chrome and shared primitives
  sections/home/      The home page, one section per file
  pages/              One component per route
  styles.css          The whole stylesheet
scripts/
  prerender.mjs       Post-build step: per-route HTML, sitemap, robots.txt
```

### How a page gets built

1. `vite build` produces `dist/index.html` plus the hashed JS and CSS bundles.
2. `scripts/prerender.mjs` reads that file as a template and, for every entry in `routes`,
   swaps in the route's metadata and writes it to its own directory.
3. Each replacement is checked — if a tag the script expects is missing from `index.html`,
   the build fails instead of quietly shipping the home page's metadata on every route.

## Notes

- Content, names and imagery are fictional. Replace the studio details in
  [`src/site.js`](src/site.js) before using any of this commercially.
- The contact form has nowhere to post to, so it composes a `mailto:` link and hands the
  enquiry to the visitor's own mail client.

## License

[MIT](LICENSE)
