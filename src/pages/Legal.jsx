import { SITE } from '../site'

/**
 * Privacy and terms pages.
 *
 * Both routes describe the same thing — a static demonstration site that stores
 * nothing — so they share one component and differ only in their heading.
 *
 * @param {{ type: 'privacy' | 'terms' }} props
 */
export function Legal({ type }) {
  const isPrivacy = type === 'privacy'

  return (
    <article className="legal-page noise-section">
      <p className="eyebrow">LEGAL</p>
      <h1>{isPrivacy ? 'PRIVACY' : 'TERMS'}</h1>

      <div>
        <h2>{isPrivacy ? 'Your privacy, clearly stated.' : 'Terms of use.'}</h2>
        <p>
          This demonstration website does not store form submissions, create accounts, or run a
          server-side database. The contact form prepares an email in the visitor’s own email
          application.
        </p>

        <h3>Website data</h3>
        <p>
          Basic hosting providers may process standard technical request data such as IP addresses
          and browser information for security and delivery. {SITE.name} does not sell personal
          information.
        </p>

        <h3>Creative work</h3>
        <p>
          All names, projects and campaign descriptions on this demonstration are fictional. Website
          imagery is original project artwork created for {SITE.name}.
        </p>

        <h3>Contact</h3>
        <p>For questions, contact {SITE.email}.</p>
      </div>
    </article>
  )
}
