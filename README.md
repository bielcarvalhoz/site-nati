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
- Trocar o vídeo: gere um MP4 novo, rode o `ffmpeg` abaixo em dois passos e substitua
  `public/hero.mp4` + `public/hero-poster.jpg` (um quadro do fim). Ajuste `scrubVh` em
  `Hero.tsx` (~40 × duração em segundos).
  1. `minterpolate` com `mi_mode=mci` (compensação de movimento) gera quadros
     intermediários reais → 60fps de verdade, sem o rastro do `mi_mode=blend`.
  2. escala pra 1080p + `unsharp` leve; `-g 2` deixa o seek do scrub quase exato.
  O passo 1 é lento (minutos); se travar, baixe `mc_mode`/`me_mode` ou o `preset`.

```bash
# passo 1 — interpola pra 60fps (mantém a resolução da origem)
ffmpeg -i entrada.mp4 -an -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
  -c:v libx264 -preset medium -crf 18 -g 2 -keyint_min 2 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart _60fps.mp4
# passo 2 — 1080p + leve sharpen
ffmpeg -i _60fps.mp4 -an -vf "scale=1920:1080:flags=lanczos+accurate_rnd,unsharp=5:5:0.45:5:5:0" \
  -c:v libx264 -preset slow -crf 18 -g 2 -keyint_min 2 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart public/hero.mp4
ffmpeg -ss <seg> -i entrada.mp4 -frames:v 1 -vf "scale=1920:-2" -q:v 3 public/hero-poster.jpg
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
