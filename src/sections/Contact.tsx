import { SITE } from '../data/site'
import SectionHead from '../components/SectionHead'
import styles from './Contact.module.css'

const TITLE_ID = 'contato-title'

export default function Contact() {
  return (
    <section id="contato" className="section container" aria-labelledby={TITLE_ID}>
      <SectionHead
        index="05"
        eyebrow="Contato"
        title="Vamos conversar sobre o seu projeto"
        titleId={TITLE_ID}
      />

      <div className={styles.layout}>
        <p className={styles.intro}>
          Conte um pouco sobre o espaço, o prazo e o que você espera do projeto. Respondo em
          até dois dias úteis.
        </p>

        <ul className={styles.channels}>
          <li>
            <a className={styles.channel} href={`mailto:${SITE.email}`}>
              <span className={styles.channelLabel}>E-mail</span>
              <span className={styles.channelValue}>{SITE.email}</span>
            </a>
          </li>
          {SITE.whatsapp ? (
            <li>
              <a
                className={styles.channel}
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.channelLabel}>WhatsApp</span>
                <span className={styles.channelValue}>Mandar mensagem</span>
              </a>
            </li>
          ) : null}
          {SITE.instagram ? (
            <li>
              <a
                className={styles.channel}
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.channelLabel}>Instagram</span>
                <span className={styles.channelValue}>Ver trabalhos recentes</span>
              </a>
            </li>
          ) : null}
        </ul>

        <p className={styles.note}>Formulário de contato entra no próximo passo.</p>
      </div>
    </section>
  )
}
