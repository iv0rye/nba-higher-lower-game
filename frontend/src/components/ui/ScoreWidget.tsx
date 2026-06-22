import styles from './ScoreWidget.module.css'

interface ScoreWidgetProps {
  score: number
}

export default function ScoreWidget({ score }: ScoreWidgetProps) {
  return (
    <div className={styles.panel}>
      <span className={styles.label}>Score</span>
      <span className={styles.value}>{score}</span>
    </div>
  )
}