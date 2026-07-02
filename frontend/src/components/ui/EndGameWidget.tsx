import { useGameHistory } from "../../hooks/useGameHistory";
import { useGameStore } from "../../stores/useGameStore";
import MenuButtonWidget from "./MenuButtonWidget";
import styles from "./EndGameWidget.module.css"
import { getHighScore } from "../../utils/highScore";
import RoundHistoryWidget from "./RoundHistoryWidget";

export default function EndGameWidget() {
  const { score, sessionToken, statCategory } = useGameStore.getState()
  const reset = useGameStore((state) => state.reset)
  const { history, loading } = useGameHistory(sessionToken)
  const highScore = getHighScore(statCategory)
  
  const isNewHighScore = score >= highScore

  return (
    <div className={styles.panel}>
      <span className={styles.title}>Game over... Your score was:</span>
      <span className={styles.score}>{score}</span>

      {isNewHighScore
        ? <span><b>New High Score!</b></span>
        : <span>High Score: <b>{highScore}</b></span>
      }

      {loading && <span className={styles.loading}>Loading...</span>}

      {history && <RoundHistoryWidget rounds={history.rounds} />}

      <MenuButtonWidget 
        text="Play Again" 
        clickEvent={reset} 
        height="5vh"
      />

    </div>
  )
}