import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import { recedeStyle } from '../../lib/recede'

export function PhotoGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const stack = stackRef.current
    if (!container || !stack) return

    const figures = gsap.utils.toArray<HTMLElement>('[data-stack-figure]', stack)
    if (figures.length === 0) return

    if (prefersReducedMotion()) {
      gsap.set(figures[figures.length - 1], { xPercent: -50, yPercent: -50, opacity: 1 })
      figures.slice(0, -1).forEach((fig) => gsap.set(fig, { opacity: 0 }))
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(figures[0], { xPercent: -50, yPercent: -50, opacity: 1, scale: 1 })
      figures.slice(1).forEach((fig) => {
        gsap.set(fig, { xPercent: -50, yPercent: 50, opacity: 0, scale: 1 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${window.innerHeight * (figures.length + 1) * 0.9}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      figures.forEach((fig, i) => {
        if (i === 0) return
        tl.to(fig, { yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out', duration: 1 }, i - 1)
        for (let behind = 0; behind < i; behind++) {
          const depth = i - behind
          const { scale, opacity, liftPercent } = recedeStyle(depth)
          tl.to(
            figures[behind],
            { yPercent: liftPercent, opacity, scale, ease: 'power2.out', duration: 1 },
            i - 1,
          )
        }
      })

      tl.to(
        stack,
        { xPercent: 45, scale: 0.8, opacity: 0, ease: 'power2.in', duration: 1 },
        figures.length - 1 + 0.25,
      )
    }, containerRef)

    return () => ctx.revert()
  }, [images])

  return (
    <section ref={containerRef} className="relative h-dvh w-full overflow-hidden">
      <div ref={stackRef} className="relative h-full w-full">
        {images.map((src, i) => (
          <figure
            data-stack-figure
            key={src}
            className="absolute left-1/2 top-1/2 aspect-4/5 h-[60vh] max-h-[560px] w-auto overflow-hidden rounded-sm shadow-2xl shadow-black/60"
            style={{ zIndex: i + 1 }}
          >
            <img
              src={src}
              alt={`Photo ${i + 1} from this chapter`}
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
