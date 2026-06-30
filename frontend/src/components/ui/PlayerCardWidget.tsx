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

  const isRevealing = phase === 'revealing' && isIncrementing

  const displayedStat = useIncreasingNumber(
    isIncrementing ? stat : undefined, 
    isRevealing,
    isIncrementing ? handleNextRound : () => {}
  )

  // if
  const displayValue = 
    stat ? 
      isIncrementing ? 
        (isRevealing ? displayedStat : '???') : stat 
      : '???'

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
