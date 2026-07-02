import { useNavigate, useParams } from "react-router-dom"
import MenuButtonWidget from "../components/ui/MenuButtonWidget"
import RoundHistoryWidget from "../components/ui/RoundHistoryWidget"
import { useGameHistory } from "../hooks/useGameHistory"
import styles from "./ShareGameView.module.css"
import ErrorWidget from "../components/ui/ErrorWidget"

export default function ShareGameView() {
  const navigate = useNavigate()
  const { sessionToken } = useParams()

  if (!sessionToken) {
    return (
      <ErrorWidget 
        title="Invalid Session Token"
        description="There was no session token provided."
      />
    )
  }

  const { history, loading, error } = useGameHistory(sessionToken)

  if (error) {
    return (
      <ErrorWidget 
        title="Invalid Session Token"
        description="The session token provided is invalid. Please check the link and try again."
      />
    )
  }

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