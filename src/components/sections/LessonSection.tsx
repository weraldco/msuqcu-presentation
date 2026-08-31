export function LessonSection({
  number,
  title,
  quote,
  body,
}: {
  number: number
  title: string
  quote?: string
  body: string
}) {
  return (
    <div className="flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
      <h3 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold tracking-tight">
        <span className="text-path">{String(number).padStart(2, '0')}. </span>
        {title}
      </h3>
      {quote && <p className="text-[clamp(1.1rem,2.6vw,1.5rem)] text-white/70">{quote}</p>}
      <p className="text-[clamp(1rem,2.2vw,1.2rem)] font-semibold text-white/85">{body}</p>
    </div>
  )
}
