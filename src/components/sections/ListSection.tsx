import { StaggerReveal } from '../StaggerReveal'

export function ListSection({
  heading,
  items,
  quote,
}: {
  heading: string
  items: string[]
  quote?: string
}) {
  return (
    <div className="flex flex-col items-center gap-10 px-6 text-center">
      <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold tracking-tight">
        {heading}
      </h2>
      <StaggerReveal className="flex max-w-2xl flex-col gap-4 text-left">
        {items.map((item) => (
          <p key={item} className="text-[clamp(1rem,2.3vw,1.25rem)] text-white/75">
            {item}
          </p>
        ))}
      </StaggerReveal>
      {quote && (
        <p className="font-display max-w-xl text-[clamp(1.25rem,3.2vw,1.9rem)] font-semibold text-path">
          {quote}
        </p>
      )}
    </div>
  )
}
