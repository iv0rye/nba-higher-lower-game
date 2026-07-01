import EndGameWidget from "../components/ui/EndGameWidget"
import styles from "./MenuView.module.css"

// note: make sure to call reset() from game store once try again is clicked
export default function EndGameView() {
  return(
    <div className={styles.overlay}>
      <EndGameWidget />
    </div>
  )
}