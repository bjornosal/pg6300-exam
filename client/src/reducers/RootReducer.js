import { combineReducers } from "redux"
import login from './Login'
import Leaderboard from './Leaderboard'
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    login,
    Leaderboard,
    form: formReducer,
})