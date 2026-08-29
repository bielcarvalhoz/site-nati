import { useState, type FormEvent } from 'react'
import styles from './ContactForm.module.css'

const ENDPOINT = 'https://api.web3forms.com/submit'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
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
      if (json.success) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className={styles.success} role="status">
        <p>Mensagem enviada. Respondo em até dois dias úteis.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        />
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
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-message">
          Mensagem
        </label>
        <textarea className={styles.textarea} id="cf-message" name="message" required />
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

      {status === 'error' ? (
        <p className={styles.status} data-tone="error" role="alert">
          Não foi possível enviar agora. Use o e-mail ou o WhatsApp abaixo.
        </p>
      ) : null}
    </form>
  )
}
