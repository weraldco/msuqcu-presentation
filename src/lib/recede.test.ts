import { describe, it, expect } from 'vitest'
import { recedeStyle } from './recede'

describe('recedeStyle', () => {
  it('is unchanged at depth 0', () => {
    expect(recedeStyle(0)).toEqual({ scale: 0.9, opacity: 0.6, liftPercent: -50 })
  })

  it('shrinks, dims, and lifts further back with depth', () => {
    const a = recedeStyle(1)
    const b = recedeStyle(2)
    expect(b.scale).toBeLessThan(a.scale)
    expect(b.opacity).toBeLessThan(a.opacity)
    expect(b.liftPercent).toBeLessThan(a.liftPercent)
  })

  it('floors scale and opacity so deep stacks stay visible', () => {
    const deep = recedeStyle(20)
    expect(deep.scale).toBeGreaterThanOrEqual(0.72)
    expect(deep.opacity).toBeGreaterThanOrEqual(0.25)
  })
})
