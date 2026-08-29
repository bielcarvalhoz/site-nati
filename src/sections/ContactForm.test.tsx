import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ContactForm from './ContactForm'

function fill() {
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Ana' } })
  fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText('Mensagem'), { target: { value: 'Gostaria de conversar.' } })
}

beforeEach(() => {
  vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key')
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

it('does not submit when required fields are empty', () => {
  const fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  render(<ContactForm />)

  fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
  expect(fetchMock).not.toHaveBeenCalled()
})

it('posts to Web3Forms and shows a success message', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) })
  vi.stubGlobal('fetch', fetchMock)
  render(<ContactForm />)

  fill()
  fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/mensagem enviada/i))

  const [url, init] = fetchMock.mock.calls[0]!
  expect(url).toBe('https://api.web3forms.com/submit')
  expect(init.method).toBe('POST')
  const body = JSON.parse(init.body)
  expect(body.access_key).toBe('test-key')
  expect(body.email).toBe('ana@example.com')
})

it('shows an error when Web3Forms rejects the submission', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ success: false }) }))
  render(<ContactForm />)

  fill()
  fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
})

it('drops the submission when the honeypot is filled', () => {
  const fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  render(<ContactForm />)

  fill()
  const honeypot = document.querySelector<HTMLInputElement>('input[name="botcheck"]')!
  fireEvent.click(honeypot)
  fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

  expect(fetchMock).not.toHaveBeenCalled()
})
