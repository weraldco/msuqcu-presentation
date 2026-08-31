# MSU Onboarding Talk — Presentation Slides

## Goal

A responsive, browser-based slide deck (4 slides) for a talk titled
"Your Path Doesn't Have to Be Straight." Built with React + TypeScript
+ Tailwind, navigable via keyboard, click, and touch swipe.

## Content

1. **Title slide** — "Your Path Doesn't Have to Be Straight"
2. **Quote slide** — "Mine certainly wasn't." and, bolded, "Just make
   sure you're moving."
3. **Photo slider slide** — a swipeable carousel of placeholder images
   (stand-in for a future photo set from the speaker's career story).
4. **Final slide** — "YOUR PATH DOESN'T HAVE TO BE STRAIGHT." /
   "Just keep moving."

(The "Presentation Rhythm" notes from the brief are speaker guidance,
not slide content — not rendered.)

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- Fonts: **League Spartan** (primary/display) + **Caveat** (script
  accent for quotes), both via Google Fonts.

## Architecture

- `src/content.ts` — plain data module holding slide text, so copy
  edits don't touch component code.
- `src/hooks/useSlideNav.ts` — owns current slide index; exposes
  `next`/`prev`/`goTo`; wires ArrowLeft/ArrowRight keydown and touch
  swipe (touchstart/touchend delta) listeners.
- `src/components/slides/`
  - `TitleSlide.tsx`
  - `QuoteSlide.tsx`
  - `PhotoSliderSlide.tsx` (renders `PhotoSlider`)
  - `FinalSlide.tsx`
- `src/components/PhotoSlider.tsx` — self-contained carousel:
  placeholder images, prev/next arrows, dot indicators, swipeable.
  Takes an `images: string[]` prop so a real photo set can replace
  placeholders later without touching the slide component.
- `src/components/SlideNav.tsx` — bottom dot-progress indicator +
  prev/next click zones, shared across the deck.
- `src/App.tsx` — renders the active slide from the deck array based
  on `useSlideNav` state.

## Styling

- Full-viewport (`h-dvh`) slides, one visible at a time, horizontal
  slide/fade transition between them.
- Bold, oversized editorial typography using Tailwind's responsive +
  `clamp`-driven font sizing so text scales from phone to projector.
- Dark, minimal background so type and photos stay the focus.
- Safe-area padding (`env(safe-area-inset-*)`) for notched mobile
  devices.

## Out of scope

- Story/Lesson/Funny content slides from the rhythm outline (not
  provided yet — deck structure is extensible so they can be added
  later as new entries in the slide array).
- Real photography (placeholders only).
- Speaker-notes view, PDF export, remote-control.

## Testing

Manual verification: `npm run dev`, check all 4 slides at mobile,
tablet, and desktop widths; verify keyboard, click, and swipe
navigation all move between slides correctly.
