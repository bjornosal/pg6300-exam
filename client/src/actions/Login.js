import {
  LOGIN_USER,
  LOGGED_IN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "../actionTypes";

export const loginUser = payload => ({
  type: LOGIN_USER,
//   payload
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loggedInUser = payload => ({
  type: LOGGED_IN_USER,
  payload
});

export const loginError = payload => ({
  type: LOGIN_ERROR,
  payload
});

export const loginUserAsync = (payload, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    login(payload).then(res => {
      if (res === 204) {
        history.push("/");
        dispatch({ type: LOGIN_SUCCESS, payload: "123" });
      } else {
        dispatch({ type: LOGIN_ERROR, payload: "321" });
      }
    });
  };
};

const login = async values => {
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
