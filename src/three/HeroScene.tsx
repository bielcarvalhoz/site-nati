import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

/* A matte-white architectural massing study — stacked, slightly rotated slabs,
   lit like a model in a vitrine. No HDRI / Environment preset (those fetch from a
   CDN and the CSP blocks them) — plain lights only. */

type Slab = {
  position: [number, number, number]
  args: [number, number, number]
  rotationY: number
}

const SLABS: readonly Slab[] = [
  { position: [0, 0, 0], args: [2.6, 0.5, 1.8], rotationY: 0 },
  { position: [0.25, 0.62, -0.1], args: [2.0, 0.5, 1.5], rotationY: 0.12 },
  { position: [-0.2, 1.2, 0.15], args: [1.5, 0.5, 1.2], rotationY: -0.1 },
  { position: [0.15, 1.72, 0], args: [1.0, 0.42, 0.9], rotationY: 0.24 },
]

function Maquette({ still }: { still: boolean }) {
  const ref = useRef<Group>(null)

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    if (!still) g.rotation.y += delta * 0.18
    // pointer parallax — eased toward the cursor
    g.rotation.x += (state.pointer.y * 0.12 - g.rotation.x) * 0.05
    g.position.x += (state.pointer.x * 0.25 - g.position.x) * 0.05
  })

  return (
    <group ref={ref} position={[0, -0.9, 0]} scale={1.35}>
      {SLABS.map((slab, i) => (
        <RoundedBox
          key={i}
          args={slab.args}
          radius={0.04}
          smoothness={3}
          position={slab.position}
          rotation={[0, slab.rotationY, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#f4f2ec" roughness={0.85} metalness={0} />
        </RoundedBox>
      ))}
    </group>
  )
}

export default function HeroScene({ lowPower = false }: { lowPower?: boolean }) {
  const still =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      shadows={!lowPower}
      dpr={lowPower ? 1 : [1, 2]}
      gl={{ antialias: !lowPower, alpha: true }}
      camera={{ position: [3.6, 2.1, 4.2], fov: 40 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 6, 3]}
        intensity={1.7}
        castShadow={!lowPower}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#ffd9b0" />
      <Maquette still={still} />
      {!lowPower ? (
        <ContactShadows position={[0, -0.9, 0]} opacity={0.32} blur={2.6} scale={9} far={4} />
      ) : null}
    </Canvas>
  )
}
