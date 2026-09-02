import { describe, it, expect } from 'vitest'
import { registerStop, nextStop } from './scrollStops'

describe('scrollStops', () => {
  it('finds the smallest stop strictly greater than the current position', () => {
    const unregisters = [
      registerStop(() => 100),
      registerStop(() => 300),
      registerStop(() => 200),
    ]
    expect(nextStop(150)).toBe(200)
    unregisters.forEach((u) => u())
  })

  it('returns undefined when there is no stop ahead', () => {
    const unregister = registerStop(() => 100)
    expect(nextStop(500)).toBeUndefined()
    unregister()
  })

  it('ignores stops at or behind the current position (with a small epsilon)', () => {
    const unregister = registerStop(() => 100)
    expect(nextStop(100)).toBeUndefined()
    expect(nextStop(97)).toBeUndefined()
    unregister()
  })

  it('unregister removes the stop', () => {
    const unregister = registerStop(() => 500)
    unregister()
    expect(nextStop(0)).toBeUndefined()
  })
})
