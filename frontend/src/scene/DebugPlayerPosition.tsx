import { useFrame } from "@react-three/fiber"
import { usePlayerRefContext } from "../context/playerRefContext"

// delete this once main game logic is done
export default function DebugPlayerPosition() {
  const playerRef = usePlayerRefContext()
  useFrame(() => {
    if (playerRef.current)
      console.log(playerRef.current.position)
  })

  return null
}