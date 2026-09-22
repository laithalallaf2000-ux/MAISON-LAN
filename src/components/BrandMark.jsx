import { SITE } from '../site'

/**
 * The studio wordmark: a racket-swing glyph beside the name.
 * `compact` is reserved for placements that need the tighter header treatment.
 */
export function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <path d="M7 31 20.5 5l3.8 15.3L35 11l-7 24-8.2-8.6L7 31Z" fill="currentColor" />
        <circle cx="24.2" cy="20.2" r="3.2" fill="#d7ff38" />
      </svg>
      <span>{SITE.name.toUpperCase()}</span>
    </span>
  )
}
