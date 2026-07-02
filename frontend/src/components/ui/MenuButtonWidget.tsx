import sounds from "../../audio/sounds"
import styles from "./MenuButtonWidget.module.css"
import type { ReactNode } from "react"

interface MenuButtonWidgetProps {
  icon?: ReactNode
  text?: string
  clickEvent?: () => void
  height?: string
  aspectRatio?: string
}

export default function MenuButtonWidget({ icon, text="", clickEvent=() => {}, height, aspectRatio }: MenuButtonWidgetProps) {
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
      {icon}
      {text}
    </button>
  )
}