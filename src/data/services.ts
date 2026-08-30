import type { Service } from './types'

/* "Competências" na UI. Baseado nos projetos do curso e na experiência de estágio
   (Grupo Luminae — luminotécnica; BP8 — projetos). */
export const SERVICES = [
  {
    id: 'interiores',
    title: 'Projeto de interiores',
    description:
      'Estudo de layout e circulação, integração de ambientes e caderno de acabamentos, do primeiro partido à especificação final.',
    deliverables: [
      'Estudo de layout e fluxos',
      'Integração de ambientes',
      'Especificação de acabamentos',
      'Estudo de mobiliário',
    ],
  },
  {
    id: 'detalhamento',
    title: 'Detalhamento construtivo',
    description:
      'Marcenaria sob medida, bancadas, gabinetes e vistas em escala — o desenho que a obra e o marceneiro executam.',
    deliverables: [
      'Marcenaria em MDF',
      'Vistas e cortes 1:20',
      'Detalhe de gabinetes e bancadas',
      'Compatibilização de medidas',
    ],
  },
  {
    id: 'luminotecnica',
    title: 'Projeto luminotécnico',
    description:
      'Cálculo, especificação de luminárias e fita de LED e integração da luz ao projeto — repertório do Grupo Luminae.',
    deliverables: [
      'Cálculo e níveis de iluminância',
      'Especificação de luminárias',
      'Fita de LED e sancas',
      'Simulação em DIALux EVO',
    ],
  },
  {
    id: 'conforto-habitacao',
    title: 'Conforto ambiental e habitação',
    description:
      'Carta solar, ventilação, brises e cobogós; implantação e unidades para habitação de interesse social dentro da legislação.',
    deliverables: [
      'Carta solar e rosa dos ventos',
      'Brises e cobogós',
      'Implantação e recuos',
      'Unidades HIS / HMP',
    ],
  },
] as const satisfies readonly Service[]

/* Softwares de projeto e representação. */
export const TOOLS = [
  'AutoCAD',
  'Revit',
  'SketchUp',
  'Lumion',
  'DIALux EVO',
] as const satisfies readonly string[]
