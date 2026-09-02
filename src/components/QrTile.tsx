export function QrTile({ label, qr }: { label: string; qr: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={qr}
        alt={`${label} QR code`}
        className="h-36 w-36 rounded-sm shadow-2xl shadow-black/60 sm:h-40 sm:w-40"
      />
      <span className="font-display text-[clamp(0.9rem,2vw,1.05rem)] font-semibold uppercase tracking-[0.15em] text-white/70">
        {label}
      </span>
    </div>
  )
}
