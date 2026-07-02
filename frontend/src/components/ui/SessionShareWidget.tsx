import styles from "./SessionShareWidget.module.css"

interface SessionShareWidgetProps {
  sessionToken: string
}

export default function SessionShareWidget({ sessionToken }: SessionShareWidgetProps) {
  const shareURL = `${window.location.origin}/share/${sessionToken}`

  return (
    <div className={styles.panel}>
      <span className={styles.label}>Share this game with a friend:</span>
      <button onClick={() => navigator.clipboard.writeText(shareURL)}>
        {shareURL}
      </button>
    </div>
  )
}