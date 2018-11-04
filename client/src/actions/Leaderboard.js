import { SET_HIGHSCORE, INCREASE_GAMES_PLAYED } from "../actionTypes";

export const setHighscore = (payload) => ({
  type: SET_HIGHSCORE,
  payload
});

export const increaseGamesPlayed = (payload) => ({
    type: INCREASE_GAMES_PLAYED,
    payload
});
