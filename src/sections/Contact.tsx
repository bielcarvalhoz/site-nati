import { SITE } from '../data/site'
import { SECTION, titleIdFor } from '../lib/nav'
import { isHttps } from '../lib/url'
import SectionHead from '../components/SectionHead'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section
      id={SECTION.contato}
      className="section container"
      aria-labelledby={titleIdFor(SECTION.contato)}
    >
      <SectionHead sectionId={SECTION.contato} index="05" eyebrow="Contato" title="Vamos conversar" />

      <div className={styles.layout}>
        <div className={styles.main}>
          <p className={styles.intro}>
            Sobre um projeto, uma vaga ou uma parceria — conte o contexto e o que você tem em
            mente. Respondo pessoalmente em até dois dias úteis.
          </p>

          <ContactForm />
        </div>

        <div>
          <p className={styles.channelsLabel}>Ou fale direto</p>
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
            {isHttps(SITE.linkedin) ? (
              <li>
                <a
                  className={styles.channel}
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.channelLabel}>LinkedIn</span>
                  <span className={styles.channelValue}>Ver perfil</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  )
}
