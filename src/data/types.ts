/* Shared shapes for the content in src/data/*. Kept minimal — one type per data file.
   Optional fields mean "may be absent" (exactOptionalPropertyTypes is on) — never
   assign `undefined` explicitly; omit the key. */

export type SiteContent = {
  /** First name / wordmark short form. */
  name: string
  /** Full professional name — used in <h1>, <title>, footer. */
  fullName: string
  role: string
  /** One-line value proposition shown in the hero. */
  tagline: string
  /** Supporting hero paragraph — the persuasive detail. */
  heroLead: string
  footerLine: string
  email: string
  phone?: string
  /** Digits only, no `+` or spaces — used to build the wa.me link. */
  whatsapp?: string
  city: string
  /** CAU/BR registration — the credential a prospective client checks. */
  cau?: string
  instagram?: string
  linkedin?: string
  /** Short first-person paragraphs for the "Sobre" section. */
  about: readonly string[]
}

export type ProjectCategory = 'realizado' | 'academico'

export type Project = {
  /** Unique, kebab-case. Used in the URL hash and as the placeholder-image seed. */
  id: string
  title: string
  year: number
  category: ProjectCategory
  /** "Residencial", "Comercial", "Interiores", "Urbanismo"… */
  discipline: string
  location?: string
  /** e.g. "78 m²". */
  area?: string
  /** One line for the project card. */
  summary: string
  /** The brief / problem — framed toward the outcome. */
  context: string
  /** What was done and the result. */
  solution: string
  /** Image path. Absent → a deterministic placeholder is rendered from `id`. */
  cover?: string
  /** Extra images. When present, must be non-empty. */
  gallery?: readonly string[]
}

export type JourneyEntry = {
  /** "2021 — hoje", "2018 — 2021". */
  period: string
  role: string
  org: string
  description: string
}

export type Service = {
  id: string
  title: string
  description: string
  deliverables: readonly string[]
}

export type Metric = {
  /** Display string, already formatted: "+80", "12.000 m²", "8 anos". */
  value: string
  label: string
}

export type Testimonial = {
  quote: string
  author: string
  /** "Cliente — reforma residencial, Pinheiros". */
  role: string
}
