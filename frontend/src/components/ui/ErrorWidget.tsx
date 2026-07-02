import { useNavigate } from "react-router-dom"
import styles from "./ErrorWidget.module.css"
import MenuButtonWidget from "./MenuButtonWidget"

interface ErrorWidgetProps {
  title: string
  description: string
}

export default function ErrorWidget({ title, description }: ErrorWidgetProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.panel}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <MenuButtonWidget 
        text="Go to Game Menu"
        clickEvent={ () => navigate("/") }
      />
    </div>
  )
}