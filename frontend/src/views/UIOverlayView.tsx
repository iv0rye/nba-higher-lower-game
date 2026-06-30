import PlayerCardWidget from "../components/ui/PlayerCardWidget";
import ScoreWidget from "../components/ui/ScoreWidget";
import TimerWidget from "../components/ui/TimerWidget";
import { useGameStore } from "../stores/useGameStore";
import styles from "./UIOverlayView.module.css"

export default function UIOverlayView() {
  const playerA = useGameStore((state) => state.playerA)
  const playerB = useGameStore((state) => state.playerB)
  const playerBRevealed = useGameStore((state) => state.playerBRevealed)
  const score = useGameStore((state) => state.score)
  const timeLeft = useGameStore((state) => state.timeLeft)
  const statCategory = useGameStore((state) => state.statCategory)
  
  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        { playerA && 
          <PlayerCardWidget 
            name={playerA.name} 
            headshotURL={playerA.photo_url} 
            statLabel={playerA.stat_category} 
            stat={playerA.stat_value} 
          />
        }

        <ScoreWidget score={score} />

        { playerB && 
          <PlayerCardWidget 
            name={playerB.name} 
            headshotURL={playerB.photo_url} 
            statLabel={playerB.stat_category} 
            stat={playerBRevealed ? playerBRevealed.stat_value : undefined} 
          />
        }
      </div>
      <div className={styles.bottom}>
        { playerA && playerB && 
          <TimerWidget 
            playerAName={playerA.name} 
            playerBName={playerB.name} 
            timeLeft={timeLeft}
            statCategory={statCategory ? statCategory.toUpperCase() : undefined}
          />
        }
      </div>
    </div>
  )
}