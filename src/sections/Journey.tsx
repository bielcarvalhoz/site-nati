import { JOURNEY } from '../data/journey'
import type { JourneyEntry } from '../data/types'
import { METRICS } from '../data/metrics'
import { SECTION, titleIdFor } from '../lib/nav'
import SectionHead from '../components/SectionHead'
import styles from './Journey.module.css'

export default function Journey() {
  return (
    <section
      id={SECTION.trajetoria}
      className="section container"
      aria-labelledby={titleIdFor(SECTION.trajetoria)}
    >
      <SectionHead
        sectionId={SECTION.trajetoria}
        index="02"
        eyebrow="Trajetória"
        title="Formação e experiência"
      />

      <ul className={styles.metrics}>
        {METRICS.map((metric) => (
          <li key={metric.label}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </li>
        ))}
      </ul>

      <ol className={styles.timeline}>
        {JOURNEY.map((entry: JourneyEntry) => (
          <li key={entry.period} className={styles.entry}>
            {entry.logo ? (
              <img
                className={styles.logo}
                src={entry.logo}
                alt=""
                loading="lazy"
                width={40}
                height={40}
              />
            ) : null}
            <p className={styles.period}>{entry.period}</p>
            <p className={styles.role}>
              {entry.role} <span className={styles.org}>· {entry.org}</span>
            </p>
            <p className={styles.desc}>{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
