/**
 * Label for the sliding hover effect: the first copy slides out as the second
 * slides in. The duplicate is hidden from assistive technology so the label is
 * only announced once.
 */
export function SplitLink({ children }) {
  return (
    <span className="split-link">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}
