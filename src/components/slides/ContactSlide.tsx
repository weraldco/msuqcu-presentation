import { slideContent } from '../../content'

export function ContactSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-8 bg-neutral-950 px-6 text-center">
      <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold tracking-tight text-white">
        {slideContent.contact.heading}
      </h2>

      <img
        src={slideContent.contact.qrCode}
        alt="QR code — replace with your own"
        className="h-40 w-40 rounded-2xl shadow-2xl sm:h-48 sm:w-48"
      />

      <ul className="flex flex-col gap-2">
        {slideContent.contact.socials.map((social) => (
          <li
            key={social.label}
            className="text-[clamp(1rem,2.5vw,1.375rem)] text-white/80"
          >
            <span className="font-semibold text-white">{social.label}:</span>{' '}
            {social.handle}
          </li>
        ))}
      </ul>
    </div>
  )
}
