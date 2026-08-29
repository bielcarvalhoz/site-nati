# Site — Natália Martinelli Damasceno

Portfólio profissional de arquitetura: projetos realizados e acadêmicos, trajetória,
serviços, contato, com uma cena 3D no topo.

**Stack:** Vite + React + TypeScript · CSS Modules + design tokens · react-three-fiber
(hero 3D) · Vitest · deploy na Vercel.

---

## Rodar

```bash
npm install
npm run dev        # localhost:5173
```

| Script | O que faz |
|--------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção em `dist/` (roda `tsc` antes) |
| `npm run preview` | serve o `dist/` (porta 4173) |
| `npm test` | testes (Vitest) |
| `npm run lint` | oxlint |
| `npm run shots` | screenshots em `screenshots/` (precisa do `preview` rodando) |

---

## Editar o conteúdo

Todo o texto e os dados ficam em **`src/data/`** — não há texto fixo nos componentes.
Procure por `// TODO trocar` para achar tudo que ainda é fictício.

| Arquivo | Conteúdo |
|---------|----------|
| `site.ts` | nome, título, frase do topo, textos do "Sobre", e-mail, telefone, WhatsApp, Instagram, CAU, cidade |
| `projects.ts` | lista de projetos (realizados e acadêmicos) |
| `journey.ts` | linha do tempo profissional |
| `services.ts` | serviços oferecidos + lista de ferramentas |
| `metrics.ts` | números do "Trajetória" (devem bater com a linha do tempo) |

### Adicionar um projeto

Em `src/data/projects.ts`, acrescente um objeto ao array `PROJECTS`:

```ts
{
  id: 'nome-curto-sem-espaco',          // único
  title: 'Nome do projeto',
  year: 2024,
  category: 'realizado',                // 'realizado' | 'academico'
  discipline: 'Residencial · Interiores',
  location: 'São Paulo, SP',            // opcional
  area: '120 m²',                       // opcional
  summary: 'Uma linha para o card.',
  context: 'O problema / o briefing.',
  solution: 'O partido — a ideia de projeto.',
},
```

O card e o detalhe (no `<dialog>`) aparecem sozinhos, no filtro certo.

### Colocar fotos reais

Enquanto um projeto não tem `cover`, o site desenha um retângulo cinza determinístico.
Para usar fotos:

1. coloque as imagens em `src/assets/<id-do-projeto>/`
2. no objeto do projeto, aponte para elas:

```ts
cover: '/src/assets/casa-cotia/capa.jpg',
gallery: ['/src/assets/casa-cotia/01.jpg', '/src/assets/casa-cotia/02.jpg'],
```

`gallery` precisa ter pelo menos uma imagem (o tipo obriga).

---

## Formulário de contato

Usa o [Web3Forms](https://web3forms.com) (grátis, sem conta). Sem a chave, o formulário
mostra um erro e o visitante cai nos links de e-mail / WhatsApp.

1. pegue uma chave em web3forms.com
2. `cp .env.example .env.local` e cole a chave em `VITE_WEB3FORMS_KEY`
3. na Vercel: **Settings → Environment Variables → `VITE_WEB3FORMS_KEY`**

---

## Cena 3D

`src/three/HeroScene.tsx`. Carrega em _chunk_ separado (não trava o primeiro paint) e
se desliga sozinho quando: o visitante prefere menos animação, não há WebGL, ou a tela
é pequena (nesse caso roda uma versão leve). Fora da tela, para de renderizar.

---

## Deploy (Vercel)

A Vercel detecta o Vite automaticamente (`npm run build` → `dist/`).

- `vercel.json` já define os headers de segurança e a CSP (libera o `api.web3forms.com`).
- defina `VITE_WEB3FORMS_KEY` nas variáveis de ambiente do projeto.
- recomendado: _Install Command_ `npm ci --omit=dev` para não subir as dev-dependencies.

---

## Ainda pendente (fictício)

- nome completo já confirmado; **e-mail, telefone, WhatsApp, Instagram, CAU** são placeholder
- **escritórios e datas** da trajetória são genéricos — trocar pelos reais
- **números** de `metrics.ts` são estimativa — ajustar e conferir contra a linha do tempo
- **fotos** dos projetos — todos usam placeholder
