import PlayerCardWidget from "../components/ui/PlayerCardWidget";
import ScoreWidget from "../components/ui/ScoreWidget";
import styles from "./UIOverlayView.module.css"

export default function UIOverlayView() {
  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        <PlayerCardWidget />
        <ScoreWidget score={0}/>
      </div>
    </div>
  )
}