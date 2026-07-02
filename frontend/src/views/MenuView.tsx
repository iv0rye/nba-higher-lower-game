import MenuButtonWidget from "../components/ui/MenuButtonWidget";
import { useGameEngine } from "../hooks/useGameEngine";
import { useSettingsStore } from "../stores/useSettingsStore";
import styles from "./MenuView.module.css"

export default function MenuView() {
  // note: testing purposes
  const setStatType = useSettingsStore((state) => state.setStatType)
  const setStatCategory = useSettingsStore((state) => state.setStatCategory)

  setStatType('career')
  setStatCategory('ppg')

  const { handleStartGame } = useGameEngine()
  
  return(
    <div className={styles.overlay}>
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
          text="Search Game Database"
        />

        <div className={styles.credit}>
          created by <a href="https://github.com/iv0rye" target="_blank" className={styles.credit}>iv0rye</a> :)
        </div>
      </div>
    </div>
  )
}