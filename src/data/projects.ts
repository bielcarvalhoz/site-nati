import type { Project } from './types'

/* Portfólio. Conteúdo fictício para a primeira versão — trocar por projetos reais.
   Para plugar um projeto real: preencha os textos e aponte `cover` / `gallery` para
   imagens em src/assets/ (ex.: '/src/assets/ape-vila-mariana/cover.jpg'). Sem `cover`,
   o site desenha um placeholder determinístico a partir do `id`.
   TODO trocar: todos os itens abaixo. */
export const PROJECTS = [
  {
    id: 'apartamento-vila-mariana',
    title: 'Apartamento Vila Mariana',
    year: 2023,
    category: 'realizado',
    discipline: 'Residencial · Interiores',
    location: 'São Paulo, SP',
    area: '78 m²',
    summary: 'Reforma integral de um apartamento dos anos 1980 para um casal que trabalha em casa.',
    context:
      'Planta compartimentada, cozinha isolada e pouca luz natural no miolo. O casal precisava de dois postos de trabalho sem abrir mão de receber.',
    solution:
      'Integração da cozinha com a sala, marcenaria sob medida que esconde um home office e um painel ripado que leva luz ao corredor. Entrega com projeto executivo e acompanhamento de obra.',
  },
  {
    id: 'casa-cotia',
    title: 'Casa Cotia',
    year: 2022,
    category: 'realizado',
    discipline: 'Residencial',
    location: 'Cotia, SP',
    area: '210 m²',
    summary: 'Projeto de uma casa térrea em terreno de esquina, com pátio central.',
    context:
      'Terreno em aclive e exposto ao sol poente. A família queria áreas sociais amplas e privacidade em relação à rua.',
    solution:
      'Volume em "L" voltado para um pátio interno, cobertura com beiral generoso a oeste e brises de madeira. Projeto de arquitetura e interiores coordenado com a engenharia.',
  },
  {
    id: 'cafe-pinheiros',
    title: 'Café em Pinheiros',
    year: 2023,
    category: 'realizado',
    discipline: 'Comercial · Varejo',
    location: 'São Paulo, SP',
    area: '95 m²',
    summary: 'Identidade espacial de uma cafeteria de bairro, do balcão à fachada.',
    context:
      'Ponto pequeno, pé-direito baixo e necessidade de girar mesas rápido no horário de pico sem parecer apertado.',
    solution:
      'Balcão como âncora visual, espelho contínuo que dobra o pé-direito percebido, mobiliário modular e paleta de concreto, aço e madeira clara. Obra entregue em 9 semanas.',
  },
  {
    id: 'clinica-itaim',
    title: 'Clínica Odontológica Itaim',
    year: 2021,
    category: 'realizado',
    discipline: 'Comercial · Saúde',
    location: 'São Paulo, SP',
    area: '140 m²',
    summary: 'Projeto de quatro consultórios, recepção e áreas de apoio dentro das normas sanitárias.',
    context:
      'Laje corrida sem divisórias e exigências de fluxo (limpo/sujo), acústica entre consultórios e uma recepção que não intimidasse o paciente.',
    solution:
      'Setorização clara, forro acústico, revestimentos laváveis especificados por ambiente e uma recepção com marcenaria amadeirada e iluminação quente. Compatibilização com projetos elétrico e hidráulico.',
  },
  {
    id: 'cobertura-perdizes',
    title: 'Cobertura Perdizes',
    year: 2024,
    category: 'realizado',
    discipline: 'Residencial · Interiores',
    location: 'São Paulo, SP',
    area: '160 m²',
    summary: 'Interiores de uma cobertura duplex, com terraço integrado à área gourmet.',
    context:
      'Espaço entregue pela construtora sem personalidade, escada central mal aproveitada e terraço desconectado da sala.',
    solution:
      'Escada revestida em pedra com guarda-corpo de vidro, caixilhos ampliados para o terraço e uma cozinha que se fecha por painéis quando necessário. Curadoria de mobiliário e arte.',
  },
  {
    id: 'loja-santa-cecilia',
    title: 'Loja de roupas Santa Cecília',
    year: 2022,
    category: 'realizado',
    discipline: 'Comercial · Varejo',
    location: 'São Paulo, SP',
    area: '60 m²',
    summary: 'Projeto de uma loja-conceito de moda autoral em sobrado tombado.',
    context:
      'Imóvel histórico com restrições de intervenção, estrutura de madeira aparente e orçamento enxuto.',
    solution:
      'Araras e expositores autoportantes (nada fixado nas paredes originais), iluminação em trilho e provador central como peça escultórica. Intervenção 100 % reversível.',
  },
  {
    id: 'tfg-habitacao-heliopolis',
    title: 'TFG — Habitação social em Heliópolis',
    year: 2019,
    category: 'academico',
    discipline: 'Urbanismo · Habitação',
    location: 'São Paulo, SP',
    summary: 'Trabalho Final de Graduação: conjunto habitacional com comércio no térreo e espaços coletivos.',
    context:
      'Gleba pública subutilizada na borda da comunidade, demanda por moradia e por equipamentos de bairro.',
    solution:
      'Lâminas de 5 pavimentos com circulação externa, unidades flexíveis (1 a 3 dormitórios), térreo ativo com comércio e creche, e uma praça que costura o conjunto ao tecido existente.',
  },
  {
    id: 'pavilhao-ibirapuera',
    title: 'Pavilhão efêmero no Ibirapuera',
    year: 2018,
    category: 'academico',
    discipline: 'Concurso estudantil',
    location: 'São Paulo, SP',
    summary: 'Proposta premiada em concurso interno para um pavilhão temporário de exposições.',
    context:
      'Estrutura desmontável, montagem em até uma semana e reaproveitamento total das peças.',
    solution:
      'Módulo de andaimes tubulares e lonas tensionadas, fundação em blocos de concreto pré-moldado sem escavação, catálogo de peças pensado para remontagem em outros parques.',
  },
  {
    id: 'galpao-ferroviario',
    title: 'Requalificação de galpão ferroviário',
    year: 2018,
    category: 'academico',
    discipline: 'Patrimônio · Uso misto',
    location: 'Jundiaí, SP',
    summary: 'Estudo de reúso de um galpão ferroviário para mercado e espaço de trabalho compartilhado.',
    context:
      'Estrutura metálica histórica em bom estado, mas sem uso há décadas e desconectada do centro.',
    solution:
      'Inserção de um "edifício dentro do edifício" em madeira, preservando a nave e a leitura da estrutura original; mercado no térreo, coworking no mezanino.',
  },
  {
    id: 'centro-cultural-bairro',
    title: 'Centro cultural de bairro',
    year: 2017,
    category: 'academico',
    discipline: 'Equipamento público',
    location: 'São Paulo, SP',
    summary: 'Projeto de um pequeno centro cultural com biblioteca, oficinas e teatro de bolso.',
    context:
      'Terreno de esquina em bairro sem equipamentos culturais, orçamento público limitado.',
    solution:
      'Programa empilhado em três pavimentos com pátio coberto de acesso livre, fachada permeável em cobogós e um teatro de 80 lugares que também abre para a praça.',
  },
] as const satisfies readonly Project[]

export const REALIZADOS = PROJECTS.filter((p) => p.category === 'realizado')
export const ACADEMICOS = PROJECTS.filter((p) => p.category === 'academico')
