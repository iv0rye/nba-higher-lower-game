import styles from "./PlayerCardWidget.module.css"

interface Props {
  name: string,
  headshotURL: string,
  statLabel: string,
  stat?: number | string
}

export default function PlayerCardWidget({ name, headshotURL, statLabel, stat="???" }: Props) {
  return(
    <div className={styles.panel}>
      <img 
        src={headshotURL} 
        alt={name}
        className={styles.headshot} 
      />

      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.statLabel}>{statLabel}</span>
        <span className={styles.stat}>{stat}</span>
      </div>
    </div>
  )
}
