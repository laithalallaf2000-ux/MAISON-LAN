import { useEffect, useState } from 'react'
import { BrandMark } from './BrandMark'
import { SplitLink } from './SplitLink'
import { NAV_LINKS } from '../site'

const NAV_ID = 'primary-navigation'

/**
 * Fixed site header. Below the tablet breakpoint the navigation is a full-screen
 * overlay driven by `open`; above it the same markup lays out as an inline row,
 * so there is only one nav in the DOM to keep in sync.
 */
export function Header() {
  const [open, setOpen] = useState(false)

  // The overlay covers the page, so Escape has to be able to dismiss it.
  useEffect(() => {
    if (!open) return
    const onKeyDown = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="site-header">
      <a href="/" className="brand-link">
        <BrandMark compact />
      </a>

      <nav
        id={NAV_ID}
        className={`main-nav ${open ? 'is-open' : ''}`.trim()}
        aria-label="Primary navigation"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href}>
            <SplitLink>{label}</SplitLink>
          </a>
        ))}
        {/* The archive lives in the footer on desktop, so the overlay carries it on mobile. */}
        <a className="mobile-archive" href="/archive/">
          <SplitLink>Archive</SplitLink>
        </a>
      </nav>

      <a className="language" href="/" aria-label="English language">
        EN <span>/ FR</span>
      </a>

      <button
        type="button"
        className={`menu-toggle ${open ? 'is-open' : ''}`.trim()}
        onClick={() => setOpen(isOpen => !isOpen)}
        aria-expanded={open}
        aria-controls={NAV_ID}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <i />
        <i />
      </button>
    </header>
  )
}
