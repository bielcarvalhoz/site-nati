import type { Service } from './types'

/* Serviços oferecidos. Ajuste os textos e entregáveis conforme a prática real. */
export const SERVICES = [
  {
    id: 'projeto-arquitetura',
    title: 'Projeto de arquitetura',
    description:
      'Do estudo preliminar ao projeto executivo, para construir do zero, ampliar ou legalizar.',
    deliverables: [
      'Estudo preliminar e implantação',
      'Anteprojeto e aprovações',
      'Projeto executivo e detalhamento',
      'Compatibilização com engenharia',
    ],
  },
  {
    id: 'design-interiores',
    title: 'Design de interiores',
    description:
      'Layout, marcenaria, iluminação e acabamentos pensados para a rotina de quem vai usar o espaço.',
    deliverables: [
      'Estudo de layout e circulação',
      'Projeto de marcenaria sob medida',
      'Projeto luminotécnico',
      'Caderno de acabamentos e mobiliário',
    ],
  },
  {
    id: 'reforma',
    title: 'Reforma',
    description:
      'Reformas residenciais e comerciais com escopo, prazo e orçamento definidos antes de começar.',
    deliverables: [
      'Levantamento e diagnóstico',
      'Projeto de demolir e construir',
      'Detalhamento e especificações',
      'Planilha de orçamento para cotação',
    ],
  },
  {
    id: 'acompanhamento-obra',
    title: 'Acompanhamento de obra',
    description:
      'Visitas periódicas ao canteiro para garantir que o que foi projetado é o que se constrói.',
    deliverables: [
      'Visitas técnicas e relatórios',
      'Esclarecimento de detalhes com a equipe',
      'Coordenação de fornecedores e marcenaria',
      'Conferência de entrega',
    ],
  },
] as const satisfies readonly Service[]

/* Ferramentas de projeto e representação. */
export const TOOLS = [
  'AutoCAD',
  'Revit',
  'SketchUp',
  'Enscape',
  'Lumion',
  'Adobe Photoshop',
  'Adobe InDesign',
  'Excel / orçamento',
] as const satisfies readonly string[]
