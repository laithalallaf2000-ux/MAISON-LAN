import { useEffect, useRef } from 'react'
import { hasCoarsePointer, prefersReducedMotion } from '../lib/motion'

const SEGMENT_COUNT = 26
const HEAD_EASING = 0.32
const TAIL_EASING = 0.28
const OFFSCREEN = -30
const SVG_NS = 'http://www.w3.org/2000/svg'

/**
 * A ribbon of line segments that chases the pointer, each segment easing toward
 * the one in front of it.
 *
 * The `<line>` elements are created once and then mutated in place. Rebuilding
 * the SVG markup on every frame would make the browser reparse twenty-five
 * elements sixty times a second for an effect that only moves four numbers.
 * Hidden on touch devices and when reduced motion is requested.
 */
export function CursorTrail() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || hasCoarsePointer() || prefersReducedMotion()) return

    const points = Array.from({ length: SEGMENT_COUNT }, () => ({ x: OFFSCREEN, y: OFFSCREEN }))
    const segments = points.slice(1).map((_, index) => {
      const line = document.createElementNS(SVG_NS, 'line')
      line.setAttribute('opacity', String(1 - index / SEGMENT_COUNT))
      svg.append(line)
      return line
    })

    const pointer = { x: OFFSCREEN, y: OFFSCREEN }
    const onPointerMove = event => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    let frame = 0
    const tick = () => {
      const head = points[0]
      head.x += (pointer.x - head.x) * HEAD_EASING
      head.y += (pointer.y - head.y) * HEAD_EASING

      for (let index = 1; index < points.length; index += 1) {
        const point = points[index]
        const ahead = points[index - 1]
        point.x += (ahead.x - point.x) * TAIL_EASING
        point.y += (ahead.y - point.y) * TAIL_EASING

        const line = segments[index - 1]
        line.setAttribute('x1', ahead.x)
        line.setAttribute('y1', ahead.y)
        line.setAttribute('x2', point.x)
        line.setAttribute('y2', point.y)
      }

      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
      segments.forEach(line => line.remove())
    }
  }, [])

  return <svg ref={svgRef} className="cursor-trail" aria-hidden="true" />
}
