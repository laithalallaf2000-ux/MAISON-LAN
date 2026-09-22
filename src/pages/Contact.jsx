import { useState } from 'react'
import { SITE } from '../site'

const PROJECT_TYPES = ['Brand campaign', 'Athlete story', 'Event coverage', 'Strategy']

// Deliberately loose: the goal is to catch typos before handing the address to
// a mail client, not to police which addresses are deliverable.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Builds the `mailto:` URL the enquiry is handed off to.
 *
 * The site is static — there is no endpoint to post to — so the form composes a
 * message and opens the visitor's own mail client with it.
 */
function buildMailtoUrl({ name, email, company, message }) {
  const subject = `Project enquiry from ${name}`
  const body = `${message}\n\nFrom: ${name}\nEmail: ${email}\nCompany: ${company || '—'}`
  const params = new URLSearchParams({ subject, body })
  return `mailto:${SITE.email}?${params}`
}

/** Contact page: enquiry form plus the studio's direct details. */
export function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const enquiry = {
      name: form.get('name').trim(),
      email: form.get('email').trim(),
      company: form.get('company').trim(),
      message: form.get('message').trim()
    }

    if (!enquiry.name || !enquiry.email || !enquiry.message) {
      setStatus('Please complete the required fields.')
      return
    }

    if (!EMAIL_PATTERN.test(enquiry.email)) {
      setStatus('Please enter a valid email address.')
      return
    }

    setStatus('Your email application is opening with the project details ready.')
    window.location.href = buildMailtoUrl(enquiry)
  }

  return (
    <div className="contact-page noise-section">
      <h1>CONTACT</h1>

      <div className="contact-layout">
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Name <em>*</em>
            <input name="name" placeholder="Your name" autoComplete="name" required />
          </label>
          <label>
            Email <em>*</em>
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </label>
          <label>
            Company
            <input name="company" placeholder="Your company" autoComplete="organization" />
          </label>
          <label>
            Project type
            <select name="type" defaultValue={PROJECT_TYPES[0]}>
              {PROJECT_TYPES.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="message-field">
            Message <em>*</em>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about the ambition, timing and where the work needs to live."
              required
            />
          </label>

          <button type="submit">
            SEND ENQUIRY <span aria-hidden="true">↗</span>
          </button>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>

        <aside>
          <div>
            <p>STUDIO</p>
            <span>{SITE.locations}</span>
          </div>
          <div>
            <p>EMAIL</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div>
            <p>PHONE</p>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
          <div>
            <p>NEW BUSINESS</p>
            <span>Campaigns · Editorial · Athletes · Events</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
