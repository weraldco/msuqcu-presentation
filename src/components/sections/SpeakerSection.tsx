import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

export function SpeakerSection({
  photo,
  name,
  role,
  bio,
}: {
  photo: string
  name: string
  role: string
  bio: string[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const photoEl = photoRef.current
    const bioEl = bioRef.current
    if (!container || !photoEl || !bioEl || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoEl,
        { x: -160, scale: 0.5, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top bottom', end: 'top 40%', scrub: 0.6 },
        },
      )
      gsap.fromTo(
        bioEl,
        { x: 160, scale: 0.5, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:gap-16"
    >
      <div ref={photoRef} className="shrink-0 overflow-hidden rounded-lg shadow-2xl shadow-black/60">
        <img
          src={photo}
          alt={name}
          className="h-70 w-auto object-cover sm:h-90 lg:h-110"
        />
      </div>
      <div ref={bioRef} className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
        <div>
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold">{name}</h2>
          <p className="mt-1 text-[clamp(0.95rem,2vw,1.15rem)] text-path">{role}</p>
        </div>
        <ul className="flex flex-col gap-2">
          {bio.map((line) => (
            <li key={line} className="text-[clamp(0.9rem,1.8vw,1.05rem)] text-white/70">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
