import { slideContent } from '../../content'

export function TitleSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-950 px-6 text-center">
      <h1 className="max-w-4xl text-[clamp(2rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
        {slideContent.title.heading}
      </h1>
    </div>
  )
}
