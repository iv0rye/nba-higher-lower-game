/**
 * idea: each useFrame hook in different components runs on a priority based order each frame.
 * some frames, eg. movement, should run before camera, as the camera frame depends on movement.
 * priorities are set here and should be used every time it is important.
 * 
 * cleanup (eg. flushing input) should be towards the end
 */
export const FRAME_PRIORITIES = {
	MOVEMENT: 1,
  INPUT_FLUSH: 100,     // cleanup - runs last: clears justPressed/justReleased for next frame
} as const