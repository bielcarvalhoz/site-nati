# Site — Natália Martinelli Damasceno

Portfólio de arquitetura numa página só: projetos do curso e acadêmicos, trajetória,
serviços e contato. O topo é um vídeo que anda conforme você dá scroll.

**Stack:** Vite + React + TypeScript, CSS Modules com design tokens, Vitest, deploy na Vercel.

## Rodar

```bash
npm install
npm run dev        # localhost:5173
```

| Script | O que faz |
|--------|-----------|
| `npm run dev` | dev server |
| `npm run build` | build de produção em `dist/` (roda `tsc` antes) |
| `npm run preview` | serve o `dist/` na porta 4173 |
| `npm test` | Vitest |
| `npm run lint` | oxlint |
| `npm run shots` | screenshots em `screenshots/`, precisa do `preview` no ar |

## Conteúdo

Texto e dados ficam todos em `src/data/`; os componentes não carregam texto fixo. A fonte
é o portfólio e o currículo dela (`src/assets/portfolio-antigo.pdf`, fora do git). `TODO`
marca o que ainda falta confirmar.

| Arquivo | Conteúdo |
|---------|----------|
| `site.ts` | nome, título, frase do topo, textos do "Sobre", e-mail, telefone, WhatsApp, LinkedIn, cidade |
| `projects.ts` | os 6 projetos autorais do curso |
| `journey.ts` | linha do tempo: formação e estágios |
| `services.ts` | competências (`SERVICES`) e softwares (`TOOLS`) |
| `metrics.ts` | números da "Trajetória" |

### Adicionar um projeto

Acrescente um objeto ao array `PROJECTS` em `src/data/projects.ts`:

```ts
{
  id: 'nome-curto-sem-espaco',          // único
  title: 'Nome do projeto',
  year: 2024,
  discipline: 'Interiores · residencial',
  location: 'São Paulo, SP',            // opcional
  area: '120 m²',                       // opcional
  summary: 'Uma linha para o card.',
  context: 'O contexto e a disciplina.',
  solution: 'O partido, a ideia de projeto.',
},
```

O card e o `<dialog>` de detalhe saem daí.

### Fotos dos projetos

Sem `cover`, o site desenha um retângulo cinza fixo por projeto. Para usar fotos:

1. imagens em `src/assets/<id-do-projeto>/`
2. aponte para elas no objeto do projeto:

```ts
cover: '/src/assets/casa-cotia/capa.jpg',
gallery: ['/src/assets/casa-cotia/01.jpg', '/src/assets/casa-cotia/02.jpg'],
```

`gallery` exige pelo menos uma imagem.

## Formulário de contato

Roda no [Web3Forms](https://web3forms.com). A chave já está nas variáveis de ambiente da
Vercel (`VITE_WEB3FORMS_KEY`) e as mensagens vão para o e-mail da Natália, definido no
painel do Web3Forms. Sem a chave o formulário mostra erro e o visitante cai nos links de
e-mail e WhatsApp.

Para rodar local: `cp .env.example .env.local` e cole a chave em `VITE_WEB3FORMS_KEY`.

## Hero em vídeo

`src/components/ScrollVideo.tsx`. No desktop o topo é um `<video>` (`public/hero.mp4`) que
fica preso por uma tela enquanto o scroll controla o `currentTime`: a planta na prancheta
vira o apartamento à medida que você rola. Passado o vídeo, o pin solta e a página segue.

- `prefers-reduced-motion`: mostra só `public/hero-poster.jpg`, sem pin e sem baixar o vídeo.
- Mobile, `pointer: coarse` ou tela ≤ 48rem: não usa `<video>`. Seek de `currentTime` frame
  a frame trava nos decoders de celular e cai para uns 5fps. No lugar, desenha uma sequência
  de WebP num `<canvas>` (`public/hero-frames/f001..f090.webp`, 1280px, quality 80, ~2,2 MB).
  Carrega depois do `load`, nunca em save-data. Se mudar a contagem de frames, ajuste
  `HERO_FRAMES.count` no `Hero.tsx`.

O vídeo saiu do Seedance 2.5 (Higgsfield), com `start_image` na planta baixa desenhada sem
texto e `end_image` no render do apartamento pronto, para travar os dois extremos da
transformação. Depois passou pelo `upscale_video` do Higgsfield (provider `bytedance`,
preset `aigc`, 1080p, 60fps), já que o Seedance entrega 720p/24fps. O `hero.mp4` final é
1920×1080 a 60fps.

Para trocar o vídeo: gere o MP4, passe pelo `upscale_video`, rode o `ffmpeg` abaixo para
adensar os keyframes (`-g 4` deixa o seek do scrub quase exato) e substitua `public/hero.mp4`
e `public/hero-poster.jpg` (um quadro do fim do vídeo). Ajuste `scrubVh` no `Hero.tsx`,
mais ou menos 40 vezes a duração em segundos.

```bash
ffmpeg -i upscaled.mp4 -an -vf "fps=60" -c:v libx264 -preset slow -crf 19 \
  -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart public/hero.mp4
ffmpeg -ss <seg> -i upscaled.mp4 -frames:v 1 -vf "scale=1920:-2" -q:v 3 public/hero-poster.jpg

# frames do mobile
ffmpeg -i public/hero.mp4 -vf "scale=1280:-2,fps=18" -c:v libwebp -quality 80 \
  public/hero-frames/f%03d.webp
```

## Deploy (Vercel)

A Vercel reconhece o Vite sozinha (`npm run build` → `dist/`).

- `vercel.json` traz os headers de segurança e a CSP, que já libera `api.web3forms.com`.
- `VITE_WEB3FORMS_KEY` precisa estar nas variáveis de ambiente do projeto.
- Install Command sugerido: `npm ci --omit=dev`, para não subir dev-dependency.

## Pendente

- revisar o texto com ela: "Sobre" e frase do topo (`site.ts`), resumos dos projetos
  (`projects.ts`), descrições da trajetória (`journey.ts`)
- `public/natalia.jpg` é uma selfie do portfólio antigo; trocar por um headshot quando tiver
- as pranchas dos projetos são recortes de página do PDF; havendo os renders em alta, trocar
  em `public/projetos/<id>/`
