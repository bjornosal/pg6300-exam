import { combineReducers } from "redux"
import login from './Login'
import signUp from './SignUp'
import game from './Game'
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    login,
    signUp,
    game,
    form: formReducer,
})