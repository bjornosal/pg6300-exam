import { SIGN_UP_USER, SIGN_UP_ERROR, SIGN_UP_SUCCESS, LOGIN_SUCCESS } from "../actionTypes";

export const signUpUser = () => ({
  type: SIGN_UP_USER
});

export const signUpUserAsync = (payload, history) => {
  return dispatch => {
    doSignUp(payload).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          history.push("/");
          dispatch({ type: LOGIN_SUCCESS, payload: body });
          dispatch({ type: SIGN_UP_SUCCESS });
          return;
        });
      } else {
        dispatch({
          type: SIGN_UP_ERROR,
          payload: {
            errorMsg: res
          }
        });
      }
    });
  };
};

const doSignUp = async values => {
  if (values.confirm !== values.password) {
    return "Passwords do not match.";
  }

  const url = "/api/signup";
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
    return "Failed to connect to server";
  }

  if (response.status === 400) {
    return "Invalid username/password";
  }

  if (response.status !== 200) {
    return "Failed to connect to server";
  }
  return response;
};
