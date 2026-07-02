import { useState } from "react"
import styles from "./SessionShareWidget.module.css"

interface SessionShareWidgetProps {
  sessionToken: string
}

export default function SessionShareWidget({ sessionToken }: SessionShareWidgetProps) {
  const shareURL = `${window.location.origin}/share/${sessionToken}`
  const [label, setLabel] = useState(shareURL)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareURL)

      setLabel("Copied to clipboard!")

      setTimeout(() => {
        setLabel(shareURL)
      }, 1500)
    } catch (err) {
      setLabel("Failed to copy")

      setTimeout(() => {
        setLabel(shareURL)
      }, 1500)
    }
  }

  return (
    <div className={styles.panel}>
      <span className={styles.label}>Share this game with a friend:</span>
      <button onClick={handleCopyClick}>
        {label}
      </button>
    </div>
  )
}