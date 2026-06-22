import styles from "./TimerWidget.module.css"

interface Props {
  playerAName: string
  playerBName: string
  timeLeft?: number
}

export default function TimerWidget({ playerAName, playerBName, timeLeft=5 }: Props) {
  return(
    <div className={styles.panel}>
      <span className={styles.question}>
        Is {playerAName}'s PPG higher than {playerBName}'s?
      </span>
      <span className={styles.timer}>{timeLeft}</span>
    </div>
  )
}