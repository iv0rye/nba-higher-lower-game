import MenuWidget from "../components/ui/MenuWidget";
import styles from "./MenuView.module.css"

export default function MenuView() {
  return(
    <div className={styles.overlay}>
      <MenuWidget />
    </div>
  )
}