import { Howl } from 'howler'

const sounds = {
  select:       new Howl({ src: ['/audio/sci_fi_select.wav'], volume: 0.5 }),
  hover:        new Howl({ src: ['/audio/sci_fi_hover.wav'], volume: 0.3 }),
  footstep:     new Howl({ src: ['/audio/footstep.wav'], volume: 0.07 }),
  lose:         new Howl({ src: ['/audio/lose_round.wav'], volume: 0.6 }),
  tick:         new Howl({ src: ['/audio/clock_tick.wav'], volume: 0.4 }),
  win:          new Howl({ src: ['/audio/win_round.wav'], volume: 0.6 }),
}

export default sounds