import Layout from './components/Layout'
import { SITE } from './data/site'
import { CONTACT_ID, TOP_ID } from './lib/nav'
import styles from './App.module.css'

/* Section bodies below the headers are stubs — real content lands in Step 3.
   Section headers, ids, and copy are final as of Onda 1.1. */
export default function App() {
  return (
    <Layout>
      <section id={TOP_ID} className={`container ${styles.hero}`}>
        <p className="eyebrow">{SITE.role}</p>
        <h1>{SITE.fullName}</h1>
        <p className={styles.heroLede}>{SITE.tagline}</p>
        <p className={styles.heroLead}>{SITE.heroLead}</p>
      </section>

      <section id="projetos" className="section container">
        <div className="section-head">
          <span className="section-head__index" aria-hidden="true">
            01
          </span>
          <p className="eyebrow">Projetos</p>
          <h2>Projetos selecionados</h2>
        </div>
        <p className={styles.stub}>
          Projetos residenciais e comerciais entregues. Os trabalhos acadêmicos ficam
          num bloco à parte, mais abaixo.
        </p>
      </section>

      <section id="servicos" className="section container">
        <div className="section-head">
          <span className="section-head__index" aria-hidden="true">
            02
          </span>
          <p className="eyebrow">Serviços</p>
          <h2>Projeto, interiores e acompanhamento de obra</h2>
        </div>
        <p className={styles.stub}>O que você pode contratar e como cada etapa funciona.</p>
      </section>

      <section id="trajetoria" className="section container">
        <div className="section-head">
          <span className="section-head__index" aria-hidden="true">
            03
          </span>
          <p className="eyebrow">Trajetória</p>
          <h2>Formação e experiência</h2>
        </div>
        <p className={styles.stub}>Linha do tempo dos escritórios e projetos ao longo dos anos.</p>
      </section>

      <section id="sobre" className="section container">
        <div className="section-head">
          <span className="section-head__index" aria-hidden="true">
            04
          </span>
          <p className="eyebrow">Sobre</p>
          <h2>Quem assina os projetos</h2>
        </div>
        <div className={styles.prose}>
          {SITE.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id={CONTACT_ID} className="section container">
        <div className="section-head">
          <span className="section-head__index" aria-hidden="true">
            05
          </span>
          <p className="eyebrow">Contato</p>
          <h2>Vamos conversar sobre o seu projeto</h2>
        </div>
        <p className={styles.stub}>Formulário de contato e canais diretos entram no próximo passo.</p>
      </section>
    </Layout>
  )
}
