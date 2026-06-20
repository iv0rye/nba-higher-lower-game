import * as THREE from "three"

interface Props {
  playerRef: React.RefObject<THREE.Group | null>
	actions: Partial<Record<string, THREE.AnimationAction>>
}

export function usePlayerAnimation({ actions, playerRef }: Props) {}