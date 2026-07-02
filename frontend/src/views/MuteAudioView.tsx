import MenuButtonWidget from "../components/ui/MenuButtonWidget"
import { useSettingsStore } from "../stores/useSettingsStore"
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";

export default function MuteAudioView() {
  const bgmMuted = useSettingsStore((state) => state.bgmMuted)
  const setBgmMuted = useSettingsStore((state) => state.setBgmMuted)

  return (
    <MenuButtonWidget 
      icon={bgmMuted ? <BiSolidVolumeMute size={30}/> : <BiSolidVolumeFull size={30}/>}
      clickEvent={() => setBgmMuted(!bgmMuted)}
      height="5vh"
      aspectRatio="1"
    />
  )
}