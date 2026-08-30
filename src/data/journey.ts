import type { JourneyEntry } from './types'

/* Linha do tempo, do mais recente ao início. Fonte: src/assets/portfolio-antigo.pdf.
   TODO: nome do escritório atual (entra hoje como "Escritório de arquitetura"). */
export const JOURNEY = [
  {
    period: '2025 — hoje',
    role: 'Assistente técnica de arquitetura',
    org: 'Escritório de arquitetura',
    description:
      'Apoio ao desenvolvimento de projetos no dia a dia de escritório: desenho técnico, detalhamento e compatibilização.',
  },
  {
    period: '2025',
    role: 'Estágio em projetos',
    org: 'BP8 Construtora e Incorporadora',
    description:
      'Apoio ao desenvolvimento de projetos de arquitetura junto à equipe de incorporação.',
  },
  {
    period: '2023 — 2025',
    role: 'Estágio em projetos luminotécnicos',
    org: 'Grupo Luminae Energia',
    description:
      'Cálculo e especificação de luminárias e fita de LED e integração da luz ao projeto de arquitetura, para residências e comércio.',
  },
  {
    period: '2022 — 2026',
    role: 'Graduação em Arquitetura e Urbanismo',
    org: 'Universidade São Judas Tadeu',
    description:
      'Ênfase em projeto. Seis projetos autorais ao longo do curso, de interiores a habitação de interesse social.',
  },
  {
    period: '2022 — 2023',
    role: 'Assistente administrativo',
    org: 'Edamatec Informática',
    description: 'Departamento comercial.',
  },
  {
    period: '2020 — 2021',
    role: 'Jovem aprendiz',
    org: 'Banco Bradesco',
    description: 'Área de Recursos Humanos.',
  },
] as const satisfies readonly JourneyEntry[]
