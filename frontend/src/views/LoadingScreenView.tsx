import { Slab } from "react-loading-indicators";
import styles from "./LoadingScreenView.module.css"
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoaded: () => void
}

export default function LoadingScreenView({ onLoaded }: LoadingScreenProps) {
  const { progress } = useProgress()
  const [dots, setDots] = useState(0)
  const [minTimePassed, setMinTimePassed] = useState(false)

  // detects when game loads
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinTimePassed(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  // load after 2 seconds AND progress is full
  useEffect(() => {
    if (minTimePassed && progress >= 100) {
      onLoaded()
    }
  }, [minTimePassed, progress, onLoaded])

  // loads dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.overlay}>
      <Slab 
        color={["#ffffff", "#686868"]} 
        size="medium" 
        text={"Loading Game" + ".".repeat(dots)} 
        textColor="" 
      />
    </div>
  )
}
