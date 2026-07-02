import ErrorWidget from "../components/ui/ErrorWidget"
import styles from "./PageNotFoundView.module.css"

export default function PageNotFoundView() {
  return (
    <div className={styles.overlay}>
      <ErrorWidget
        title="404 Error!"
        description="The page you are looking for does not exist."
      />
    </div>
  )
}