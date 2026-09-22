/**
 * Shared empty state for unknown routes and unknown project slugs.
 * Both callers keep the same layout and only change the wording.
 */
export function NotFound({ title, actionLabel, actionHref }) {
  return (
    <section className="not-found">
      <p>404</p>
      <h1>{title}</h1>
      <a href={actionHref}>{actionLabel} ↗</a>
    </section>
  )
}
