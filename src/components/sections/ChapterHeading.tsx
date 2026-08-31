export function ChapterHeading({
  id,
  number,
  heading,
}: {
  id?: string
  number?: string
  heading: string
}) {
  return (
    <div id={id} className="flex flex-col items-center gap-4 px-6 text-center">
      {number && (
        <span className="font-display text-xs font-bold uppercase tracking-[0.4em] text-path sm:text-sm">
          {number}
        </span>
      )}
      <h2 className="max-w-4xl font-display text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold uppercase leading-[1.05] tracking-tight">
        {heading}
      </h2>
    </div>
  )
}
