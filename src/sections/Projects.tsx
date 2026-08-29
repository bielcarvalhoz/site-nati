import { useCallback, useEffect, useRef, useState } from 'react'
import { ACADEMICOS, REALIZADOS } from '../data/projects'
import type { Project, ProjectCategory } from '../data/types'
import { SECTION, titleIdFor } from '../lib/nav'
import Placeholder from '../components/Placeholder'
import SectionHead from '../components/SectionHead'
import styles from './Projects.module.css'

const DIALOG_TITLE_ID = 'projeto-dialog-title'

function ProjectImage({ project }: { project: Project }) {
  if (project.cover) {
    return <img src={project.cover} alt={project.title} loading="lazy" />
  }
  return <Placeholder seed={project.id} label={project.title} />
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('realizado')
  const [selected, setSelected] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const list = filter === 'realizado' ? REALIZADOS : ACADEMICOS

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (selected && !dlg.open) dlg.showModal()

    const onClose = () => {
      setSelected(null)
      lastTrigger.current?.focus()
      lastTrigger.current = null
    }
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [selected])

  return (
    <section id={SECTION.projetos} className="section container" aria-labelledby={titleIdFor(SECTION.projetos)}>
      <SectionHead
        sectionId={SECTION.projetos}
        index="01"
        eyebrow="Projetos"
        title="Projetos selecionados"
      />

      <div className={styles.filter} role="group" aria-label="Filtrar projetos">
        <button
          type="button"
          className={styles.filterBtn}
          aria-pressed={filter === 'realizado'}
          onClick={() => setFilter('realizado')}
        >
          Profissionais <span className={styles.count}>{REALIZADOS.length}</span>
        </button>
        <button
          type="button"
          className={styles.filterBtn}
          aria-pressed={filter === 'academico'}
          onClick={() => setFilter('academico')}
        >
          Acadêmicos <span className={styles.count}>{ACADEMICOS.length}</span>
        </button>
      </div>

      <ul className={styles.grid}>
        {list.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className={styles.card}
              aria-haspopup="dialog"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget
                setSelected(project)
              }}
            >
              <span className={styles.thumb}>
                <ProjectImage project={project} />
              </span>
              <span className={styles.cardTitle}>{project.title}</span>
              <span className={styles.cardMeta}>
                {project.year} · {project.discipline}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={DIALOG_TITLE_ID}
        onClick={(e) => {
          if (e.target === dialogRef.current) close()
        }}
      >
        {selected ? (
          <div className={styles.dialogScroll}>
            <button type="button" className={styles.dialogClose} onClick={close} aria-label="Fechar">
              ✕
            </button>

            {selected.gallery && selected.gallery.length > 0 ? (
              <div className={styles.gallery}>
                {selected.gallery.map((src) => (
                  <img key={src} src={src} alt={`${selected.title} — imagem`} />
                ))}
              </div>
            ) : (
              <div className={styles.dialogMedia}>
                <ProjectImage project={selected} />
              </div>
            )}

            <div className={styles.dialogBody}>
              <p className="eyebrow">
                {selected.category === 'realizado' ? 'Projeto profissional' : 'Trabalho acadêmico'}
              </p>
              <h3 id={DIALOG_TITLE_ID} className={styles.dialogTitle}>
                {selected.title}
              </h3>
              <div className={styles.dialogTags}>
                <span>{selected.year}</span>
                <span>{selected.discipline}</span>
                {selected.location ? <span>{selected.location}</span> : null}
                {selected.area ? <span>{selected.area}</span> : null}
              </div>
              <div className={styles.dialogText}>
                <div>
                  <h4>Contexto</h4>
                  <p>{selected.context}</p>
                </div>
                <div>
                  <h4>Partido</h4>
                  <p>{selected.solution}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  )
}
