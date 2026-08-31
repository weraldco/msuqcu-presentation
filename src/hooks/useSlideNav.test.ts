import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSlideNav } from './useSlideNav'

describe('useSlideNav', () => {
  it('starts at index 0', () => {
    const { result } = renderHook(() => useSlideNav(4))
    expect(result.current.index).toBe(0)
  })

  it('next() advances the index', () => {
    const { result } = renderHook(() => useSlideNav(4))
    act(() => result.current.next())
    expect(result.current.index).toBe(1)
  })

  it('next() clamps at the last slide', () => {
    const { result } = renderHook(() => useSlideNav(2))
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.index).toBe(1)
  })

  it('prev() clamps at 0', () => {
    const { result } = renderHook(() => useSlideNav(4))
    act(() => result.current.prev())
    expect(result.current.index).toBe(0)
  })

  it('goTo() jumps to a specific index', () => {
    const { result } = renderHook(() => useSlideNav(4))
    act(() => result.current.goTo(2))
    expect(result.current.index).toBe(2)
  })

  it('ArrowRight keydown advances the index', () => {
    const { result } = renderHook(() => useSlideNav(4))
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    })
    expect(result.current.index).toBe(1)
  })
})
