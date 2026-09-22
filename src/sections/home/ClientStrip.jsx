import { Eyebrow } from '../../components'

const CLIENTS = [
  'AUREL COURT',
  'NORTHSTAR',
  'TERRE No.8',
  'LUMA',
  'THE LAWN SOCIETY',
  'ARC / RACQUET',
  'MATCHPOINT',
  'COURT FORM'
]

/**
 * Scrolling partner logotypes. The list is rendered twice so the CSS marquee
 * can loop seamlessly: the second copy is already on screen when the first
 * finishes travelling.
 */
export function ClientStrip() {
  return (
    <section className="client-strip noise-section">
      <Eyebrow>SELECTED PARTNERS</Eyebrow>
      <div className="marquee" aria-label="Selected partners">
        <div>
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <span key={`${client}-${index}`}>{client}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
