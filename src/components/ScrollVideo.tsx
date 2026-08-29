import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './ScrollVideo.module.css'

type Props = {
  /** MP4, H.264 High, +faststart, dense keyframes, no audio. */
  src: string
  /** Poster / LCP image; also the last-frame fallback. */
  poster: string
  /** Scroll distance spent scrubbing, in vh. Higher = slower scrub. */
  scrubVh?: number
  /** Progress past which currentTime pins to the last frame. */
  endHold?: number
  /** sr-only description of what the clip shows. */
  label?: string
}

const TAU = 0.16
const FPS = 48
const FALLBACK_DUR = 5

export default function ScrollVideo({ src, poster, scrubVh = 200, endHold = 0.98, label }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [pinned, setPinned] = useState(false)

  // pin only with motion allowed and room to work; live with the media queries
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 40rem)')
    const resolve = () => setPinned(!reduce.matches && !small.matches)
    resolve()
    reduce.addEventListener('change', resolve)
    small.addEventListener('change', resolve)
    return () => {
      reduce.removeEventListener('change', resolve)
      small.removeEventListener('change', resolve)
    }
  }, [])

  // start reloads at the top so the clip plays from its first frame
  useEffect(() => {
    if (!pinned) return
    const prev = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prev
    }
  }, [pinned])

  // the pin + scrub engine
  useEffect(() => {
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

    // pull the file only once the page has settled, so it doesn't fight the LCP poster
    const startLoad = () => {
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
  }, [pinned, endHold])

  if (!pinned) {
    return <img className={styles.still} src={poster} alt="" aria-hidden="true" />
  }

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      style={{ '--scrub': `${scrubVh}svh` } as CSSProperties}
    >
      <div ref={stageRef} className={styles.stage}>
        <img className={styles.poster} src={poster} alt="" aria-hidden="true" />
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
        <p className={styles.plate} aria-hidden="true">
          Arquiteta e Urbanista · Natália
        </p>
        {label ? <p className="sr-only">{label}</p> : null}
      </div>
    </div>
  )
}
