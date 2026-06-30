import { useGameEngine } from "../../hooks/useGameEngine"
import { useIncreasingNumber } from "../../hooks/useIncreasingNumber"
import { useGameStore } from "../../stores/useGameStore"
import styles from "./PlayerCardWidget.module.css"

interface Props {
  name: string,
  headshotURL?: string | null,
  statLabel: string,
  stat?: number,
  isIncrementing?: boolean
}

export default function PlayerCardWidget({ name, headshotURL, statLabel, stat, isIncrementing=false }: Props) {
  const phase = useGameStore((state) => state.phase)
  const { handleNextRound } = useGameEngine()
  let displayValue

  if (isIncrementing) {
    const isRevealing = phase === 'revealing'
    const displayedStat = useIncreasingNumber(stat, handleNextRound).toFixed(2)

    displayValue = stat ? (isRevealing ? displayedStat : '???') : '???'
  } else {
    displayValue = stat ? stat : '???'
  }

  return(
    <div className={styles.panel}>
      { headshotURL && 
      <img 
        src={headshotURL} 
        alt={name}
        className={styles.headshot} 
      />
      }

      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.statLabel}>{statLabel}</span>
        <span className={styles.stat}>{displayValue}</span>
      </div>
    </div>
  )
}
