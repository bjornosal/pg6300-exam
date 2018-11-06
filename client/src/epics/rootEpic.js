import { combineEpics } from 'redux-observable';
import loginEpic from "./loginEpic"


export default combineEpics(
    loginEpic
)