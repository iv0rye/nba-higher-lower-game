import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Court from './Court'
import Player from './Player'


export default function CourtScene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 14], fov: 55 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
      gl={{ antialias: true, toneMappingExposure: 0.3 }}
      shadows
    >
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

      <Court />
      <Player />

      <OrbitControls />
    </Canvas>
  )
}