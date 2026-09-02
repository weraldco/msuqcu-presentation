type StopGetter = () => number

const stops: StopGetter[] = []

/** Registers a scroll-Y "beat" (a settled panel, or one step through a gallery). Returns an unregister fn. */
export function registerStop(getter: StopGetter): () => void {
  stops.push(getter)
  return () => {
    const i = stops.indexOf(getter)
    if (i !== -1) stops.splice(i, 1)
  }
}

export function nextStop(currentY: number): number | undefined {
  let best: number | undefined
  for (const getter of stops) {
    const y = getter()
    if (y > currentY + 4 && (best === undefined || y < best)) best = y
  }
  return best
}
