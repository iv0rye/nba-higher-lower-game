import ScoreWidget from "../components/ui/ScoreWidget";

export default function UIOverlayView() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',  // let clicks pass through to canvas
      zIndex: 1,
    }}>
      <ScoreWidget score={0}/>
    </div>
  )
}