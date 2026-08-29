/** Every scrollable section anchor on the page, in document order.
    Each value MUST match an `id` on a <section> in App.tsx — the union makes a
    one-sided rename a compile error instead of a dead nav link. */
export type SectionId =
  | 'topo'
  | 'projetos'
  | 'servicos'
  | 'trajetoria'
  | 'sobre'
  | 'contato'

export type NavItem = { id: SectionId; label: string }

/** Hero anchor (brand click target). */
export const TOP_ID = 'topo' satisfies SectionId
/** Contact anchor (header + footer CTA target). */
export const CONTACT_ID = 'contato' satisfies SectionId
/** Skip-link target on <main>. Not a section. */
export const CONTENT_ID = 'conteudo'

/** Items shown in the header nav, in document order. */
export const NAV_ITEMS = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'sobre', label: 'Sobre' },
] as const satisfies readonly NavItem[]
