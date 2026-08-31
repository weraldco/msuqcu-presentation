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

  it('renders nothing when images array is empty', () => {
    const { container } = render(<PhotoSlider images={[]} />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(container.querySelectorAll('button')).toHaveLength(0)
  })
})
