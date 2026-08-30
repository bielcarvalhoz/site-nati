/** Every scrollable section anchor on the page.
    Consumed by both the <section id> and the nav link, so a one-sided rename is
    a compile error, not a dead link. */
export type SectionId = 'topo' | 'projetos' | 'trajetoria' | 'sobre' | 'servicos' | 'contato'

/** Use these instead of bare string literals for section ids. */
export const SECTION = {
  topo: 'topo',
  projetos: 'projetos',
  trajetoria: 'trajetoria',
  sobre: 'sobre',
  servicos: 'servicos',
  contato: 'contato',
} as const satisfies Record<SectionId, SectionId>

export const TOP_ID = SECTION.topo
export const CONTACT_ID = SECTION.contato
/** Skip-link target on <main>. Not a section. */
export const CONTENT_ID = 'conteudo'

/** id for a section's <h2>, so the <section> can point aria-labelledby at it. */
export const titleIdFor = (id: SectionId) => `${id}-title`

export type NavItem = { id: SectionId; label: string }

/** Items shown in the header nav, in document order. */
export const NAV_ITEMS = [
  { id: SECTION.projetos, label: 'Projetos' },
  { id: SECTION.trajetoria, label: 'Trajetória' },
  { id: SECTION.sobre, label: 'Sobre' },
  { id: SECTION.servicos, label: 'Competências' },
] as const satisfies readonly NavItem[]
