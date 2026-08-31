import { StaggerReveal } from '../StaggerReveal'

export function ContactSection({
  heading,
  qrCode,
  socials,
}: {
  heading: string
  qrCode: string
  socials: { label: string; handle: string }[]
}) {
  return (
    <div className="flex flex-col items-center gap-8 px-6 pb-24 text-center">
      <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold tracking-tight">
        {heading}
      </h2>
      <img
        src={qrCode}
        alt="QR code — replace with your own"
        className="h-36 w-36 rounded-sm sm:h-44 sm:w-44"
      />
      <StaggerReveal className="flex flex-col gap-2">
        {socials.map((social) => (
          <p key={social.label} className="text-[clamp(1rem,2.3vw,1.2rem)] text-white/70">
            <span className="font-semibold text-white">{social.label}:</span> {social.handle}
          </p>
        ))}
      </StaggerReveal>
    </div>
  )
}
