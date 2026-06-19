import { useGLTF, useTexture } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from 'three'

export default function Court() {
  const { scene } = useGLTF('/models/basketball_court.glb')
  const texture = useTexture('/models/basketball_court.png')

  useEffect(() => {
    texture.flipY = true
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        // map texture of court onto court flour (plane001)
        if (mesh.name === 'Plane001') {
          mesh.material = new THREE.MeshLambertMaterial({ map: texture })
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