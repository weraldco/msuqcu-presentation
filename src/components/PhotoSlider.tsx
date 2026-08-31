import { useState } from 'react'

export function PhotoSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  function clamp(i: number) {
    return Math.min(Math.max(i, 0), images.length - 1)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <img
        src={images[index]}
        alt={`Slide photo ${index + 1} of ${images.length}`}
        className="max-h-[70vh] max-w-[90vw] rounded-2xl object-cover shadow-2xl"
      />

      <button
        aria-label="Previous photo"
        onClick={() => setIndex((i) => clamp(i - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
      >
        ‹
      </button>
      <button
        aria-label="Next photo"
        onClick={() => setIndex((i) => clamp(i + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
