import { useGameStateStore } from "../../stores/useGameStateStore"
import styles from "./MenuWidget.module.css"

export default function MenuWidget() {
  const setGameState = useGameStateStore((state) => state.setGameState)

  return (
    <div className={styles.panel}>
      <button onClick={() => setGameState('playing')}>Start Game</button>
    </div>
  )
}