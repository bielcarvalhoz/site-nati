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

/** off = no WebGL (poster only) · static = reduced motion (built house, no anim)
 *  low = small screen (lighter render) · full = animated, scroll-assembled */
type SceneMode = 'off' | 'static' | 'low' | 'full'

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Hero() {
  const [mode, setMode] = useState<SceneMode>('off')
  const stageRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [onScreen, setOnScreen] = useState(true)

  // decide scene mode once, after first paint
  useEffect(() => {
    if (!hasWebGL()) return // stays 'off'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 40rem)').matches
    // oxlint-disable-next-line react/set-state-in-effect -- syncing to browser capabilities, post-paint by design
    setMode(reduced ? 'static' : small ? 'low' : 'full')
  }, [])

  // scroll progress across the first ~85vh drives the house assembly
  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight * 0.85
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / span))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // pause rendering when the stage is scrolled away
  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => setOnScreen(!!entries[0]?.isIntersecting), {
      threshold: 0.05,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id={TOP_ID} className={`container ${styles.hero}`} aria-label="Apresentação">
      <p className="eyebrow">{SITE.role}</p>
      <h1>{SITE.fullName}</h1>
      <p className={styles.lede}>{SITE.tagline}</p>
      <p className={styles.lead}>{SITE.heroLead}</p>

      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        {mode !== 'off' ? (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene
                progress={progressRef}
                lowPower={mode === 'low'}
                still={mode === 'static'}
                active={onScreen}
              />
            </Suspense>
          </SceneBoundary>
        ) : null}
      </div>
    </section>
  )
}
