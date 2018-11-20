import {
  LOGIN_USER,
  LOGGED_IN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  UPDATE_LOGIN_STATUS
} from "../actionTypes";

export const loginUser = () => ({
  type: LOGIN_USER
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const loggedInUser = payload => ({
  type: LOGGED_IN_USER,
  payload
});

export const loginError = payload => ({
  type: LOGIN_ERROR,
  payload
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const loginUserAsync = (payload, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    login(payload).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          history.push("/");
          dispatch({ type: LOGIN_SUCCESS, payload: body });
        });
      } else {
        dispatch({ type: LOGIN_ERROR, payload: {} });
      }
    });
  };
};

export const logoutUser = history => {
  return dispatch => {
    doLogout().then(res => {
      if (res === 204) {
        history.push("/");
        dispatch({ type: LOGOUT_SUCCESS });
      }
    });
  };
};

export const checkUserToken = () => {
  return dispatch => {
    return checkLoggedInState().then(res => {
      if (res === 401) {
        dispatch({ type: UPDATE_LOGIN_STATUS, payload: { user: undefined } });
        return;
      }
      if (res.status === 200) {
        res.json().then(body => {
          dispatch({ type: UPDATE_LOGIN_STATUS, payload: { user: body } });
          return true;
        });
      }
    });
  };
};

const doLogout = async () => {
  const url = "/api/logout";

  let response;

  try {
    response = await fetch(url, { method: "post" });
  } catch (err) {
    console.log("Issues logging out user.");
    return 500;
  }

  return response.status;
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

  return response;
};

const checkLoggedInState = async () => {
  const url = "/api/user";
  let response;
  try {
    response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return;
  }

  return response;
};
