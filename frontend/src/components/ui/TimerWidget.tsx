import styles from "./TimerWidget.module.css"

interface Props {
  playerAName: string
  playerBName: string
  timeLeft?: number
  statCategory?: string | null
}

export default function TimerWidget({ playerAName, playerBName, timeLeft=5, statCategory='PPG' }: Props) {
  // TODO: probably want to have a hashmap or some sort to convert abbr. of stat category to actual words
  return(
    <div className={styles.panel}>
      <span className={styles.question}>
        Does <b>{playerAName}</b> have a higher <b>{statCategory}</b> than <b>{playerBName}</b>?
      </span>
      <span className={styles.timer}>{timeLeft}</span>
    </div>
  )
}