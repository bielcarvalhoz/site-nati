import { titleIdFor, type SectionId } from '../lib/nav'

type Props = {
  sectionId: SectionId
  /** Two-digit section index, e.g. "01". */
  index: string
  eyebrow: string
  title: string
}

export default function SectionHead({ sectionId, index, eyebrow, title }: Props) {
  return (
    <div className="section-head">
      <span className="section-head__index" aria-hidden="true">
        {index}
      </span>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleIdFor(sectionId)}>{title}</h2>
    </div>
  )
}
