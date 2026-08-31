/** Visual state of a photo that has been pushed behind newer photos in the stack. */
export function recedeStyle(depth: number): { scale: number; opacity: number; liftPercent: number } {
  return {
    scale: Math.max(0.72, 0.9 - depth * 0.06),
    opacity: Math.max(0.25, 0.6 - depth * 0.15),
    liftPercent: -50 - depth * 4,
  }
}
