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
  const isPhotoSlider = ActiveSlide === PhotoSliderSlide

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div key={index} className="slide-fade h-full w-full">
        <ActiveSlide />
      </div>

      {index > 0 && (
        <button
          aria-label="Previous slide"
          onClick={prev}
          className={`fixed top-0 h-full cursor-w-resize ${
            isPhotoSlider ? 'left-24 w-16' : 'left-0 w-1/4'
          }`}
        />
      )}
      {index < slides.length - 1 && (
        <button
          aria-label="Next slide"
          onClick={next}
          className={`fixed top-0 h-full cursor-e-resize ${
            isPhotoSlider ? 'right-24 w-16' : 'right-0 w-1/4'
          }`}
        />
      )}

      <SlideNav count={slides.length} index={index} onGoTo={goTo} />
    </div>
  )
}

export default App
