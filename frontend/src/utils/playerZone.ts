import type { RefObject } from "react";
import * as THREE from 'three'

export function getPlayerZone(playerRef: RefObject<THREE.Group | null>): 'higher' | 'lower' {
	if (!playerRef.current)
		return 'higher'

	if (playerRef.current.position.x > 0)
		return 'higher'

	return 'lower'
}