import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Court from './Court'
import Player from './Player'
import FlushInput from './FlushInput'
import { Suspense } from 'react'


export default function CourtScene() {
  return (
    <Canvas
      camera={{ position: [0, 14, 12], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
      gl={{ antialias: true, toneMappingExposure: 0.3 }}
      shadows
    >
      <Suspense fallback={null}>
        {/* space environment */}
        <color attach="background" args={['#000008']} />
        <Stars
          radius={30}
          depth={60}
          count={4000}
          factor={4}
          fade
          speed={0.5}
        />

        {/* ambient lighting */}
        <ambientLight intensity={0.3} />

        {/* models */}
        <Court />
        <Player />

        {/* utility */}
        <FlushInput />
      </Suspense>
    </Canvas>
  )
}