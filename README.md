# Site — Natália Martinelli Damasceno

Portfólio profissional de arquitetura: projetos realizados e acadêmicos, trajetória,
serviços, contato, com um vídeo scroll-scrubado no topo.

**Stack:** Vite + React + TypeScript · CSS Modules + design tokens · `<video>` com
scroll-pin/scrub no hero · Vitest · deploy na Vercel.

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
- O vídeo atual foi gerado no **Seedance 2.5** (Higgsfield) com `start_image` = planta
  baixa desenhada (sem texto) e `end_image` = render do apartamento pronto, travando
  os dois extremos da transformação. As paredes sobem exatamente sobre as linhas da
  planta e a planta vira o piso. Pra regenerar mantendo a coerência: passe a planta
  como imagem inicial e um interior de referência como imagem final.
- Resolução/fps: o `hero.mp4` atual (1920×1080, 60fps) saiu do **`upscale_video` do
  Higgsfield** (provider `bytedance`, preset `aigc`, `resolution:1080p`, `fps:60`) em
  cima do job do Seedance. É upscale de IA de verdade, não `scale` — a origem do
  Seedance é 720p/24fps.
- Trocar o vídeo: gere o MP4, passe pelo `upscale_video` (1080p/60fps), depois rode o
  `ffmpeg` abaixo só pra deixar os keyframes densos (`-g 4` = seek do scrub quase
  exato) e substitua `public/hero.mp4` + `public/hero-poster.jpg` (um quadro do fim).
  Ajuste `scrubVh` em `Hero.tsx` (~40 × duração em segundos).

```bash
ffmpeg -i upscaled.mp4 -an -vf "fps=60" -c:v libx264 -preset slow -crf 19 \
  -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart public/hero.mp4
ffmpeg -ss <seg> -i upscaled.mp4 -frames:v 1 -vf "scale=1920:-2" -q:v 3 public/hero-poster.jpg
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
