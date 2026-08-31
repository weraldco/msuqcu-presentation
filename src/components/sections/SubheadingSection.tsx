export function SubheadingSection({ heading }: { heading: string }) {
  return (
    <h3 className="max-w-3xl px-6 text-center font-display text-[clamp(1.5rem,4.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight text-white/75">
      {heading}
    </h3>
  )
}
