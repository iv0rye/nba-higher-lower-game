import { useGameStateStore } from "../../stores/useGameStateStore"
import styles from "./MenuWidget.module.css"

export default function MenuWidget() {
  const setGameState = useGameStateStore((state) => state.setGameState)

  return (
    <div className={styles.panel}>
      <img src="/ui/logo.png" alt="Logo" className={styles.logo}/>

      <button 
        className={styles.button}
        onClick={() => setGameState('playing')}
      >
        Start Game
      </button>

      <button 
        className={styles.button}
      >
        How To Play
      </button>

      <button 
        className={styles.button}
      >
        Search Game
      </button>

      <div className={styles.credit}>
        created by <a href="https://github.com/iv0rye" target="_blank" className={styles.credit}>iv0rye</a> :)
      </div>
    </div>
  )
}