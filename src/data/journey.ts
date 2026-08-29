import type { JourneyEntry } from './types'

/* Linha do tempo profissional. Datas e escritórios fictícios — trocar pelos reais.
   TODO trocar: períodos, nomes dos escritórios, cidade da formação, ano do registro CAU. */
export const JOURNEY = [
  {
    period: '2021 — hoje',
    role: 'Arquiteta responsável',
    org: 'Ateliê próprio',
    description:
      'Projetos residenciais e comerciais do estudo à obra, com coordenação de fornecedores e acompanhamento de canteiro.',
  },
  {
    period: '2019 — 2021',
    role: 'Arquiteta plena',
    org: 'Escritório de arquitetura corporativa',
    description:
      'Projetos executivos de escritórios e varejo, compatibilização com engenharia e gestão de cronograma de obra.',
  },
  {
    period: '2017 — 2019',
    role: 'Arquiteta júnior',
    org: 'Escritório de residências de alto padrão',
    description:
      'Desenvolvimento de anteprojetos e detalhamento de interiores, marcenaria e iluminação.',
  },
  {
    period: '2016 — 2017',
    role: 'Estágio em arquitetura',
    org: 'Escritório de reformas e interiores',
    description:
      'Levantamentos, maquetes de estudo e apoio à documentação de obra.',
  },
  {
    period: '2015',
    role: 'Formação e registro CAU',
    org: 'Faculdade de Arquitetura e Urbanismo',
    description:
      'Graduação em Arquitetura e Urbanismo, com ênfase em projeto. Registro profissional no CAU/BR em seguida.',
  },
] as const satisfies readonly JourneyEntry[]
