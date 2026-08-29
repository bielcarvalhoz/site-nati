// WCAG contrast check for the design-token colour pairs that carry text.
// Fails (exit 1) if any text pair is below AA 4.5:1.
const hex = (h) => {
  const n = parseInt(h.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const lin = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => {
  const la = L(hex(a)) + 0.05
  const lb = L(hex(b)) + 0.05
  return (Math.max(la, lb) / Math.min(la, lb))
}

const bg = '#faf9f6'
const sunken = '#f2f1ec'
const T = {
  '--ink': '#191917',
  '--ink-soft': '#45443f',
  '--muted': '#5c5a51',
  '--accent': '#a8572f',
}

// [label, fg, bg, minimum]  — minimum 4.5 for body text, 3.0 for large-only marks
const CHECKS = [
  ['ink on bg', T['--ink'], bg, 4.5],
  ['ink-soft on bg', T['--ink-soft'], bg, 4.5],
  ['muted on bg', T['--muted'], bg, 4.5],
  ['muted on bg-sunken', T['--muted'], sunken, 4.5],
  ['accent on bg (large marks only)', T['--accent'], bg, 3.0],
]

let failed = false
for (const [label, fg, b, min] of CHECKS) {
  const r = ratio(fg, b)
  const ok = r >= min
  if (!ok) failed = true
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1  (min ${min})  ${label}`)
}
process.exit(failed ? 1 : 0)
