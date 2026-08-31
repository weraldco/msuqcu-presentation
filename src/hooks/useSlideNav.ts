import { useCallback, useEffect, useState } from 'react'

export function useSlideNav(slideCount: number) {
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.min(Math.max(i, 0), slideCount - 1))
    },
    [slideCount],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev])

  return { index, next, prev, goTo }
}
