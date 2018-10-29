export const setHighscore = (player, score) => ({
  type: "SET_HIGHSCORE",
  player,
  score
});

export const increaseGamesPlayed = (player, score) => ({
    type: "INCREASE_GAMES_PLAYED",
    player,
    score
});
