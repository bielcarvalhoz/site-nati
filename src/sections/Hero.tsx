import { SITE } from '../data/site'
import { TOP_ID } from '../lib/nav'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id={TOP_ID} className={`container ${styles.hero}`} aria-label="Apresentação">
      <p className="eyebrow">{SITE.role}</p>
      <h1>{SITE.fullName}</h1>
      <p className={styles.lede}>{SITE.tagline}</p>
      <p className={styles.lead}>{SITE.heroLead}</p>
      {/* Step 4 mounts the 3D scene here. */}
      <div className={styles.stage} aria-hidden="true" />
    </section>
  )
}
