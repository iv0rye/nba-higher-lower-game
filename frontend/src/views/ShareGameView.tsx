import { useNavigate, useParams } from "react-router-dom"
import MenuButtonWidget from "../components/ui/MenuButtonWidget"
import RoundHistoryWidget from "../components/ui/RoundHistoryWidget"
import { useGameHistory } from "../hooks/useGameHistory"
import styles from "./ShareGameView.module.css"

export default function ShareGameView() {
  const navigate = useNavigate()
  const { sessionToken } = useParams()

  if (!sessionToken) {
    return (
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <span className={styles.title}>No session token provided.</span>
          <MenuButtonWidget 
            text="Play Game" 
            clickEvent={() => navigate('/')} 
            height="5vh"
          />
        </div>
      </div>
    )
  }

  const { history, loading } = useGameHistory(sessionToken)

  return(
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <span className={styles.title}>Game Played:</span>
        <span className={styles.score}>{history?.score}</span>
        {loading && <span className={styles.loading}>Loading...</span>}

        {history && <RoundHistoryWidget rounds={history.rounds} />}

        <MenuButtonWidget 
          text="Play Game" 
          clickEvent={() => navigate('/')} 
          height="5vh"
        />

      </div>
    </div>
  )
}