import styles from "./MenuButtonWidget.module.css"

interface MenuButtonWidgetProps {
  text: string
  clickEvent?: () => void
}

export default function MenuButtonWidget({ text, clickEvent=() => {} }: MenuButtonWidgetProps) {
  return(
    <button 
      className={styles.button}
      onClick={clickEvent}
    >
      {text}
    </button>
  )
}