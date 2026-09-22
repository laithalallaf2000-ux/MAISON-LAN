import { ArrowLink, Eyebrow } from '../../components'
import { services } from '../../data'

/**
 * The four offerings as cards that stack on scroll.
 * `--stack-index` drives each card's sticky offset in the stylesheet.
 */
export function ServiceStack() {
  return (
    <section className="services-section noise-section">
      <Eyebrow>WHAT WE DO</Eyebrow>
      <div className="service-stack">
        {services.map((service, index) => (
          <article key={service.number} className="service-card" style={{ '--stack-index': index }}>
            <div className="service-visual">
              <img src={service.image} alt={service.title} loading="lazy" />
              <span>{service.number}.</span>
              <h3>{service.title}</h3>
            </div>

            <div className="service-copy">
              <h2>{service.statement}</h2>
              <p>{service.body}</p>
              <ArrowLink href={`/work/?service=${encodeURIComponent(service.relatedType)}`}>
                RELATED WORK
              </ArrowLink>
            </div>

            <div className="service-list">
              <p>SERVICES</p>
              {service.items.map(item => (
                <span key={item}>{item}</span>
              ))}
              <ArrowLink href="/contact/">START A PROJECT</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
