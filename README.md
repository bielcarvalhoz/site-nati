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

## Hero em vídeo

`src/components/ScrollVideo.tsx`. O topo é um `<video>` (`public/hero.mp4`) que fica
**fixo** por uma tela enquanto o scroll controla o `currentTime` — a planta na prancheta
vira o apartamento conforme você rola. No fim do vídeo o pin solta e o site continua.

- Em `prefers-reduced-motion` ou tela ≤ 40rem, mostra só `public/hero-poster.jpg` (sem
  pin, sem baixar o vídeo).
- O vídeo atual foi gerado no Kling (Higgsfield) usando uma **planta baixa desenhada
  como `start_image`**, então as paredes sobem exatamente sobre as linhas da planta.
  Pra regenerar mantendo essa coerência: desenhe/exporte a planta como imagem e passe
  como imagem inicial.
- Trocar o vídeo: gere um MP4 novo, rode o `ffmpeg` abaixo (interpola pra 60fps + deixa
  os keyframes densos = scrub suave), substitua `public/hero.mp4` + `public/hero-poster.jpg`
  (um quadro do fim). Ajuste `scrubVh` em `Hero.tsx` (~40 × duração em segundos).

```bash
ffmpeg -i entrada.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 4 -keyint_min 4 -sc_threshold 0 -preset slow -crf 20 \
  -movflags +faststart public/hero.mp4
ffmpeg -ss <seg> -i entrada.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 public/hero-poster.jpg
```

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
