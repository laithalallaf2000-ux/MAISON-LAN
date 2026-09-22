import { SplitLink } from './SplitLink'

/** Call-to-action link: a sliding label followed by a decorative arrow. */
export function ArrowLink({ href, children, className = '' }) {
  return (
    <a href={href} className={`arrow-link ${className}`.trim()}>
      <SplitLink>{children}</SplitLink>
      <span aria-hidden="true">↗</span>
    </a>
  )
}
