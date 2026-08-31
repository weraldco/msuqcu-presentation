import { slideContent } from '../../content'

export function FinalSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center">
      <h1 className="max-w-4xl text-[clamp(1.75rem,6vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
        {slideContent.final.heading}
      </h1>
      <p className="font-script text-[clamp(1.5rem,5vw,3rem)] font-semibold text-white/80">
        {slideContent.final.subheading}
      </p>
    </div>
  )
}
