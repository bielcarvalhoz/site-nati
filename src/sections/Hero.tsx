import { lazy, Suspense, useEffect, useState } from 'react'
import { SITE } from '../data/site'
import { TOP_ID } from '../lib/nav'
import styles from './Hero.module.css'

const HeroScene = lazy(() => import('../three/HeroScene'))

type SceneMode = 'off' | 'low' | 'full'

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Decides once, after mount, whether (and how heavily) to run the 3D scene.
    Starts 'off' so the first paint never blocks on the WebGL probe or the
    three.js chunk; the effect then upgrades it. */
function useSceneMode(): SceneMode {
  const [mode, setMode] = useState<SceneMode>('off')
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const next: SceneMode =
      reduced || !hasWebGL()
        ? 'off'
        : window.matchMedia('(max-width: 40rem)').matches
          ? 'low'
          : 'full'
    // oxlint-disable-next-line react/set-state-in-effect -- syncing to browser capabilities, post-paint by design
    if (next !== 'off') setMode(next)
  }, [])
  return mode
}

export default function Hero() {
  const mode = useSceneMode()

  return (
    <section id={TOP_ID} className={`container ${styles.hero}`} aria-label="Apresentação">
      <p className="eyebrow">{SITE.role}</p>
      <h1>{SITE.fullName}</h1>
      <p className={styles.lede}>{SITE.tagline}</p>
      <p className={styles.lead}>{SITE.heroLead}</p>

      <div className={styles.stage} aria-hidden="true">
        {mode !== 'off' ? (
          <Suspense fallback={null}>
            <HeroScene lowPower={mode === 'low'} />
          </Suspense>
        ) : null}
      </div>
    </section>
  )
}
