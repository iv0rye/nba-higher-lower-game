import { useGLTF } from "@react-three/drei"

const ANIMATIONS = [
  'CharacterArmature|Idle',
  'CharacterArmature|Run',
  'CharacterArmature|Victory',
  'CharacterArmature|Death',
  'CharacterArmature|Defeat',
] as const

type AnimationName = typeof ANIMATIONS[number]

interface PlayerProps {
  animation?: AnimationName
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function Player(
{ 
  animation = 'CharacterArmature|Idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0]
} : PlayerProps) {

  const { scene } = useGLTF('/models/character.glb')

  return(
    <primitive object={scene} />
  )
}