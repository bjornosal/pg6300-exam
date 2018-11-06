import { map, mapTo, mergeMap } from "rxjs/operators";
import { LOGIN_USER, LOGIN_ERROR, LOGIN_SUCCESS } from "../actionTypes";
import { ofType } from "redux-observable";

const handleLogin = async values => {
  const url = "/api/login";
  const payload = { username: values.username, password: values.password };

  let response;

  try {
    response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    return;
  }

  return response.status;
};

const loginEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action => {
      console.log("ACTION", action);
      return handleLogin(action.payload).then(res => {
        console.log("RESULT", res);
        if (res !== 204) return { type: LOGIN_ERROR };

        return {type: LOGIN_SUCCESS};
      });
    //   return {type: LOGIN_SUCCESS}
    })
  );

export default loginEpic;
