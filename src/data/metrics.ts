import type { Metric } from './types'

/* Números de prova social. Valores fictícios — trocar pelos reais antes de publicar.
   TODO trocar: todos os valores. */
export const METRICS = [
  { value: '+80', label: 'projetos entregues' },
  { value: '12.000 m²', label: 'projetados' },
  { value: '8 anos', label: 'de atuação' },
  { value: '100%', label: 'das obras acompanhadas' },
] as const satisfies readonly Metric[]
