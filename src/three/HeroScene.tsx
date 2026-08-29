import { useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Edges } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Group, Mesh } from 'three'

/* "Sai do papel e vira casa": each part starts flat on the drawing sheet, laid
   out like an exploded plan, then rises / extrudes into an assembled house as the
   hero scrolls. progress (0..1) is driven from Hero.tsx via a ref. */

type Vec3 = readonly [number, number, number]
type PartState = { pos: Vec3; scale: Vec3 }
type Part = { key: string; delay: number; from: PartState; to: PartState }

const SPAN = 0.34 // fraction of progress each part takes to assemble
const SHELL = '#efece4'
const LINE = '#26251f'

const PARTS: readonly Part[] = [
  {
    key: 'base',
    delay: 0.0,
    from: { pos: [0, 0.02, 0], scale: [3.6, 0.05, 2.8] },
    to: { pos: [0, 0.09, 0], scale: [3.6, 0.18, 2.8] },
  },
  {
    key: 'floor',
    delay: 0.08,
    from: { pos: [0, 0.06, 3.7], scale: [3.0, 0.05, 2.2] },
    to: { pos: [0, 0.62, 0], scale: [3.0, 0.1, 2.2] },
  },
  {
    key: 'wall-back',
    delay: 0.18,
    from: { pos: [0, 0.06, -3.6], scale: [3.0, 0.05, 1.15] },
    to: { pos: [0, 1.2, -1.05], scale: [3.0, 1.08, 0.08] },
  },
  {
    key: 'wall-front',
    delay: 0.26,
    from: { pos: [0, 0.06, 4.9], scale: [3.0, 0.05, 1.15] },
    to: { pos: [0, 1.2, 1.05], scale: [3.0, 1.08, 0.08] },
  },
  {
    key: 'wall-left',
    delay: 0.34,
    from: { pos: [-3.8, 0.06, 0], scale: [1.15, 0.05, 2.2] },
    to: { pos: [-1.46, 1.2, 0], scale: [0.08, 1.08, 2.2] },
  },
  {
    key: 'wall-right',
    delay: 0.42,
    from: { pos: [3.8, 0.06, 0], scale: [1.15, 0.05, 2.2] },
    to: { pos: [1.46, 1.2, 0], scale: [0.08, 1.08, 2.2] },
  },
  {
    key: 'roof',
    delay: 0.56,
    from: { pos: [0, 0.06, 0], scale: [3.4, 0.05, 2.6] },
    to: { pos: [0, 1.84, 0], scale: [3.55, 0.13, 2.75] },
  },
  {
    key: 'stair-volume',
    delay: 0.68,
    from: { pos: [1.1, 0.06, 0.7], scale: [0.5, 0.05, 0.5] },
    to: { pos: [0.85, 2.2, -0.5], scale: [0.5, 0.7, 0.5] },
  },
]

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (t: number) => t * t * (3 - 2 * t)

function apply(m: Mesh, from: PartState, to: PartState, t: number) {
  m.position.set(
    MathUtils.lerp(from.pos[0], to.pos[0], t),
    MathUtils.lerp(from.pos[1], to.pos[1], t),
    MathUtils.lerp(from.pos[2], to.pos[2], t),
  )
  m.scale.set(
    MathUtils.lerp(from.scale[0], to.scale[0], t),
    MathUtils.lerp(from.scale[1], to.scale[1], t),
    MathUtils.lerp(from.scale[2], to.scale[2], t),
  )
}

function House({ progress, still }: { progress: RefObject<number>; still: boolean }) {
  const group = useRef<Group>(null)
  const meshes = useRef<Array<Mesh | null>>([])
  const camera = useThree((s) => s.camera)

  useFrame((_, delta) => {
    const p = still ? 1 : clamp01(progress.current)

    for (let i = 0; i < PARTS.length; i += 1) {
      const part = PARTS[i]
      const mesh = meshes.current[i]
      if (!part || !mesh) continue
      apply(mesh, part.from, part.to, smooth(clamp01((p - part.delay) / SPAN)))
    }

    const g = group.current
    if (g) {
      if (!still) g.rotation.y += delta * 0.1
      // view lifts from a near-plan angle toward eye level as the house builds
      g.rotation.x = MathUtils.lerp(g.rotation.x, -0.36 + p * 0.32, 0.08)
    }
    camera.lookAt(0, 0.85, 0)
  })

  return (
    <group ref={group} rotation={[-0.36, 0.5, 0]} position={[0, -0.5, 0]}>
      {PARTS.map((part, i) => {
        const s = still ? part.to : part.from
        return (
          <mesh
            key={part.key}
            ref={(el) => {
              meshes.current[i] = el
            }}
            position={s.pos as unknown as [number, number, number]}
            scale={s.scale as unknown as [number, number, number]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={SHELL} roughness={0.92} metalness={0} />
            <Edges threshold={12} color={LINE} />
          </mesh>
        )
      })}
    </group>
  )
}

type Props = {
  progress: RefObject<number>
  lowPower?: boolean
  still?: boolean
  active?: boolean
}

export default function HeroScene({ progress, lowPower = false, still = false, active = true }: Props) {
  return (
    <Canvas
      shadows={!lowPower}
      dpr={lowPower ? 1 : [1, 2]}
      gl={{ antialias: !lowPower, alpha: true }}
      camera={{ position: [5.2, 3.6, 6], fov: 38 }}
      frameloop={active && !still ? 'always' : 'demand'}
    >
      {/* drawing sheet */}
      <mesh position={[0, -0.54, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial color="#f7f5ef" roughness={1} />
      </mesh>

      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        castShadow={!lowPower}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#ffd9b0" />

      <House progress={progress} still={still} />

      {!lowPower ? (
        <ContactShadows position={[0, -0.52, 0]} opacity={0.28} blur={2.8} scale={11} far={5} />
      ) : null}
    </Canvas>
  )
}
