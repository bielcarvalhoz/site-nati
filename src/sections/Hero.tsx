import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SITE } from '../data/site'
import { TOP_ID } from '../lib/nav'
import styles from './Hero.module.css'

const HeroScene = lazy(() => import('../three/HeroScene'))
const POSTER = '/hero-poster.jpg'

/** off = no WebGL · low = small screen · static = reduced motion · full = animated */
type SceneMode = 'off' | 'low' | 'static' | 'full'

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') ?? c.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!gl
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function Poster() {
  return <img className={styles.poster} src={POSTER} alt="" aria-hidden="true" />
}

export default function Hero() {
  const [mode, setMode] = useState<SceneMode>('off')
  const [scrolledOnce, setScrolledOnce] = useState(false)
  const progressRef = useRef(0)

  // scene mode — decided after first paint, and kept in sync with the two media queries
  useEffect(() => {
    if (!hasWebGL()) return // stays 'off'
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = window.matchMedia('(max-width: 40rem)')
    const resolve = () => setMode(narrow.matches ? 'low' : motion.matches ? 'static' : 'full')
    resolve()
    motion.addEventListener('change', resolve)
    narrow.addEventListener('change', resolve)
    return () => {
      motion.removeEventListener('change', resolve)
      narrow.removeEventListener('change', resolve)
    }
  }, [])

  // start at the top on reload so the assembly plays from the plan, not mid-air
  useEffect(() => {
    const prev = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prev
    }
  }, [])

  // scroll → assembly progress (completes after ~one viewport of scrolling)
  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight || 1
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / span))
      if (window.scrollY > 4) setScrolledOnce(true)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const live = mode === 'full' || mode === 'static'

  return (
    <section id={TOP_ID} className={`container ${styles.hero}`} aria-label="Apresentação">
      <p className="eyebrow">{SITE.role}</p>
      <h1>{SITE.fullName}</h1>
      <p className={styles.lede}>{SITE.tagline}</p>
      <p className={styles.lead}>{SITE.heroLead}</p>

      <div className={styles.stage}>
        {live ? (
          <SceneBoundary fallback={<Poster />}>
            <Suspense fallback={<Poster />}>
              <HeroScene progress={progressRef} still={mode === 'static'} />
            </Suspense>
          </SceneBoundary>
        ) : (
          <Poster />
        )}
        {mode === 'full' ? (
          <span className={styles.cue} data-hidden={scrolledOnce}>
            role para montar o espaço
          </span>
        ) : null}
      </div>
    </section>
  )
}
