export function FinalSection({
  heading,
  subheading,
}: {
  heading: string
  subheading: string
}) {
  return (
    <div className="flex flex-col items-center gap-6 px-6 text-center">
      <h2 className="max-w-4xl font-display text-[clamp(2rem,6.5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight">
        {heading}
      </h2>
      <p className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-path">
        {subheading}
      </p>
    </div>
  )
}
