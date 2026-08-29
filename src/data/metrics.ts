import type { Metric } from './types'

/* Números de credibilidade — devem bater com a linha do tempo em journey.ts.
   Valores fictícios — trocar pelos reais antes de publicar. TODO trocar. */
export const METRICS = [
  { value: 'Mais de 80', label: 'projetos entregues' },
  { value: '12.000 m²', label: 'projetados' },
  { value: 'Mais de 8 anos', label: 'de atuação' },
] as const satisfies readonly Metric[]
