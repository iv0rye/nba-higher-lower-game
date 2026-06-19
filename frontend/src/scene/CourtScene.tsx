import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, useTexture, Stars, Environment } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { Bloom, EffectComposer, Scanline, Vignette } from '@react-three/postprocessing'

function Court() {
  const { scene } = useGLTF('/models/basketball_court.glb')
  const texture = useTexture('/models/basketball_court.png')

  useEffect(() => {
    texture.flipY = false
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        // map texture of court onto court flour (plane001)
        if (mesh.name === 'Plane001') {
          mesh.material = new THREE.MeshStandardMaterial({ map: texture })
        }
        // remove model baseplate (plane002)
        else if (mesh.name === 'Plane002') {
          mesh.visible = false
        }
      }
    })
  }, [scene, texture])

  return <primitive object={scene} scale={2} />
}

export default function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 14], fov: 55 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
      gl={{ antialias: true }}
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
      <ambientLight intensity={0.1} color="#aaaaaa" />
      <Environment preset="night" />

      <Court />

      <EffectComposer>
        <Vignette darkness={0.7} /> 
      </EffectComposer>

      <OrbitControls />
    </Canvas>
  )
}