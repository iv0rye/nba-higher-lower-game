import MenuWidget from "../components/ui/MenuWidget";
import styles from "./MenuView.module.css"

export default function EndGameView() {
  return(
    <div className={styles.overlay}>
      <MenuWidget />
    </div>
  )
}