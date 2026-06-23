import MenuWidget from "../components/ui/MenuWidget";
import PlayerCardWidget from "../components/ui/PlayerCardWidget";
import ScoreWidget from "../components/ui/ScoreWidget";
import TimerWidget from "../components/ui/TimerWidget";
import styles from "./UIOverlayView.module.css"

export default function UIOverlayView() {
  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        <PlayerCardWidget name={"Lebron James"} headshotURL={"https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"} statLabel={"PPG"} stat={25} />
        <ScoreWidget score={0}/>
        <PlayerCardWidget name={"Bronny James"} headshotURL={"https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"} statLabel={"PPG"} />
      </div>
      <div className={styles.bottom}>
        <TimerWidget playerAName={"Lebron James"} playerBName={"Bronny James"} />
      </div>
    </div>
  )
}