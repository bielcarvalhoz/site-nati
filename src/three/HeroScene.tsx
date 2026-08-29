import { useEffect, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Edges } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Mesh } from 'three'

/* "Sai do papel e vira espaço": a plan on a drafting sheet, seen from near top-down,
   assembles into an abstract furnished interior inside a fixed open shell while the
   hero scrolls. progress (0..1) comes from Hero.tsx via a ref. No auto-rotation —
   the motion is the camera descending from plan view to an eye-level 3/4 view. */

type Vec3 = [number, number, number]
type PartState = { pos: Vec3; scale: Vec3 }
type Part = {
  key: string
  color: string
  structural: boolean
  delay: number
  from: PartState
  to: PartState
}

const SPAN = 0.3
const WALL = '#ded7c6'
const FLOOR = '#efe9dd'
const FURNI = '#cfc7b4'
const RUG = '#a85f38'
const LINE = '#2a2924'

// from = flat on the sheet on its own footprint · to = built
const PARTS: readonly Part[] = [
  {
    key: 'floor',
    color: FLOOR,
    structural: true,
    delay: 0,
    from: { pos: [0, 0.02, 0], scale: [4, 0.04, 3] },
    to: { pos: [0, 0.06, 0], scale: [4, 0.12, 3] },
  },
  {
    key: 'wall-back',
    color: WALL,
    structural: true,
    delay: 0.06,
    from: { pos: [0, 0.05, -1.5], scale: [4, 0.04, 1.4] },
    to: { pos: [0, 0.86, -1.44], scale: [4, 1.6, 0.1] },
  },
  {
    key: 'wall-left',
    color: WALL,
    structural: true,
    delay: 0.12,
    from: { pos: [-2, 0.05, 0], scale: [1.4, 0.04, 3] },
    to: { pos: [-1.95, 0.86, 0], scale: [0.1, 1.6, 3] },
  },
  {
    key: 'partition',
    color: WALL,
    structural: true,
    delay: 0.34,
    from: { pos: [0.6, 0.05, 0.4], scale: [0.04, 0.04, 1.9] },
    to: { pos: [0.6, 0.76, -0.2], scale: [0.08, 1.4, 1.9] },
  },
  {
    key: 'rug',
    color: RUG,
    structural: false,
    delay: 0.4,
    from: { pos: [-0.6, 0.13, 0.4], scale: [0.01, 0.02, 0.01] },
    to: { pos: [-0.6, 0.13, 0.4], scale: [2.2, 0.02, 1.5] },
  },
  {
    key: 'sofa',
    color: FURNI,
    structural: false,
    delay: 0.46,
    from: { pos: [-0.7, 0.05, -1.0], scale: [1.8, 0.04, 0.8] },
    to: { pos: [-0.7, 0.42, -1.0], scale: [1.8, 0.55, 0.8] },
  },
  {
    key: 'table',
    color: FURNI,
    structural: false,
    delay: 0.54,
    from: { pos: [-0.6, 0.05, 0.15], scale: [1.0, 0.04, 0.6] },
    to: { pos: [-0.6, 0.3, 0.15], scale: [1.0, 0.1, 0.6] },
  },
  {
    key: 'shelf',
    color: FURNI,
    structural: false,
    delay: 0.6,
    from: { pos: [-1.7, 0.05, 0.9], scale: [0.4, 0.04, 1.2] },
    to: { pos: [-1.72, 0.92, 0.9], scale: [0.35, 1.7, 1.2] },
  },
  {
    key: 'bed',
    color: FURNI,
    structural: false,
    delay: 0.66,
    from: { pos: [1.4, 0.05, 0.4], scale: [1.2, 0.04, 1.9] },
    to: { pos: [1.4, 0.36, 0.4], scale: [1.2, 0.5, 1.9] },
  },
]

const CAM_FROM: Vec3 = [0.02, 7.2, 2.6]
const CAM_TO: Vec3 = [4.1, 2.8, 4.7]
const LOOK_FROM: Vec3 = [0, 0, -0.15]
const LOOK_TO: Vec3 = [-0.15, 0.6, -0.2]

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (t: number) => t * t * (3 - 2 * t)
const mix3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  MathUtils.lerp(a[0], b[0], t),
  MathUtils.lerp(a[1], b[1], t),
  MathUtils.lerp(a[2], b[2], t),
]

function apply(m: Mesh, from: PartState, to: PartState, t: number) {
  const p = mix3(from.pos, to.pos, t)
  const s = mix3(from.scale, to.scale, t)
  m.position.set(p[0], p[1], p[2])
  m.scale.set(s[0], s[1], s[2])
}

function Interior({ progress, still }: { progress: RefObject<number>; still: boolean }) {
  const meshes = useRef<Array<Mesh | null>>([])
  const camera = useThree((s) => s.camera)
  const invalidate = useThree((s) => s.invalidate)

  // demand rendering: draw a frame only when the scroll position (progress) changes.
  // a few settle frames after mount cover the gap before the first scroll event.
  useEffect(() => {
    let raf = 0
    const until = performance.now() + 600
    const settle = () => {
      invalidate()
      if (performance.now() < until) raf = requestAnimationFrame(settle)
    }
    settle()
    if (still) return () => cancelAnimationFrame(raf)

    const bump = () => invalidate()
    window.addEventListener('scroll', bump, { passive: true })
    window.addEventListener('resize', bump)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', bump)
      window.removeEventListener('resize', bump)
    }
  }, [still, invalidate])

  useFrame(() => {
    const p = still ? 1 : clamp01(progress.current)
    const e = smooth(p)

    const cp = mix3(CAM_FROM, CAM_TO, e)
    camera.position.set(cp[0], cp[1], cp[2])
    const lk = mix3(LOOK_FROM, LOOK_TO, e)
    camera.lookAt(lk[0], lk[1], lk[2])

    for (let i = 0; i < PARTS.length; i += 1) {
      const part = PARTS[i]
      const mesh = meshes.current[i]
      if (!part || !mesh) continue
      apply(mesh, part.from, part.to, smooth(clamp01((p - part.delay) / SPAN)))
    }
  })

  return (
    <group position={[0, -0.4, 0]}>
      {PARTS.map((part, i) => {
        const init = still ? part.to : part.from
        return (
          <mesh
            key={part.key}
            ref={(el) => {
              meshes.current[i] = el
            }}
            position={init.pos}
            scale={init.scale}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={part.color} roughness={0.94} metalness={0} />
            {part.structural ? <Edges threshold={12} color={LINE} /> : null}
          </mesh>
        )
      })}
    </group>
  )
}

type Props = { progress: RefObject<number>; still?: boolean }

export default function HeroScene({ progress, still = false }: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ position: CAM_FROM, fov: 40 }}
      frameloop="demand"
    >
      {/* drafting sheet + grid */}
      <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#f4f1e9" roughness={1} />
      </mesh>
      <gridHelper args={[10, 10, '#ded8ca', '#ebe6da']} position={[0, -0.4, 0]} />

      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 8, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -4]} intensity={0.3} />

      <Interior progress={progress} still={still} />

      <ContactShadows position={[0, -0.39, 0]} opacity={0.3} blur={2.6} scale={12} far={5} />
    </Canvas>
  )
}
