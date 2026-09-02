export function QrSection({
  heading,
  qr,
  caption,
}: {
  heading: string
  qr: string
  caption?: string
}) {
  return (
    <div className="flex flex-col items-center gap-6 px-6 text-center">
      <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight">
        {heading}
      </h2>
      <img
        src={qr}
        alt={caption ?? heading}
        className="h-44 w-44 rounded-sm shadow-2xl shadow-black/60 sm:h-52 sm:w-52"
      />
      {caption && (
        <p className="text-[clamp(1rem,2.3vw,1.2rem)] font-semibold text-path">{caption}</p>
      )}
    </div>
  )
}
