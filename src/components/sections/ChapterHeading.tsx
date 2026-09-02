import { useFitText } from '../../hooks/useFitText'

export function ChapterHeading({
  id,
  number,
  heading,
}: {
  id?: string
  number?: string
  heading: string
}) {
  const fitRef = useFitText<HTMLHeadingElement>([heading])

  return (
    <div id={id} className="flex w-full flex-col items-center gap-4 px-6 text-center">
      {number && (
        <span className="font-display text-[clamp(1rem,2.5vw,1.5rem)] font-bold uppercase tracking-[0.4em] text-path">
          {number}
        </span>
      )}
      <div className="w-full max-w-4xl">
        <h2
          ref={fitRef}
          className="whitespace-nowrap font-display text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold uppercase leading-[1.05] tracking-tight"
        >
          {heading}
        </h2>
      </div>
    </div>
  )
}
