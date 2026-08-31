import { useEffect, useState } from 'react'
import { chapterMarkers } from '../content'

export function PathRail() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = chapterMarkers.findIndex((m) => m.id === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const marker of chapterMarkers) {
      const el = document.getElementById(marker.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const fillPercent = (activeIndex / (chapterMarkers.length - 1)) * 100

  return (
    <nav
      aria-label="Chapters"
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative h-[56vh] w-px bg-white/10">
        <div
          className="absolute left-0 top-0 w-px bg-path transition-[height] duration-300 ease-out"
          style={{ height: `${fillPercent}%` }}
        />
        {chapterMarkers.map((marker, i) => (
          <button
            key={marker.id}
            type="button"
            aria-label={`Jump to ${marker.number}, ${marker.label}`}
            aria-current={activeIndex === i ? 'true' : undefined}
            onClick={() => {
              if (marker.id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return
              }
              document.getElementById(marker.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group absolute -left-[5px] flex -translate-y-1/2 items-center gap-3"
            style={{ top: `${(i / (chapterMarkers.length - 1)) * 100}%` }}
          >
            <span
              className={`block h-[11px] w-[11px] rounded-full border transition-colors ${
                activeIndex === i
                  ? 'border-path bg-path'
                  : 'border-white/30 bg-ground group-hover:border-white/60'
              }`}
            />
            <span
              className={`pointer-events-none whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.2em] transition-opacity ${
                activeIndex === i
                  ? 'opacity-100 text-path'
                  : 'text-white/50 opacity-0 group-hover:opacity-100'
              }`}
            >
              {marker.number} — {marker.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/10 lg:hidden">
      <div
        className="h-full bg-path"
        style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
      />
    </div>
  )
}
