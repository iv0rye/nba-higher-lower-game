import { useGameStore } from "../../stores/useGameStore"
import MenuButtonWidget from "./MenuButtonWidget"
import styles from "./MenuWidget.module.css"
import { type StartGameRequest } from "../../types/api"
import { useGameEngine } from "../../hooks/useGameEngine"

export default function MenuWidget() {
  const setGameState = useGameStore((state) => state.setGameState)

  // note: testing purposes
  const startGameOptions: StartGameRequest = {
    type: 'career',
    category: 'ppg'
  }

  const { handleStartGame } = useGameEngine({ startGameOptions })

  return (
    <div className={styles.panel}>
      <img src="/ui/logo.png" alt="Logo" className={styles.logo}/>

      <MenuButtonWidget 
        text="Start Game"
        clickEvent={ handleStartGame }
      />

      <MenuButtonWidget 
        text="How To Play"
      />

      <MenuButtonWidget 
        text="Search"
      />

      <div className={styles.credit}>
        created by <a href="https://github.com/iv0rye" target="_blank" className={styles.credit}>iv0rye</a> :)
      </div>
    </div>
  )
}