# Presentation Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive 4-slide React/TypeScript/Tailwind presentation ("Your Path Doesn't Have to Be Straight") navigable by keyboard, click, and swipe.

**Architecture:** Vite + React + TypeScript app. Slide content lives in a plain data module. A `useSlideNav` hook owns the active-slide index and wires keyboard/swipe/click input. Four slide components render from an array driven by that index, wrapped by a shared `SlideNav` dot-indicator/click-zone component. A standalone `PhotoSlider` component handles the placeholder image carousel.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, Google Fonts (League Spartan, Caveat).

**Spec:** `docs/superpowers/specs/2026-08-31-presentation-slides-design.md`

## Global Constraints

- Fonts: League Spartan (primary/display) + Caveat (script accent for quotes), loaded from Google Fonts.
- 4 slides only, in this order: Title, Quote, PhotoSlider, Final. No other content slides.
- Navigation must work via: ArrowLeft/ArrowRight keys, click (prev/next zones or buttons), and touch swipe.
- Full-viewport (`h-dvh`) layout, must be usable from phone width (~360px) up through desktop/projector widths.
- Dark, minimal background; bold oversized editorial type.
- `PhotoSlider` takes an `images: string[]` prop — placeholders now, real photos swapped in later without code changes.

---

### Task 1: Scaffold Vite + React + TypeScript + Tailwind project — ✅ COMPLETE (commit 5bc42e8)

This task already ran successfully (see ledger). Left here only for
historical record; do not re-dispatch.

**Files:**
- Create: entire Vite scaffold (`package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, etc.)
- Modify: `src/index.css` (Tailwind import + Google Fonts `@import`)
- Modify: `index.html` (title, viewport meta)

**Interfaces:**
- Produces: a running `npm run dev` app that renders `<App />`, Tailwind classes work, League Spartan and Caveat are available as `font-sans` / `font-script` Tailwind utilities.

- [x] **Step 1: Scaffold the project**
- [x] **Step 2: Install dependencies**
- [x] **Step 3: Wire up Tailwind v4 via the Vite plugin**
- [x] **Step 4: Replace `src/index.css` with Tailwind import + fonts**
- [x] **Step 5: Update `index.html` title**
- [x] **Step 6: Verify the dev server runs**
- [x] **Step 7: Commit**

---

### Task 2: Content data module and slide-navigation hook

**Files:**
- Create: `src/content.ts`
- Create: `src/hooks/useSlideNav.ts`
- Test: `src/hooks/useSlideNav.test.ts`
- Install: `npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom`

**Interfaces:**
- Produces:
  - `export const slideContent` in `src/content.ts`: an object with keys `title`, `quote`, `photoSlider`, `final`, each holding the exact copy strings (see Step 1).
  - `export function useSlideNav(slideCount: number)` in `src/hooks/useSlideNav.ts` returning `{ index: number; next: () => void; prev: () => void; goTo: (i: number) => void }`. `next`/`prev` clamp to `[0, slideCount - 1]` (no wraparound). Attaches a `keydown` listener for `ArrowRight`/`ArrowLeft` on mount, removes it on unmount.

- [ ] **Step 1: Create the content data module**

`src/content.ts`:
```ts
export const slideContent = {
  title: {
    heading: "Your Path Doesn't Have to Be Straight",
  },
  quote: {
    lines: [
      { text: "Mine certainly wasn't.", bold: false },
      { text: "Just make sure you're moving.", bold: true },
    ],
  },
  photoSlider: {
    images: [
      "https://placehold.co/1200x800/1a1a1d/ffffff?text=Photo+1",
      "https://placehold.co/1200x800/1a1a1d/ffffff?text=Photo+2",
      "https://placehold.co/1200x800/1a1a1d/ffffff?text=Photo+3",
    ],
  },
  final: {
    heading: "YOUR PATH DOESN'T HAVE TO BE STRAIGHT.",
    subheading: "Just keep moving.",
  },
} as const
```

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Add to `vite.config.ts` (merge into existing `defineConfig`):
```ts
/// <reference types="vitest/config" />
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
})
```

Add to `package.json` `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 3: Write the failing test for `useSlideNav`**

`src/hooks/useSlideNav.test.ts`:
```ts
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
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `src/hooks/useSlideNav.ts` does not exist yet.

- [ ] **Step 5: Implement `useSlideNav`**

`src/hooks/useSlideNav.ts`:
```ts
import { useCallback, useEffect, useState } from 'react'

export function useSlideNav(slideCount: number) {
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.min(Math.max(i, 0), slideCount - 1))
    },
    [slideCount],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev])

  return { index, next, prev, goTo }
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (6 tests).

