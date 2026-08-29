import { fireEvent, render, screen, within } from '@testing-library/react'
import Projects from './Projects'
import { ACADEMICOS, REALIZADOS } from '../data/projects'

const builtCard = () => screen.queryByRole('button', { name: new RegExp(REALIZADOS[0]!.title) })
const academicCard = () => screen.queryByRole('button', { name: new RegExp(ACADEMICOS[0]!.title) })

it('filters between professional and academic projects', () => {
  render(<Projects />)
  expect(builtCard()).toBeInTheDocument()
  expect(academicCard()).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /acadêmicos/i }))
  expect(academicCard()).toBeInTheDocument()
  expect(builtCard()).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /profissionais/i }))
  expect(builtCard()).toBeInTheDocument()
})

it('opens a project dialog with context and partido, then closes it', () => {
  render(<Projects />)
  const project = REALIZADOS[0]!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(project.title) }))

  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByRole('heading', { level: 3 })).toHaveTextContent(project.title)
  expect(within(dialog).getByText('Contexto')).toBeInTheDocument()
  expect(within(dialog).getByText('Partido')).toBeInTheDocument()
  expect(within(dialog).getByText(project.context)).toBeInTheDocument()

  fireEvent.click(within(dialog).getByRole('button', { name: /fechar/i }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
