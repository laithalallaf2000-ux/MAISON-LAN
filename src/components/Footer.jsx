import { FOOTER_COLUMNS, SITE } from '../site'

const [firstWord, secondWord] = SITE.name.toUpperCase().split(' ')

/** Site footer: studio details, link columns and the oversized wordmark. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="eyebrow">STUDIO</p>
          <p>
            {SITE.locations}
            <br />
            {SITE.email}
            <br />
            {SITE.phone}
          </p>
        </div>

        {FOOTER_COLUMNS.map(column => (
          <div key={column.label}>
            <p className="eyebrow">{column.label}</p>
            {column.links.map(link => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-word" aria-hidden="true">
        <span>{firstWord}</span>
        <span>{secondWord}</span>
      </div>

      <div className="footer-bottom">
        <span>
          © {SITE.copyrightYear} {SITE.name}
        </span>
        <span>{SITE.tagline}</span>
      </div>
    </footer>
  )
}
