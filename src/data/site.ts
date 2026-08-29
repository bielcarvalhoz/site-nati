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
    'Cada projeto nasce de como as pessoas usam o espaço e chega ao canteiro com desenho executivo completo, para a obra construir exatamente o que foi projetado.',

  footerLine: 'Arquitetura residencial, comercial e de interiores — do conceito à obra.',

  email: 'contato@nataliamd.arq.br',
  phone: '+55 11 3000-0000',
  whatsapp: '5511930000000',
  city: 'São Paulo, SP',
  cau: 'CAU/BR A000000-0',
  instagram: 'https://instagram.com/nataliamd.arq',
  linkedin: 'https://linkedin.com/in/nataliamd',

  about: [
    'Sou arquiteta e urbanista com atuação em projeto e acompanhamento de obra. Trabalho com residências, espaços comerciais e reformas, sempre partindo de como as pessoas realmente usam o espaço.',
    'Trabalho lado a lado com quem vai morar ou operar o espaço, do primeiro layout à última especificação de acabamento. O cliente entende cada decisão porque participou dela.',
    'Ao longo dos anos passei por escritórios de portes diferentes, o que me deu repertório tanto para o projeto autoral quanto para a coordenação com engenharia, marcenaria e fornecedores.',
  ],
} as const satisfies SiteContent
