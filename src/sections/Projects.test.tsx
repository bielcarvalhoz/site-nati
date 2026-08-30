import { fireEvent, render, screen, within } from '@testing-library/react'
import Projects from './Projects'
import { PROJECTS } from '../data/projects'

it('renders every project as a card', () => {
  render(<Projects />)
  for (const p of PROJECTS) {
    expect(screen.getByRole('button', { name: new RegExp(p.title) })).toBeInTheDocument()
  }
})

it('opens a project dialog with context and partido, locks scroll, then closes', () => {
  render(<Projects />)
  const project = PROJECTS[0]!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(project.title) }))

  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByRole('heading', { level: 3 })).toHaveTextContent(project.title)
  expect(within(dialog).getByText('Contexto')).toBeInTheDocument()
  expect(within(dialog).getByText('Partido')).toBeInTheDocument()
  expect(within(dialog).getByText(project.context)).toBeInTheDocument()
  expect(document.body.style.overflow).toBe('hidden')

  fireEvent.click(within(dialog).getByRole('button', { name: /fechar/i }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(document.body.style.overflow).toBe('')
})
