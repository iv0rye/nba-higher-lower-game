import styles from "./PlayerCardWidget.module.css"

export default function PlayerCardWidget() {
  return(
    <div className={styles.panel}>
      <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" alt="name" className={styles.headshot} />
    </div>
  )
}
