import { catLabelToDisplayText } from "../../utils/toDisplayText"
import styles from "./TimerWidget.module.css"

interface Props {
  playerAName: string
  playerBName: string
  timeLeft?: number
  statCategory?: string | null
}

export default function TimerWidget({ playerAName, playerBName, timeLeft=5, statCategory='PPG' }: Props) {
  return(
    <div className={styles.panel}>
      <span className={styles.question}>
        {/* TEMP: career **should** be swapped to statType attribute if seasons based is implemented */}
        Does <b>{playerAName}</b> have a higher career {catLabelToDisplayText(statCategory ?? 'ppg')} than <b>{playerBName}</b>?
      </span>
      <span className={styles.timer}>{timeLeft}</span>
    </div>
  )
}