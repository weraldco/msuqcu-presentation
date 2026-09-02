import { StaggerReveal } from '../StaggerReveal'
import { QrTile } from '../QrTile'

export function ContactSection({
  heading,
  qrs,
}: {
  heading: string
  qrs: { label: string; qr: string }[]
}) {
  return (
    <div className="flex flex-col items-center gap-10 px-6 pb-24 text-center">
      <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold tracking-tight">
        {heading}
      </h2>
      <StaggerReveal className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        {qrs.map((item) => (
          <QrTile key={item.label} label={item.label} qr={item.qr} />
        ))}
      </StaggerReveal>
    </div>
  )
}
