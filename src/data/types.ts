/* Shared shapes for the content in src/data/*. Kept minimal — one type per data file. */

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
