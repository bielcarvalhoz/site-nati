/* Deterministic stand-in for a project photo until real images are added.
   Same `seed` always yields the same concrete-tone panel, so the grid looks
   intentional rather than random. Drop a real `cover` on the project to replace it. */

const TONES = ['#c9c5bd', '#b8b3a8', '#a7a196', '#d3cfc7', '#9c968b', '#bdb8ac']

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

type Props = {
  seed: string
  /** Accessible label — usually the project title. */
  label: string
  className?: string
}

export default function Placeholder({ seed, label, className }: Props) {
  const h = hash(seed)
  // modulo of a non-empty literal array — always in bounds
  const a = TONES[h % TONES.length]!
  const b = TONES[(h >> 8) % TONES.length]!
  const angle = h % 180
  const gid = `ph-${(h >>> 0).toString(36)}`

  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} — imagem ilustrativa`}
    >
      <defs>
        <linearGradient id={gid} gradientTransform={`rotate(${angle} 0.5 0.5)`}>
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <rect x="0.5" y="0.5" width="399" height="299" fill="none" stroke="rgba(25,25,23,0.12)" />
      <rect x="376" y="276" width="16" height="16" fill="#a8572f" />
    </svg>
  )
}
