export default (state = [], action) => {
    switch (action.type) {
        case "INCREASE_GAMES_PLAYED":
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