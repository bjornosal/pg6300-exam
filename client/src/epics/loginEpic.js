import { mapTo } from "rxjs/operators";
import { LOGIN_USER, INCREASE_GAMES_PLAYED } from "../actionTypes";
import { ofType } from "redux-observable";

const loginEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mapTo({ type: INCREASE_GAMES_PLAYED })
  );

  export default loginEpic;