import sounds from "../../audio/sounds"
import styles from "./MenuButtonWidget.module.css"

interface MenuButtonWidgetProps {
  text: string
  clickEvent?: () => void
  height?: string
  aspectRatio?: string
}

export default function MenuButtonWidget({ text, clickEvent=() => {}, height, aspectRatio }: MenuButtonWidgetProps) {
  return(
    <button 
      className={styles.button}
      style={{
        height: height,
        aspectRatio: aspectRatio,
      }}
      onClick={() => {
        sounds.select.play()
        clickEvent?.()
      }}
      onMouseEnter={() => sounds.hover.play()}
    >
      {text}
    </button>
  )
}