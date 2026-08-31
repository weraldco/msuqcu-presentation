export function SlideNav({
  count,
  index,
  onGoTo,
}: {
  count: number
  index: number
  onGoTo: (i: number) => void
}) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 flex justify-center gap-2"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onGoTo(i)}
          className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition ${
            i === index ? 'bg-white' : 'bg-white/30'
          }`}
        />
      ))}
    </div>
  )
}