- [ ] **Step 7: Commit**

```bash
git add src/content.ts src/hooks/useSlideNav.ts src/hooks/useSlideNav.test.ts vite.config.ts package.json package-lock.json
git commit -m "feat: add slide content data and useSlideNav hook"
```

---

### Task 3: PhotoSlider component

**Files:**
- Create: `src/components/PhotoSlider.tsx`
- Test: `src/components/PhotoSlider.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (standalone).
- Produces: `export function PhotoSlider({ images }: { images: string[] })` — renders the current image, prev/next buttons (`aria-label="Previous photo"` / `"Next photo"`), and one dot button per image (`aria-label="Go to photo N"`) that sets the active image on click. Internal index wraps within `[0, images.length - 1]`, clamped (no wraparound), starting at 0.

- [ ] **Step 1: Write the failing test**

`src/components/PhotoSlider.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PhotoSlider } from './PhotoSlider'

const images = ['/a.jpg', '/b.jpg', '/c.jpg']

describe('PhotoSlider', () => {
  it('renders the first image initially', () => {
    render(<PhotoSlider images={images} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/a.jpg')
  })

  it('advances to the next image on next click', () => {
    render(<PhotoSlider images={images} />)
    fireEvent.click(screen.getByLabelText('Next photo'))
    expect(screen.getByRole('img')).toHaveAttribute('src', '/b.jpg')
  })

  it('does not advance past the last image', () => {
    render(<PhotoSlider images={images} />)
    fireEvent.click(screen.getByLabelText('Next photo'))
    fireEvent.click(screen.getByLabelText('Next photo'))
    fireEvent.click(screen.getByLabelText('Next photo'))
    expect(screen.getByRole('img')).toHaveAttribute('src', '/c.jpg')
  })

  it('jumps to an image via its dot', () => {
    render(<PhotoSlider images={images} />)
    fireEvent.click(screen.getByLabelText('Go to photo 3'))
    expect(screen.getByRole('img')).toHaveAttribute('src', '/c.jpg')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `src/components/PhotoSlider.tsx` does not exist.

- [ ] **Step 3: Implement `PhotoSlider`**

`src/components/PhotoSlider.tsx`:
```tsx
import { useState } from 'react'

export function PhotoSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  function clamp(i: number) {
    return Math.min(Math.max(i, 0), images.length - 1)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <img
        src={images[index]}
        alt={`Slide photo ${index + 1} of ${images.length}`}
        className="max-h-[70vh] max-w-[90vw] rounded-2xl object-cover shadow-2xl"
      />

      {index > 0 && (
        <button
          aria-label="Previous photo"
          onClick={() => setIndex((i) => clamp(i - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
        >
          ‹
        </button>
      )}
      {index < images.length - 1 && (
        <button
          aria-label="Next photo"
          onClick={() => setIndex((i) => clamp(i + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
        >
          ›
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/PhotoSlider.tsx src/components/PhotoSlider.test.tsx
git commit -m "feat: add PhotoSlider carousel component"
```

---

### Task 4: Slide components (Title, Quote, PhotoSliderSlide, Final)

**Files:**
- Create: `src/components/slides/TitleSlide.tsx`
- Create: `src/components/slides/QuoteSlide.tsx`
- Create: `src/components/slides/PhotoSliderSlide.tsx`
- Create: `src/components/slides/FinalSlide.tsx`

**Interfaces:**
- Consumes: `slideContent` from `src/content.ts` (Task 2), `PhotoSlider` from `src/components/PhotoSlider.tsx` (Task 3).
- Produces: four default-export-free named components, each a plain `() => JSX.Element` with no props, each rendering a `h-dvh w-full` root element. Later tasks (Task 5) import these by name.

- [ ] **Step 1: Implement `TitleSlide`**

`src/components/slides/TitleSlide.tsx`:
```tsx
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
```

- [ ] **Step 2: Implement `QuoteSlide`**

`src/components/slides/QuoteSlide.tsx`:
```tsx
import { slideContent } from '../../content'

export function QuoteSlide() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-neutral-950 px-6 text-center">
      {slideContent.quote.lines.map((line) => (
        <p
          key={line.text}
          className={`max-w-3xl font-script text-[clamp(1.75rem,6vw,4rem)] text-white ${
            line.bold ? 'font-bold' : 'font-medium text-white/80'
          }`}
        >
          {line.text}
        </p>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Implement `PhotoSliderSlide`**

`src/components/slides/PhotoSliderSlide.tsx`:
```tsx
import { slideContent } from '../../content'
import { PhotoSlider } from '../PhotoSlider'

export function PhotoSliderSlide() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-neutral-950 px-6 py-16">
      <PhotoSlider images={[...slideContent.photoSlider.images]} />
    </div>
  )
}
```

- [ ] **Step 4: Implement `FinalSlide`**

`src/components/slides/FinalSlide.tsx`:
```tsx
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
```

- [ ] **Step 5: Verify the project still type-checks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/slides
git commit -m "feat: add Title, Quote, PhotoSlider, and Final slide components"
```

---

### Task 5: SlideNav (dot indicator + click zones) and App wiring with swipe support

**Files:**
- Create: `src/components/SlideNav.tsx`
- Modify: `src/App.tsx`
- Modify: `src/hooks/useSlideNav.ts:1-27` (no signature change — used as-is)

**Interfaces:**
- Consumes: `useSlideNav` from Task 2, all four slide components from Task 4.
- Produces: `App.tsx` renders the deck; this is the top-level integration, no further tasks depend on it.

- [ ] **Step 1: Implement `SlideNav`**

`src/components/SlideNav.tsx`:
```tsx
export function SlideNav({
  count,
  index,
  onGoTo,
}: {
  count: number
  index: number
  onGoTo: (i: number) => void
}) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 flex justify-center gap-2"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onGoTo(i)}
          className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition ${
            i === index ? 'bg-white' : 'bg-white/30'
          }`}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Wire up `App.tsx` with the deck, click zones, and swipe handling**

`src/App.tsx`:
```tsx
import { useRef } from 'react'
import { useSlideNav } from './hooks/useSlideNav'
import { SlideNav } from './components/SlideNav'
import { TitleSlide } from './components/slides/TitleSlide'
import { QuoteSlide } from './components/slides/QuoteSlide'
import { PhotoSliderSlide } from './components/slides/PhotoSliderSlide'
import { FinalSlide } from './components/slides/FinalSlide'

const slides = [TitleSlide, QuoteSlide, PhotoSliderSlide, FinalSlide]
const SWIPE_THRESHOLD_PX = 50

function App() {
  const { index, next, prev, goTo } = useSlideNav(slides.length)
  const touchStartX = useRef<number | null>(null)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > SWIPE_THRESHOLD_PX) prev()
    if (delta < -SWIPE_THRESHOLD_PX) next()
    touchStartX.current = null
  }

  const ActiveSlide = slides[index]

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ActiveSlide />

      {index > 0 && (
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="fixed left-0 top-0 h-full w-1/4 cursor-w-resize"
        />
      )}
      {index < slides.length - 1 && (
        <button
          aria-label="Next slide"
          onClick={next}
          className="fixed right-0 top-0 h-full w-1/4 cursor-e-resize"
        />
      )}

      <SlideNav count={slides.length} index={index} onGoTo={goTo} />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Remove unused default Vite boilerplate**

Delete `src/App.css` if it exists and remove its import from `App.tsx` (already excluded above). Delete `src/assets/react.svg` if unused.

- [ ] **Step 4: Type-check and run existing tests**

Run: `npx tsc --noEmit && npm run test`
Expected: no type errors, all prior tests still pass (`useSlideNav`, `PhotoSlider`).

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, open the printed local URL in a browser.
Expected: Title slide shown first; ArrowRight/click-right/swipe-left each advance through Quote → PhotoSlider (carousel arrows/dots work) → Final; ArrowLeft/click-left/swipe-right go back; dots at the bottom reflect and control position; resize the window down to ~360px wide and confirm text and layout stay readable with no horizontal overflow.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/SlideNav.tsx
git rm -f src/App.css 2>/dev/null || true
git commit -m "feat: wire up slide deck navigation with click, keyboard, and swipe"
```

---

## Self-Review Notes

- **Spec coverage:** Title/Quote/PhotoSlider/Final slides (Tasks 4–5), fonts (Task 1), keyboard+click+swipe nav (Task 5), placeholder images via `images: string[]` prop (Task 3), responsive full-viewport styling (Tasks 4–5), content data module (Task 2) — all covered. Out-of-scope items (real photos, extra content slides, speaker notes/export) intentionally have no tasks.
- **Types:** `useSlideNav(slideCount: number) => { index, next, prev, goTo }` used consistently in Task 5. `PhotoSlider({ images: string[] })` matches its Task 3 definition and Task 4's usage. `slideContent` shape from Task 2 matches every consumer's field access (`.title.heading`, `.quote.lines`, `.photoSlider.images`, `.final.heading/.subheading`).
- **No placeholders:** all steps contain full code, no TODOs.
