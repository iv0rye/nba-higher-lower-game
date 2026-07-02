import { useGameHistory } from "../../hooks/useGameHistory";
import { useGameStore } from "../../stores/useGameStore";
import MenuButtonWidget from "./MenuButtonWidget";
import styles from "./EndGameWidget.module.css"
import PlayerCardWidget from "./PlayerCardWidget";
import type { GetGameRoundResponse } from "../../types/api";
import { getHighScore } from "../../utils/highScore";

function getGuessLabel(round: GetGameRoundResponse): string {
  if (round.guess_a_higher_b === null) return 'none'
  return round.guess_a_higher_b ? 'higher' : 'lower'
}

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

      <div className={styles.rounds}>

        {/* creates a scrollbox with each round in the game just played */}
        {history?.rounds.map((round, i) => (
          <div key={round.id} className={styles.round}>

            <span className={styles.roundNumber}>Round {i + 1}</span>

            <span>
              You guessed <b>{round.player_a.name}</b> had a 
              <b> {getGuessLabel(round)} {round.player_a.stat_category.toUpperCase()} </b>
              than <b>{round.player_b.name}</b> 
            </span>

            <div className={styles.players}>

              <PlayerCardWidget
                name={round.player_a.name}
                headshotURL={round.player_a.photo_url}
                statLabel={round.player_a.stat_category}
                stat={round.player_a.stat_value}
              />

              <PlayerCardWidget
                name={round.player_b.name}
                headshotURL={round.player_b.photo_url}
                statLabel={round.player_b.stat_category}
                stat={round.player_b.stat_value}
              />

            </div>

          </div>
          
        ))}
      </div>

      <MenuButtonWidget 
        text="Play Again" 
        clickEvent={reset} 
        height="5vh"
      />

    </div>
  )
}