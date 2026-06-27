const STAT_CAT_LABEL_TO_DISPLAY: Record<string, string> = {
  'games':     'games played',
  'seasons':   'seasons played',
  'pts':       'points',
  'ast':       'assists',
  'reb':       'rebounds',
  'stl':       'steals',
  'blk':       'blocks',
  'fgm':       'field goals made',
  'ftm':       'free throws made',
  '3pm':       'three pointers made',
  'ppg':       'points per game',
  'apg':       'assists per game',
  'rpg':       'rebounds per game',
  'spg':       'steals per game',
  'bpg':       'blocks per game',
  'fg_pct':    'field goal percentage',
  'three_pct': 'three point percentage',
  'ft_pct':    'free throw percentage'
}

export function catLabelToDisplayText(category_label: string) {
	return STAT_CAT_LABEL_TO_DISPLAY[category_label.toLowerCase()] ?? category_label
}