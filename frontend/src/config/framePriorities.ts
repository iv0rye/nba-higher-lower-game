/**
 * IMPORTANT: this feature is bugged for some reason so try not to use. will keep just in case
 * 
 * idea: each useFrame hook in different components runs on a priority based order each frame.
 * some frames, eg. movement, should run before camera, as the camera frame depends on movement.
 * priorities are set here and should be used every time it is important.
 * the higher the value, the earlier it runs
 * cleanup (eg. flushing input) should be towards the end
 */
export const FRAME_PRIORITIES = {
	MOVEMENT: 0,
  INPUT_FLUSH: 0,     // cleanup - runs last: clears justPressed/justReleased for next frame
} as const