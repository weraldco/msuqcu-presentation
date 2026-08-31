import { slideContent } from '../../content'
import { PhotoSlider } from '../PhotoSlider'

export function PhotoSliderSlide() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-neutral-950 px-6 py-16">
      <PhotoSlider images={[...slideContent.photoSlider.images]} />
    </div>
  )
}
