import { combineReducers } from "redux"
import login from './Login'
import signUp from './SignUp'
import Leaderboard from './Leaderboard'
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    login,
    signUp,
    Leaderboard,
    form: formReducer,
})