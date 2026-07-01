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
      onClick={clickEvent}
    >
      {text}
    </button>
  )
}