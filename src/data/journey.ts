import type { JourneyEntry } from './types'

/* Linha do tempo, do mais recente ao início.
   Fontes: LinkedIn (experiência) + src/assets/portfolio-antigo.pdf.
   Logos em public/trajetoria/ — baixados do LinkedIn, exibidos em escala de cinza. */
export const JOURNEY = [
  {
    period: '2026 — hoje',
    role: 'Assistente de arquitetura',
    org: 'Lidera Empreendimentos',
    logo: '/trajetoria/lidera.jpg',
    description:
      'Desenvolvimento e compatibilização de projetos de arquitetura, do pré-executivo à aprovação, junto às equipes de projeto e incorporação.',
  },
  {
    period: '2025 — hoje',
    role: 'Estágio em projetos e incorporação',
    org: 'Lidera Empreendimentos',
    logo: '/trajetoria/lidera.jpg',
    description:
      'Apoio à concepção de produtos e a estudos de viabilidade, desenhos técnicos, análise de material de vendas e acompanhamento de cronogramas.',
  },
  {
    period: '2025',
    role: 'Estágio em projetos',
    org: 'BP8 Construtora',
    logo: '/trajetoria/bp8.jpg',
    description:
      'Coordenação e compatibilização de projetos — arquitetura, fundação, elétrica e hidráulica — e reuniões técnicas com projetistas, do pré-executivo ao licenciamento.',
  },
  {
    period: '2023 — 2025',
    role: 'Estágio em projetos luminotécnicos',
    org: 'Grupo Luminae Energia',
    logo: '/trajetoria/luminae.jpg',
    description:
      'Projetos luminotécnicos e de eficiência energética em DIALux EVO, com orçamentos, propostas comerciais e levantamentos em campo.',
  },
  {
    period: '2022 — 2026',
    role: 'Graduação em Arquitetura e Urbanismo',
    org: 'Universidade São Judas Tadeu',
    logo: '/trajetoria/saojudas.jpg',
    description:
      'Ênfase em projeto. Seis projetos autorais ao longo do curso, de interiores a habitação de interesse social.',
  },
  {
    period: '2022 — 2023',
    role: 'Assistente administrativo',
    org: 'Edamatec Tecnologia',
    logo: '/trajetoria/edamatec.jpg',
    description: 'Atendimento ao cliente, prospecção de clientes e controle de documentos administrativos.',
  },
  {
    period: '2020 — 2021',
    role: 'Jovem aprendiz',
    org: 'Banco Bradesco',
    logo: '/trajetoria/bradesco.jpg',
    description:
      'Conferência e fluxo de documentos, controle de malotes entre unidades e apoio às rotinas do setor.',
  },
] as const satisfies readonly JourneyEntry[]
