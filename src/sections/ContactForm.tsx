import { useEffect, useRef, useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import styles from './ContactForm.module.css'

const ENDPOINT = 'https://api.web3forms.com/submit'

type Status = 'idle' | 'sending' | 'ok' | 'error'
type FieldName = 'name' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>

const ERROR_TEXT = 'Não foi possível enviar agora. Use o e-mail ou o WhatsApp abaixo.'

const WHAT: Record<FieldName, string> = {
  name: 'seu nome',
  email: 'seu e-mail',
  message: 'sua mensagem',
}

// Portuguese message from the field's own native validity — the form carries
// `noValidate`, so these render inline instead of the browser's bubbles.
function messageFor(el: HTMLInputElement | HTMLTextAreaElement): string {
  const v = el.validity
  if (v.valueMissing) return `Informe ${WHAT[el.name as FieldName]}.`
  if (v.typeMismatch) return 'E-mail inválido.'
  return ''
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'ok') successRef.current?.focus()
  }, [status])

  function validateControl(el: HTMLInputElement | HTMLTextAreaElement) {
    const msg = messageFor(el)
    setErrors((prev) => {
      if ((prev[el.name as FieldName] ?? '') === msg) return prev
      const next = { ...prev }
      if (msg) next[el.name as FieldName] = msg
      else delete next[el.name as FieldName]
      return next
    })
    return msg
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    const controls = ['name', 'email', 'message']
      .map((n) => form.elements.namedItem(n))
      .filter(
        (el): el is HTMLInputElement | HTMLTextAreaElement =>
          el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement,
      )
    const found: Errors = {}
    for (const el of controls) {
      const msg = messageFor(el)
      if (msg) found[el.name as FieldName] = msg
    }
    if (Object.keys(found).length > 0) {
      // flush so the field gains aria-invalid + aria-describedby before it takes
      // focus — otherwise a screen reader hears the field with no error attached
      flushSync(() => setErrors(found))
      controls.find((el) => found[el.name as FieldName])?.focus()
      return
    }

    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot tripped — silently drop

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
    if (!accessKey) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Contato pelo site',
          from_name: String(data.get('name') ?? ''),
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      const json = (await res.json()) as { success?: boolean }
      setStatus(json.success ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className={styles.success} role="status" tabIndex={-1} ref={successRef}>
        <p>Mensagem enviada. Respondo em até dois dias úteis.</p>
      </div>
    )
  }

  // re-check a field once it has been flagged, so the error clears as they fix it
  const recheck = (e: FormEvent<HTMLFormElement>) => {
    const el = e.target
    if (
      (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
      el.name in errors
    ) {
      validateControl(el)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate onInput={recheck}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-name">
          Nome
        </label>
        <input
          className={styles.input}
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          onBlur={(e) => validateControl(e.currentTarget)}
        />
        {errors.name ? (
          <p className={styles.fieldError} id="cf-name-err">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-email">
          E-mail
        </label>
        <input
          className={styles.input}
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          onBlur={(e) => validateControl(e.currentTarget)}
        />
        {errors.email ? (
          <p className={styles.fieldError} id="cf-email-err">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-message">
          Mensagem
        </label>
        <textarea
          className={styles.textarea}
          id="cf-message"
          name="message"
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          onBlur={(e) => validateControl(e.currentTarget)}
        />
        {errors.message ? (
          <p className={styles.fieldError} id="cf-message-err">
            {errors.message}
          </p>
        ) : null}
      </div>

      <input
        className={styles.hp}
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button className={styles.submit} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
      </button>

      {/* always mounted so assistive tech reliably announces the change */}
      <p className={styles.status} data-tone="error" role="alert">
        {status === 'error' ? ERROR_TEXT : ''}
      </p>
    </form>
  )
}
