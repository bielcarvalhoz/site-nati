import { JOURNEY } from '../data/journey'
import { METRICS } from '../data/metrics'
import SectionHead from '../components/SectionHead'
import styles from './Journey.module.css'

const TITLE_ID = 'trajetoria-title'
const METRICS_SHOWN = METRICS.slice(0, 3)

export default function Journey() {
  return (
    <section id="trajetoria" className="section container" aria-labelledby={TITLE_ID}>
      <SectionHead index="03" eyebrow="Trajetória" title="Formação e experiência" titleId={TITLE_ID} />

      <ul className={styles.metrics}>
        {METRICS_SHOWN.map((metric) => (
          <li key={metric.label}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </li>
        ))}
      </ul>

      <ol className={styles.timeline}>
        {JOURNEY.map((entry) => (
          <li key={entry.period} className={styles.entry}>
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
