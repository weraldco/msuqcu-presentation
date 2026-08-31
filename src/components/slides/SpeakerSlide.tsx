import { slideContent } from '../../content'

export function SpeakerSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-neutral-950 px-6 text-center">
      <img
        src={slideContent.speaker.photo}
        alt={slideContent.speaker.name}
        className="h-40 w-40 rounded-full object-cover shadow-2xl sm:h-52 sm:w-52"
      />
      <div>
        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold tracking-tight text-white">
          {slideContent.speaker.name}
        </h2>
        <p className="mt-2 text-[clamp(1rem,2.5vw,1.5rem)] font-medium text-white/70">
          {slideContent.speaker.role}
        </p>
      </div>
    </div>
  )
}
