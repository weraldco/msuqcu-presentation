import { useLayoutEffect, useRef } from 'react'

/**
 * Shrinks an element's font-size just enough to keep its (nowrap) content on one line
 * within its parent's width. Never enlarges beyond the CSS-defined size.
 */
export function useFitText<T extends HTMLElement>(deps: unknown[], minScale = 0.32) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    function fit() {
      if (!el || !parent) return
      el.style.fontSize = ''
      const parentWidth = parent.clientWidth
      const naturalWidth = el.scrollWidth
      if (parentWidth === 0 || naturalWidth <= parentWidth) return

      const currentSize = parseFloat(window.getComputedStyle(el).fontSize)
      const scale = Math.max(parentWidth / naturalWidth, minScale)
      el.style.fontSize = `${currentSize * scale}px`
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(parent)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
