import { SITE } from '../data/site'
import { SECTION, titleIdFor } from '../lib/nav'
import Placeholder from '../components/Placeholder'
import SectionHead from '../components/SectionHead'
import styles from './About.module.css'

export default function About() {
  return (
    <section
      id={SECTION.sobre}
      className="section container"
      aria-labelledby={titleIdFor(SECTION.sobre)}
    >
      <SectionHead
        sectionId={SECTION.sobre}
        index="03"
        eyebrow="Sobre"
        title="Quem assina os projetos"
      />

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
