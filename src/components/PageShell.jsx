import { CursorTrail } from './CursorTrail'
import { Footer } from './Footer'
import { Header } from './Header'
import { Loader } from './Loader'
import { SmoothScroll } from './SmoothScroll'

/**
 * Wraps every page in the persistent chrome: intro curtain, pointer trail,
 * smooth scrolling, header and footer. The `#main-content` id is the target of
 * the skip link in `index.html`.
 */
export function PageShell({ children }) {
  return (
    <>
      <Loader />
      <CursorTrail />
      <SmoothScroll />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
