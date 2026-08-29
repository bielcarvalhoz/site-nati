import type { Testimonial } from './types'

/* Depoimentos de clientes. Textos fictícios — substituir por depoimentos reais
   (com autorização de uso do nome). TODO trocar: todos os itens. */
export const TESTIMONIALS = [
  {
    quote:
      'A Natália entendeu como a gente vive antes de desenhar qualquer coisa. A obra seguiu o projeto quase sem ajuste, e o orçamento fechou onde ela tinha previsto.',
    author: 'Marina e Rafael',
    role: 'Reforma residencial, Vila Mariana',
  },
  {
    quote:
      'Precisávamos abrir o café rápido e sem retrabalho. O projeto veio detalhado o suficiente para os fornecedores cotarem direto, e ela acompanhou a obra toda.',
    author: 'Camila Duarte',
    role: 'Cliente — cafeteria, Pinheiros',
  },
  {
    quote:
      'Contratamos pelo projeto da casa e ficamos pelo cuidado com a execução. Cada detalhe de marcenaria e iluminação foi conferido no canteiro.',
    author: 'Família Nogueira',
    role: 'Casa Cotia',
  },
] as const satisfies readonly Testimonial[]
