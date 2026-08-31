import { StaggerReveal } from '../StaggerReveal'

export function QuoteSection({
  lines,
  keyMessage,
}: {
  lines: string[]
  keyMessage?: string
}) {
  return (
    <div className="flex flex-col items-center gap-8 px-6 text-center">
      <StaggerReveal className="flex max-w-3xl flex-col gap-3">
        {lines.map((line) => (
          <p
            key={line}
            className="font-display text-[clamp(1.5rem,4.2vw,2.75rem)] font-medium leading-snug text-white/90"
          >
            {line}
          </p>
        ))}
      </StaggerReveal>
      {keyMessage && (
        <p className="max-w-2xl text-[clamp(1.15rem,2.8vw,1.6rem)] font-semibold text-path">
          “{keyMessage}”
        </p>
      )}
    </div>
  )
}
