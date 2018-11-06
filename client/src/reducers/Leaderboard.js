import { INCREASE_GAMES_PLAYED } from "../actionTypes";

const leaderboard = (state = [], action) => {
    switch (action.type) {
        case INCREASE_GAMES_PLAYED:
            console.log("INCREASED THE GAMES")
            return [...state, {
                //Information for the stuff
            }]
        case "SET_HIGHSCORE":
            return [...state, {
                //What to change
            }]
        default:
            return state;
    }
}

export default leaderboard;