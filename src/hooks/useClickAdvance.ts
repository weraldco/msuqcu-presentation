import { useEffect } from 'react'
import { nextStop } from '../lib/scrollStops'

const IGNORED_TARGETS = 'button, a, input, textarea, select, [role="button"]'

/** Clicking anywhere on the page advances to the next panel or gallery photo. */
export function useClickAdvance() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest(IGNORED_TARGETS)) return
      if (window.getSelection()?.toString()) return

      const y = nextStop(window.scrollY)
      if (y !== undefined) window.scrollTo({ top: y, behavior: 'smooth' })
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
}
