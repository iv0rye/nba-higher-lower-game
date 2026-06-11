from src.models import Player

PLAYER_CATEGORY = {
    "games": Player.total_games_played,
    "seasons": Player.seasons_played,

    "pts": Player.career_pts,
    "ast": Player.career_ast,
    "reb": Player.career_reb,
    "stl": Player.career_stl,
    "blk": Player.career_blk,

    "fgm": Player.career_fgm,
    "ftm": Player.career_ftm,
    "3pm": Player.career_three_pm,

    "ppg": Player.career_ppg,
    "apg": Player.career_apg,
    "rpg": Player.career_rpg,
    "spg": Player.career_spg,
    "bpg": Player.career_bpg,

    "fg_pct": Player.career_fg_percentage,
    "three_pct": Player.career_three_percentage,
    "ft_pct": Player.career_ft_percentage,
}