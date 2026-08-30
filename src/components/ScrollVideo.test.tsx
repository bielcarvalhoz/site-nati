import { render } from '@testing-library/react'
import ScrollVideo from './ScrollVideo'

const set = (query: string, matches: boolean) => {
  window.matchMedia = ((q: string) =>
    ({
      matches: q === query ? matches : false,
      media: q,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList) as typeof window.matchMedia
}

afterEach(() => {
  set('', false)
})

it('renders a pinned stage with a paused, muted video when motion is allowed', () => {
  set('', false)
  const { container } = render(<ScrollVideo src="/x.mp4" poster="/p.jpg" label="alt" />)
  const video = container.querySelector('video')
  expect(video).toBeInTheDocument()
  expect(video).not.toHaveAttribute('autoplay')
  expect(video).not.toHaveAttribute('loop')
  expect(video).toHaveAttribute('aria-hidden', 'true')
  expect(video?.muted).toBe(true)
})

it('falls back to a still image under reduced motion', () => {
  set('(prefers-reduced-motion: reduce)', true)
  const { container } = render(<ScrollVideo src="/x.mp4" poster="/p.jpg" />)
  expect(container.querySelector('video')).not.toBeInTheDocument()
  const img = container.querySelector('img')
  expect(img).toHaveAttribute('src', '/p.jpg')
})

it('still pins on small screens (mobile gets the scrub too)', () => {
  set('(max-width: 40rem)', true)
  const { container } = render(<ScrollVideo src="/x.mp4" poster="/p.jpg" />)
  expect(container.querySelector('video')).toBeInTheDocument()
})
