import { slideContent } from '../../content'

export function QuoteSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-neutral-950 px-6 text-center">
      {slideContent.quote.lines.map((line) => (
        <p
          key={line.text}
          className={`max-w-3xl font-script text-[clamp(1.75rem,6vw,4rem)] text-white ${
            line.bold ? 'font-bold' : 'font-medium text-white/80'
          }`}
        >
          {line.text}
        </p>
      ))}
    </div>
  )
}
