import type { JourneyEntry } from './types'

/* Linha do tempo profissional, do mais recente ao início. Datas e escritórios
   fictícios — trocar pelos reais (e manter a coerência com os números em metrics.ts).
   TODO trocar: períodos, nomes dos escritórios, ano da formação e do registro CAU. */
export const JOURNEY = [
  {
    period: '2022 — hoje',
    role: 'Arquiteta responsável',
    org: 'Ateliê próprio',
    description:
      'Projetos residenciais e comerciais do estudo à obra, com coordenação de fornecedores e acompanhamento de canteiro.',
  },
  {
    period: '2019 — 2022',
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
    period: '2017',
    role: 'Formação e registro CAU',
    org: 'Faculdade de Arquitetura e Urbanismo',
    description:
      'Graduação em Arquitetura e Urbanismo, com ênfase em projeto. Registro profissional no CAU/BR em seguida.',
  },
  {
    period: '2015 — 2017',
    role: 'Estágio em arquitetura',
    org: 'Escritório de reformas e interiores',
    description:
      'Durante a graduação: levantamentos, maquetes de estudo e apoio à documentação de obra.',
  },
] as const satisfies readonly JourneyEntry[]
