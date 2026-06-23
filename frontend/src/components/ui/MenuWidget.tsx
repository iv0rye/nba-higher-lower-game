import { useGameStateStore } from "../../stores/useGameStateStore"
import MenuButtonWidget from "./MenuButtonWidget"
import styles from "./MenuWidget.module.css"

export default function MenuWidget() {
  const setGameState = useGameStateStore((state) => state.setGameState)

  return (
    <div className={styles.panel}>
      <img src="/ui/logo.png" alt="Logo" className={styles.logo}/>

      <MenuButtonWidget 
        text="Start Game"
        clickEvent={() => setGameState('playing')}
      />

      <MenuButtonWidget 
        text="How To Play"
        clickEvent={() => setGameState('playing')}
      />

      <MenuButtonWidget 
        text="Search"
        clickEvent={() => setGameState('playing')}
      />

      <div className={styles.credit}>
        created by <a href="https://github.com/iv0rye" target="_blank" className={styles.credit}>iv0rye</a> :)
      </div>
    </div>
  )
}