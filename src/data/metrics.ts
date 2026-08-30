import type { Metric } from './types'

/* Números de credibilidade — todos verificáveis no portfólio e na trajetória. */
export const METRICS = [
  { value: '6', label: 'projetos autorais no curso' },
  { value: '2026', label: 'conclusão · São Judas Tadeu' },
  { value: '2 anos', label: 'em projeto luminotécnico' },
] as const satisfies readonly Metric[]
