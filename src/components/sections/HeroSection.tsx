export function HeroSection({ heading, subtitle }: { heading: string; subtitle?: string }) {
  return (
    <div id="home" className="relative flex flex-col items-center gap-6 px-6 text-center">
      <h1 className="max-w-4xl font-display text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
        {heading}
      </h1>
      {subtitle && (
        <p className="max-w-xl text-[clamp(1rem,2.6vw,1.35rem)] text-white/60">{subtitle}</p>
      )}
      <div className="absolute -bottom-16 flex flex-col items-center gap-2">
        <span className="h-10 w-px animate-pulse bg-linear-to-b from-path to-transparent" />
      </div>
    </div>
  )
}
