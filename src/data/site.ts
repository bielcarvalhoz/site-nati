import type { SiteContent } from './types'

/* Dados institucionais do site. Edite aqui — nada de texto fixo nos componentes.
   Nome confirmado: Natália Martinelli Damasceno.
   TODO trocar (fictício por enquanto): e-mail, telefone, WhatsApp, CAU, @ das redes, cidade se for o caso. */
export const SITE = {
  name: 'Natália',
  fullName: 'Natália Martinelli Damasceno',
  role: 'Arquiteta e Urbanista',

  tagline:
    'Arquitetura e design de interiores para casas, apartamentos e comércio — do primeiro estudo à obra entregue.',
  heroLead:
    'Do primeiro estudo à obra entregue, conduzo cada projeto com processo definido, orçamento previsível e projeto executivo detalhado — para a obra sair sem surpresa.',

  footerLine: 'Arquitetura residencial, comercial e de interiores — do conceito à obra.',

  email: 'contato@nataliamd.arq.br',
  phone: '+55 11 4002-8922',
  whatsapp: '5511940028922',
  city: 'São Paulo, SP',
  cau: 'CAU/BR A000000-0',
  instagram: 'https://instagram.com/nataliamd.arq',
  linkedin: 'https://linkedin.com/in/nataliamd',

  about: [
    'Sou arquiteta e urbanista com atuação em projeto e acompanhamento de obra. Trabalho com residências, espaços comerciais e reformas, sempre partindo de como as pessoas realmente usam o espaço.',
    'Meu processo é próximo e transparente: você acompanha cada decisão, do layout à especificação de acabamentos, e recebe um projeto pronto para executar, sem surpresa de orçamento.',
    'Ao longo dos anos passei por escritórios de portes diferentes, o que me deu repertório tanto para o projeto autoral quanto para a coordenação com engenharia, marcenaria e fornecedores.',
  ],
} as const satisfies SiteContent
