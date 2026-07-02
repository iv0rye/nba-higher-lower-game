import MenuButtonWidget from "../components/ui/MenuButtonWidget"
import RoundHistoryWidget from "../components/ui/RoundHistoryWidget"
import SessionShareWidget from "../components/ui/SessionShareWidget"
import { useGameHistory } from "../hooks/useGameHistory"
import { useGameStore } from "../stores/useGameStore"
import { getHighScore } from "../utils/highScore"
import styles from "./EndGameView.module.css"

export default function EndGameView() {
  const { score, sessionToken, statCategory } = useGameStore.getState()
  const reset = useGameStore((state) => state.reset)
  const { history, loading } = useGameHistory(sessionToken)
  const highScore = getHighScore(statCategory)
  
  const isNewHighScore = score >= highScore

  return(
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <span className={styles.title}>Game over... Your score was:</span>
        <span className={styles.score}>{score}</span>

        {isNewHighScore
          ? <span><b>New High Score!</b></span>
          : <span>High Score: <b>{highScore}</b></span>
        }

        {loading && <span className={styles.loading}>Loading...</span>}

        {history && <RoundHistoryWidget rounds={history.rounds} />}

        {sessionToken && <SessionShareWidget sessionToken={sessionToken} />}

        <MenuButtonWidget 
          text="Play Again" 
          clickEvent={reset} 
          height="5vh"
        />

      </div>
    </div>
  )
}