import type { GetGameRoundResponse } from "../../types/api"
import PlayerCardWidget from "./PlayerCardWidget"
import styles from "./RoundHistoryWidget.module.css"

interface Props {
  rounds: GetGameRoundResponse[]
}

function getGuessLabel(round: GetGameRoundResponse): string {
  if (round.guess_a_higher_b === null) return 'none'
  return round.guess_a_higher_b ? 'higher' : 'lower'
}

export default function RoundHistoryWidget({ rounds }: Props) {
  return (
    <div className={styles.rounds}>

      {rounds.map((round, i) => (
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
  )
}