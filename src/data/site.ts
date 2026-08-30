import type { SiteContent } from './types'

/* Dados do site. Fonte: currículo/portfólio da Natália (src/assets/portfolio-antigo.pdf).
   TODO: empresa atual dela (hoje entra como "assistente técnica de arquitetura" sem
   nome do escritório — ela vai passar). */
export const SITE = {
  name: 'Natália',
  fullName: 'Natália Martinelli Damasceno',
  role: 'Arquitetura e Urbanismo',

  tagline:
    'Projeto de interiores, detalhamento e luminotécnica — do estudo de layout ao caderno de acabamentos.',
  heroLead:
    'Finalista de Arquitetura e Urbanismo na São Judas Tadeu (2026), já atuando como assistente técnica de arquitetura. Abaixo, seis projetos autorais do curso — do partido ao detalhamento.',

  footerLine:
    'Arquitetura e Urbanismo · projeto de interiores, detalhamento e luminotécnica.',

  email: 'natalia.m.damasceno0511@gmail.com',
  phone: '+55 11 95393-8834',
  whatsapp: '5511953938834',
  city: 'Osasco, SP',
  linkedin: 'https://www.linkedin.com/in/nat%C3%A1lia-damasceno/',

  about: [
    'Sou estudante de Arquitetura e Urbanismo na Universidade São Judas Tadeu, concluindo em 2026, e já atuo como assistente técnica de arquitetura no dia a dia de escritório.',
    'Meu interesse é projeto de interiores e detalhamento — marcenaria, especificação de acabamentos e luminotécnica, essa última puxada pela passagem pelo Grupo Luminae, com projetos luminotécnicos para residências e comércio.',
    'Os projetos deste portfólio são acadêmicos e autorais, de interiores a habitação de interesse social. Em cada um eu levo o processo do partido ao detalhamento construtivo e às renderizações.',
  ],
} as const satisfies SiteContent
