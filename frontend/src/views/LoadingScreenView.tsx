import { Slab } from "react-loading-indicators";
import styles from "./LoadingScreenView.module.css"

export default function LoadingScreenView() {
  return (
    <div className={styles.overlay}>
      <Slab color={["#ffffff", "#686868"]} size="medium" text="Loading Game" textColor="" />
    </div>
  )
}