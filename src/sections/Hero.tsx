import { SITE } from '../data/site'
import { TOP_ID } from '../lib/nav'
import ScrollVideo from '../components/ScrollVideo'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <>
      <section id={TOP_ID} className={`container ${styles.hero}`} aria-label="Apresentação">
        <p className="eyebrow">{SITE.role}</p>
        <h1>{SITE.fullName}</h1>
        <p className={styles.lede}>{SITE.tagline}</p>
        <p className={styles.lead}>{SITE.heroLead}</p>
      </section>

      <ScrollVideo
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        scrubVh={200}
        plate={`${SITE.fullName} · ${SITE.role}`}
        label="Um desenho técnico numa prancheta se transforma, traço a traço, num apartamento mobiliado e decorado."
      />
    </>
  )
}
