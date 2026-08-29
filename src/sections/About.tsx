import { SITE } from '../data/site'
import Placeholder from '../components/Placeholder'
import SectionHead from '../components/SectionHead'
import styles from './About.module.css'

const TITLE_ID = 'sobre-title'

export default function About() {
  return (
    <section id="sobre" className="section container" aria-labelledby={TITLE_ID}>
      <SectionHead index="04" eyebrow="Sobre" title="Quem assina os projetos" titleId={TITLE_ID} />

      <div className={styles.layout}>
        <div className={styles.portrait}>
          <Placeholder seed={SITE.fullName} label={SITE.fullName} />
        </div>
        <div className={styles.prose}>
          {SITE.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
