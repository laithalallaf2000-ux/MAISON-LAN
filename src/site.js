/**
 * Single source of truth for studio identity and contact details.
 * Every page, the footer and the build-time SEO metadata read from here,
 * so the fictional studio can be renamed in one place.
 */
export const SITE = {
  name: 'Maison Élan',
  tagline: 'Tennis, told beautifully.',
  locations: 'Paris · London · Worldwide',
  email: 'hello@maisonelan.studio',
  phone: '+33 1 84 80 19 26',
  phoneHref: 'tel:+33184801926',
  copyrightYear: 2026,
  /** Overridden at build time with the SITE_URL environment variable. */
  defaultOrigin: 'https://maisonelan.studio'
}

/** Primary navigation, rendered in the header on every page. */
export const NAV_LINKS = [
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' }
]

/** Footer columns. Kept as data so the markup stays a single map. */
export const FOOTER_COLUMNS = [
  {
    label: 'PAGES',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Work', href: '/work/' },
      { label: 'Archive', href: '/archive/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' }
    ]
  },
  {
    label: 'SOCIAL',
    links: [
      { label: 'Instagram', href: '#instagram' },
      { label: 'Vimeo', href: '#vimeo' },
      { label: 'LinkedIn', href: '#linkedin' }
    ]
  },
  {
    label: 'LEGAL',
    links: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' }
    ]
  }
]
