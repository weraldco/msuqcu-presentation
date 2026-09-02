import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { registerStop } from '../lib/scrollStops'

export function StackPanel({
  children,
  zIndex,
  heightVh = 170,
}: {
  children: React.ReactNode
  zIndex: number
  heightVh?: number
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    return registerStop(() => wrapper.getBoundingClientRect().top + window.scrollY)
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper || !inner || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // upcoming content: scales up + fades in as it approaches the top of the viewport
      gsap.fromTo(
        inner,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 88%',
            end: 'top 35%',
            scrub: true,
          },
        },
      )
      // previous content: scales down + fades out as the next panel covers it
      gsap.fromTo(
        inner,
        { scale: 1, opacity: 1 },
        {
          scale: 0.9,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'bottom 98%',
            end: 'bottom 25%',
            scrub: true,
          },
        },
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="relative" style={{ minHeight: `${heightVh}dvh` }}>
      <div
        ref={innerRef}
        className="sticky top-0 flex h-dvh w-full items-center justify-center"
        style={{ zIndex }}
      >
        {children}
      </div>
    </div>
  )
}
