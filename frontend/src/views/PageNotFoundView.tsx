import MenuButtonWidget from "../components/ui/MenuButtonWidget"
import styles from "./PageNotFoundView.module.css"
import { useNavigate } from "react-router-dom"

export default function PageNotFoundView() {
  const navigate = useNavigate()

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.title}>404 Error</div>
        <div className={styles.description}>Page Not Found...</div>
        <MenuButtonWidget 
          text="Go to Game Menu"
          clickEvent={ () => navigate("/") }
        />
      </div>
    </div>
  )
}