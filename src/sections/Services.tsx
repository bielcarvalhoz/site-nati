import { SERVICES, TOOLS } from '../data/services'
import SectionHead from '../components/SectionHead'
import styles from './Services.module.css'

const TITLE_ID = 'servicos-title'

export default function Services() {
  return (
    <section id="servicos" className="section container" aria-labelledby={TITLE_ID}>
      <SectionHead
        index="02"
        eyebrow="Serviços"
        title="Projeto, interiores e acompanhamento de obra"
        titleId={TITLE_ID}
      />

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <article key={service.id} className={styles.card}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul className={styles.deliverables}>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.tools}>
        <p className={styles.toolsLabel}>Ferramentas</p>
        <ul className={styles.toolList}>
          {TOOLS.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
