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

export const loginUserAsync = (payload, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    login(payload).then(res => {
        // console.log("reslt from query", );
        
      if (res.status === 200) {
          res.json().then(body => {
              history.push("/");
              dispatch({ type: LOGIN_SUCCESS, payload: body });
             })
      } else {
        dispatch({ type: LOGIN_ERROR, payload: "LOGIN ERROR" });
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

  return response;
};
