import { useRef } from 'react'
import { useScrollReveal } from '../hooks'
import {
  ClientStrip,
  ContactCta,
  Figures,
  Hero,
  SelectedWork,
  ServiceStack,
  Story,
  Testimonials
} from '../sections/home'

/**
 * Home page: a composition of independent sections.
 *
 * Each section owns whatever behaviour it needs; the page only wires up the
 * shared scroll reveal, which is scoped to `root` so it never reaches markup
 * rendered by the surrounding page shell.
 */
export function Home() {
  const root = useRef(null)
  useScrollReveal(root)

  return (
    <div ref={root}>
      <Hero />
      <ClientStrip />
      <SelectedWork />
      <Figures />
      <ServiceStack />
      <Story />
      <Testimonials />
      <ContactCta />
    </div>
  )
}
