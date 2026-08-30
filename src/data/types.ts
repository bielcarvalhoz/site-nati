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
  linkedin?: string
  /** Short first-person paragraphs for the "Sobre" section. */
  about: readonly string[]
}

export type Project = {
  /** Unique, kebab-case. Used in the URL hash and as the placeholder-image seed. */
  id: string
  title: string
  year: number
  /** Course it came from, e.g. "Projeto de Ambientes e Interiores". */
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
  /** Card image path. Absent → a deterministic placeholder is rendered from `id`. */
  cover?: string
  /** Dialog images, each with its own alt. Tuple type forbids an empty gallery. */
  gallery?: readonly [GalleryImage, ...GalleryImage[]]
}

export type GalleryImage = {
  src: string
  /** What the image actually shows — not "<project> image". */
  alt: string
}

export type JourneyEntry = {
  /** "2021 — hoje", "2018 — 2021". */
  period: string
  role: string
  org: string
  description: string
  /** Company logo path (public/trajetoria/*). Absent → the timeline dot is used. */
  logo?: string
}

export type Service = {
  id: string
  title: string
  description: string
  deliverables: readonly string[]
}

export type Metric = {
  /** Display string, already formatted: "6", "2026", "2 anos". */
  value: string
  label: string
}
