type Props = {
  /** Two-digit section index, e.g. "01". Omit for the hero. */
  index?: string
  eyebrow: string
  title: string
  /** id for the <h2>, so the <section> can point aria-labelledby at it. */
  titleId: string
}

export default function SectionHead({ index, eyebrow, title, titleId }: Props) {
  return (
    <div className="section-head">
      {index ? (
        <span className="section-head__index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
    </div>
  )
}
