import type { Project } from './types'

/* Projetos autorais do curso de Arquitetura e Urbanismo (São Judas Tadeu).
   Fonte: src/assets/portfolio-antigo.pdf. Ordem = curadoria do próprio portfólio.
   Sem `cover`/`gallery` o site desenha um placeholder determinístico a partir do `id`;
   para usar imagens reais, exporte as pranchas/renders para src/assets/<id>/ e aponte
   `cover` e `gallery` para elas. */
export const PROJECTS = [
  {
    id: 'casa-raiza-costa',
    title: 'Casa Raíza Costa',
    year: 2023,
    discipline: 'Interiores · residencial',
    location: 'Higienópolis, São Paulo',
    area: '270 m²',
    summary:
      'Reforma de um apartamento de 270 m² em Higienópolis para a cozinheira e apresentadora Raíza Costa e a família.',
    context:
      'Projeto da disciplina de Projeto de Ambientes e Interiores. As mudanças precisavam preservar a personalidade e o bem-estar dos moradores, e abrir espaço para um escritório com privacidade e isolamento acústico — resolvido no quarto mais afastado da área social, que também recebe os hóspedes.',
    solution:
      'Área social em conceito aberto, integrando cozinha, sala de jantar e sala de estar, para que a anfitriã interaja com os convidados mesmo cozinhando. Parte da adega passa a despensa no antigo quarto de serviço; a cozinha, de frente para ela, ganha armários e prateleiras até o teto. Detalhamento de marcenaria e vistas 1:20 de banheiro e cozinha, mais renderizações de todos os ambientes.',
    cover: '/projetos/casa-raiza-costa/cover.jpg',
    gallery: [
      {
        src: '/projetos/casa-raiza-costa/cover.jpg',
        alt: 'Render da sala de estar integrada, com sofá claro, poltrona amarela e piso de madeira',
      },
      {
        src: '/projetos/casa-raiza-costa/02.jpg',
        alt: 'Render da cozinha e da despensa, com marcenaria amarela e papel de parede floral',
      },
      {
        src: '/projetos/casa-raiza-costa/03.jpg',
        alt: 'Render do escritório, com bancada de madeira, sofá e painel de quadros',
      },
    ],
  },
  {
    id: 'edificio-cdhu',
    title: 'Edifício habitacional CDHU',
    year: 2023,
    discipline: 'Habitação social',
    location: 'Av. Corifeu de Azevedo Marques, São Paulo',
    summary:
      'Edifício de habitação social com apartamentos de organização espelhada em terreno irregular.',
    context:
      'Projeto da disciplina de Materiais, Técnicas e Tecnologias de Construção. O terreno é irregular e em aclive, e o projeto precisa atender à Lei Municipal nº 13.885/04 (recuo mínimo de 5 m) e garantir acessibilidade.',
    solution:
      'Plantas espelhadas para aproveitar a área e simplificar execução e manutenção. Os blocos são desalinhados para minimizar cortes no solo e os conjuntos, elevados 3 m em relação à rua. Quadra e playground vão para a frente do terreno, pela luz natural; uma plataforma elevatória ao lado da escada resolve o acesso.',
    cover: '/projetos/edificio-cdhu/cover.jpg',
    gallery: [
      {
        src: '/projetos/edificio-cdhu/cover.jpg',
        alt: 'Desenho de elevação do edifício de cinco pavimentos, com os dois blocos e a caixa de escada central',
      },
      {
        src: '/projetos/edificio-cdhu/02.jpg',
        alt: 'Implantação do conjunto, com blocos desalinhados e quadra e playground na frente do terreno',
      },
    ],
  },
  {
    id: 'pavilhao-exposicoes',
    title: 'Pavilhão de exposições',
    year: 2023,
    discipline: 'Estruturas · institucional',
    location: 'Tatuapé, São Paulo',
    area: 'terreno de 122 × 88 m',
    summary:
      'Centro de exposições no Tatuapé, com uma passarela treliçada de ligação direta ao metrô.',
    context:
      'Projeto da disciplina de Sistemas Estruturais e Construtivos. O terreno de esquina fica entre a Rua Melo Peixoto e a Rua Dr. Coryntho Baldoíno Costa, a um quarteirão do Metrô Carrão.',
    solution:
      'Uma passarela coberta em aço treliçado (15 × 5 m) liga o metrô ao centro expositivo, com catracas de controle na chegada. A estrutura combina viga vagão, viga treliçada, cabos de aço e concreto armado, com vedações em vidro laminado temperado.',
    cover: '/projetos/pavilhao-exposicoes/cover.jpg',
    gallery: [
      {
        src: '/projetos/pavilhao-exposicoes/cover.jpg',
        alt: 'Render do interior sob a cúpula de vidro e estrutura metálica ramificada',
      },
      {
        src: '/projetos/pavilhao-exposicoes/02.jpg',
        alt: 'Render da fachada externa curva, revestida em painéis claros',
      },
      {
        src: '/projetos/pavilhao-exposicoes/03.jpg',
        alt: 'Render do pátio coberto, com pergolado de vegetação e assentos',
      },
    ],
  },
  {
    id: 'studio-pinheiros',
    title: 'Studio em Pinheiros',
    year: 2024,
    discipline: 'Interiores · 24 m²',
    location: 'Pinheiros, São Paulo',
    area: '24 m²',
    summary:
      'Studio de 24 m² com layout flexível que alterna entre uso residencial e de trabalho.',
    context:
      'Projeto da disciplina de Realidade Contemporânea. Em 24 m², o mesmo espaço precisa servir bem ao trabalho e à vida cotidiana, com conversão fácil entre os dois usos.',
    solution:
      'Móveis inteligentes, retráteis e multifuncionais liberam área ao longo do dia. Em vez de um canto fixo de home office, o posto de trabalho se distribui pela habitação. Os ambientes de descanso e convívio são desenhados para promover calma e bem-estar.',
    cover: '/projetos/studio-pinheiros/cover.jpg',
    gallery: [
      {
        src: '/projetos/studio-pinheiros/cover.jpg',
        alt: 'Maquete eletrônica do studio de 24 m² em quatro vistas isométricas seccionadas',
      },
    ],
  },
  {
    id: 'escola-sao-francisco-do-sul',
    title: 'Escola em São Francisco do Sul',
    year: 2024,
    discipline: 'Conforto ambiental',
    location: 'São Francisco do Sul, SC',
    summary:
      'Escola em três blocos articulada por uma parede de cobogós, projetada a partir do clima local.',
    context:
      'Projeto da disciplina de Conforto Ambiental. O ponto de partida foi o estudo do terreno e do clima de São Francisco do Sul (SC), com cartas solares e rosa dos ventos.',
    solution:
      'Brises e cobogós adaptam o conforto ao longo do dia. Três blocos — administrativo, serviço e pedagógico — se conectam ao refeitório, no centro. A parede de cobogós é o elemento de destaque: sombreia as salas de aula e dá identidade ao conjunto.',
    cover: '/projetos/escola-sao-francisco-do-sul/cover.jpg',
    gallery: [
      {
        src: '/projetos/escola-sao-francisco-do-sul/cover.jpg',
        alt: 'Render do refeitório, com bancada revestida em pastilhas azuis e mesas compridas',
      },
      {
        src: '/projetos/escola-sao-francisco-do-sul/02.jpg',
        alt: 'Render da parede de cobogós que sombreia as salas de aula',
      },
      {
        src: '/projetos/escola-sao-francisco-do-sul/03.jpg',
        alt: 'Render da área de serviço, com brises horizontais na fachada',
      },
    ],
  },
  {
    id: 'his-hmp-mooca',
    title: 'HIS e HMP na Mooca',
    year: 2025,
    discipline: 'Habitação · urbanismo',
    location: 'Mooca, São Paulo',
    area: '10.811 m²',
    summary:
      '300 moradias de interesse social e de mercado popular em quatro torres, com térreo ativo.',
    context:
      'Projeto da disciplina de Projeto de Habitação. A gleba de cerca de 10.811 m² fica entre as ruas dos Trilhos, Telmo Giolito Porto e Bresser, na Mooca (SP).',
    solution:
      'Quatro torres posicionadas por análise climática, uma rua interna compartilhada com prioridade a pedestres e ciclistas, galeria de arte e praça central. O térreo é ativo, com lojas e comércio abertos ao público, e a entrada dos moradores tem portaria controlada.',
    cover: '/projetos/his-hmp-mooca/cover.jpg',
    gallery: [
      {
        src: '/projetos/his-hmp-mooca/cover.jpg',
        alt: 'Render de um dormitório, com cama de solteiro, parede terracota e quadro de paisagem',
      },
      {
        src: '/projetos/his-hmp-mooca/02.jpg',
        alt: 'Render da sala de estar, com parede azul-marinho e painel de madeira para a TV',
      },
      {
        src: '/projetos/his-hmp-mooca/03.jpg',
        alt: 'Render da cozinha compacta, com bancada de mármore e marcenaria clara',
      },
    ],
  },
] as const satisfies readonly Project[]
