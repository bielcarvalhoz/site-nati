import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { NAV_ITEMS } from './lib/nav'
import { SITE } from './data/site'

it('renders the full professional name as the main heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(SITE.fullName)
})

it('renders every nav item as a link whose target section exists', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: /seções do site/i })
  for (const item of NAV_ITEMS) {
    const link = within(nav).getByRole('link', { name: item.label })
    expect(link).toHaveAttribute('href', `#${item.id}`)
    // the anchor must resolve to a real section (guards the stringly-typed coupling)
    expect(document.getElementById(item.id)).not.toBeNull()
  }
})

it('puts the contact CTA in the header banner', () => {
  render(<App />)
  const banner = screen.getByRole('banner')
  expect(within(banner).getByRole('link', { name: /vamos conversar/i })).toHaveAttribute(
    'href',
    '#contato',
  )
})

it('points the skip link at the main landmark', () => {
  render(<App />)
  const skip = screen.getByRole('link', { name: /pular para o conteúdo/i })
  const target = skip.getAttribute('href')?.replace('#', '')
  expect(target).toBeTruthy()
  expect(screen.getByRole('main')).toHaveAttribute('id', target)
})

it('toggles the mobile menu open and closed', () => {
  render(<App />)
  // the toggle is display:none above 46rem (jsdom viewport is wide); it's the only button
  const toggle = screen.getByRole('button', { hidden: true })
  const list = document.getElementById('menu-sections')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(list).toHaveAttribute('data-open', 'false')

  fireEvent.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  expect(list).toHaveAttribute('data-open', 'true')

  fireEvent.keyDown(window, { key: 'Escape' })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
