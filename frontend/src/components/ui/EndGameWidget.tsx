import { useGameHistory } from "../../hooks/useGameHistory";
import { useGameStore } from "../../stores/useGameStore";

export default function EndGameWidget() {
  const { score, sessionToken } = useGameStore.getState()
  const { history, loading } = useGameHistory(sessionToken)
}