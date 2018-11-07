import {
  LOGIN_USER,
  LOGGED_IN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from "../actionTypes";

export const loginUser = payload => ({
  type: LOGIN_USER
  //   payload
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
      // console.log("reslt from query", );

      if (res.status === 200) {
        res.json().then(body => {
          history.push("/");
          dispatch({ type: LOGIN_SUCCESS, payload: body });
        });
      } else {
        dispatch({ type: LOGIN_ERROR, payload: "LOGIN ERROR" });
      }
    });
  };
};

export const logoutUser = (history) => {
  return dispatch => {

    doLogout().then(res => {
        if(res === 204) {
            history.push("/");
            dispatch({ type: LOGOUT_SUCCESS });
        }
    }) 
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
