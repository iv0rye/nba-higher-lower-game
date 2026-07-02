import { Howl } from 'howler'

const sounds = {
  select:       new Howl({ src: ['/audio/sfx/sci_fi_select.wav'], volume: 0.5 }),
  hover:        new Howl({ src: ['/audio/sfx/sci_fi_hover.wav'], volume: 0.3 }),
  footstep:     new Howl({ src: ['/audio/sfx/footstep.wav'], volume: 0.07 }),
  lose:         new Howl({ src: ['/audio/sfx/lose_round.wav'], volume: 0.6 }),
  tick:         new Howl({ src: ['/audio/sfx/clock_tick.wav'], volume: 0.4 }),
  win:          new Howl({ src: ['/audio/sfx/win_round.wav'], volume: 0.6 }),

  menu_bgm: new Howl({ 
    src: ['/audio/bgm/8-bit-life-menu-bgm.wav'], 
    volume: 0.3, 
    loop: true
	}),
	in_game_bgm: new Howl({ 
    src: ['/audio/bgm/8-bit-rydeen-in-game-bgm.wav'], 
    volume: 0.3, 
    loop: true
	})
}

export default sounds