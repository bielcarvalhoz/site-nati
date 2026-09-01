import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './ScrollVideo.module.css'

type FrameSeq = {
  /** e.g. "/hero-frames/f" — code appends a 3-digit 1-based index + ".webp". */
  prefix: string
  count: number
}

type Props = {
  /** MP4, H.264 High, +faststart, dense keyframes, no audio. Used on desktop. */
  src: string
  /** Touch / small screens scrub a preloaded WebP sequence drawn to <canvas>.
   *  Seeking a real <video> every frame is throttled on mobile decoders and
   *  looks like single-digit fps however small the file is. */
  frames?: FrameSeq
  /** Poster / LCP image; also the pre-first-frame fallback. */
  poster: string
  /** Scroll distance spent scrubbing, in vh. Higher = slower scrub. */
  scrubVh?: number
  /** Progress past which the clip pins to the last frame. */
  endHold?: number
  /** sr-only description of what the clip shows. */
  label?: string
  /** drafting title-block caption shown over the clip. */
  plate?: string
}

const TAU = 0.16
const FPS = 60
const FALLBACK_DUR = 5

const framePath = (f: FrameSeq, i: number) =>
  `${f.prefix}${String(Math.min(f.count, Math.max(1, i))).padStart(3, '0')}.webp`

export default function ScrollVideo({
  src,
  frames,
  poster,
  scrubVh = 200,
  endHold = 0.98,
  label,
  plate,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pinned, setPinned] = useState(false)
  const [seq, setSeq] = useState(false)

  // phones / coarse-pointer / narrow screens scrub the image sequence instead
  useEffect(() => {
    if (!frames) return
    const mq = window.matchMedia('(pointer: coarse), (max-width: 48rem)')
    const resolve = () => setSeq(mq.matches)
    resolve()
    mq.addEventListener('change', resolve)
    return () => mq.removeEventListener('change', resolve)
  }, [frames])

  const useSeq = seq && !!frames

  // pin whenever motion is allowed — desktop and mobile alike. Data-saver users
  // keep the pin but load lazily; reduced-motion drops to the static poster.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const resolve = () => setPinned(!reduce.matches)
    resolve()
    reduce.addEventListener('change', resolve)
    return () => reduce.removeEventListener('change', resolve)
  }, [])

  // suppress the browser's scroll restoration just for this load, so a reload
  // starts the clip from its first frame — then hand control straight back so
  // in-session history navigation still restores position normally
  useEffect(() => {
    if (!pinned || !('scrollRestoration' in history)) return
    const prev = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const raf = requestAnimationFrame(() => {
      history.scrollRestoration = prev
    })
    return () => {
      cancelAnimationFrame(raf)
      history.scrollRestoration = prev
    }
  }, [pinned])

  // ---- <video> scrub engine (desktop) ----
  useEffect(() => {
    if (useSeq) return
    const wrap = wrapRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!pinned || !wrap || !stage || !video) return

    let active = true
    let running = false
    let raf = 0
    let cur = 0
    let target = 0
    let last = performance.now()
    let scrollable = 1

    const measure = () => {
      scrollable = Math.max(1, wrap.offsetHeight - stage.offsetHeight)
    }
    const readTarget = () => {
      const top = wrap.getBoundingClientRect().top
      target = Math.min(1, Math.max(0, -top / scrollable))
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      cur += (target - cur) * (1 - Math.exp(-dt / TAU))

      const dur = video.duration || FALLBACK_DUR
      const t = cur >= endHold ? dur - 1 / FPS : cur * dur
      if (!video.seeking && Number.isFinite(t) && Math.abs(t - video.currentTime) > 1 / FPS) {
        try {
          video.currentTime = t
        } catch {
          /* seek not ready yet */
        }
      }

      if (active && Math.abs(target - cur) > 0.0005) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    const wake = () => {
      if (running || !active) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      wake()
    }
    const onResize = () => {
      measure()
      readTarget()
      wake()
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          active = !!entry?.isIntersecting
          if (active) {
            cur = target
            wake()
          } else {
            cancelAnimationFrame(raf)
            running = false
          }
        },
        { rootMargin: '100% 0px' },
      )
      io.observe(wrap)
    }

    // iOS: a muted play/pause on first interaction unlocks free seeking
    const unlock = () => {
      const played = video.play()
      if (played && typeof played.then === 'function') {
        played.then(() => video.pause()).catch(() => {})
      }
    }
    window.addEventListener('pointerdown', unlock, { once: true })

    // pull the file only once the page has settled, so it doesn't fight the LCP
    // poster — and never eagerly on data-saver connections
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData
    const startLoad = () => {
      if (saveData) return
      try {
        video.preload = 'auto'
        video.load()
      } catch {
        /* jsdom / unsupported */
      }
    }
    if (document.readyState === 'complete') startLoad()
    else window.addEventListener('load', startLoad, { once: true })

    measure()
    readTarget()
    wake()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('load', startLoad)
    }
  }, [pinned, endHold, useSeq])

  // ---- <canvas> image-sequence scrub engine (mobile) ----
  useEffect(() => {
    if (!useSeq || !frames) return
    const wrap = wrapRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!pinned || !wrap || !stage || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seqFrames = frames
    const imgs: (HTMLImageElement | undefined)[] = []
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let wantIdx = 1
    let drawnIdx = -1

    const sizeCanvas = () => {
      const r = stage.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * dpr))
      canvas.height = Math.max(1, Math.round(r.height * dpr))
    }
    const ready = (i: number) => {
      const im = imgs[i]
      return im && im.complete && im.naturalWidth > 0 ? im : null
    }
    const nearestReady = (i: number) => {
      for (let k = i; k >= 1; k--) {
        const im = ready(k)
        if (im) return im
      }
      for (let k = i + 1; k <= seqFrames.count; k++) {
        const im = ready(k)
        if (im) return im
      }
      return null
    }
    const draw = (idx: number) => {
      const img = nearestReady(idx)
      if (!img) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      drawnIdx = idx
    }

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData
    const loadOne = (i: number) => {
      if (i < 1 || i > seqFrames.count || imgs[i]) return
      const im = new Image()
      im.decoding = 'async'
      im.onload = () => {
        // a frame we're parked on (or next to) just arrived — repaint it
        if (Math.abs(i - wantIdx) <= 1) draw(wantIdx)
      }
      im.src = framePath(seqFrames, i)
      imgs[i] = im
    }
    const preloadAll = () => {
      for (let i = 1; i <= seqFrames.count; i++) loadOne(i)
    }
    if (!saveData) {
      if (document.readyState === 'complete') preloadAll()
      else window.addEventListener('load', preloadAll, { once: true })
    }

    let active = true
    let running = false
    let raf = 0
    let cur = 0
    let target = 0
    let last = performance.now()
    let scrollable = 1

    const measure = () => {
      scrollable = Math.max(1, wrap.offsetHeight - stage.offsetHeight)
    }
    const readTarget = () => {
      const top = wrap.getBoundingClientRect().top
      target = Math.min(1, Math.max(0, -top / scrollable))
    }
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      cur += (target - cur) * (1 - Math.exp(-dt / TAU))

      const p = cur >= endHold ? 1 : cur
      wantIdx = 1 + Math.round(p * (seqFrames.count - 1))
      if (saveData) {
        loadOne(wantIdx)
        loadOne(wantIdx + 1)
        loadOne(wantIdx - 1)
      }
      if (wantIdx !== drawnIdx) draw(wantIdx)

      if (active && Math.abs(target - cur) > 0.0005) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    const wake = () => {
      if (running || !active) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      wake()
    }
    const onResize = () => {
      sizeCanvas()
      measure()
      readTarget()
      drawnIdx = -1
      wake()
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          active = !!entry?.isIntersecting
          if (active) {
            cur = target
            wake()
          } else {
            cancelAnimationFrame(raf)
            running = false
          }
        },
        { rootMargin: '100% 0px' },
      )
      io.observe(wrap)
    }

    sizeCanvas()
    measure()
    readTarget()
    wake()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', preloadAll)
    }
  }, [pinned, endHold, useSeq, frames])

  if (!pinned) {
    return <img className={styles.still} src={poster} alt={label ?? ''} fetchPriority="high" />
  }

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      style={{ '--scrub': `${scrubVh}svh` } as CSSProperties}
    >
      <div ref={stageRef} className={styles.stage}>
        <img
          className={styles.poster}
          src={poster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        {useSeq ? (
          <canvas ref={canvasRef} className={styles.media} aria-hidden="true" />
        ) : (
          <video
            ref={videoRef}
            className={styles.media}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            aria-hidden="true"
            {...{ 'webkit-playsinline': 'true' }}
          />
        )}
        {plate ? (
          <p className={styles.plate} aria-hidden="true">
            {plate}
          </p>
        ) : null}
        {label ? <p className="sr-only">{label}</p> : null}
      </div>
    </div>
  )
}
