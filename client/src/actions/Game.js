import { AUTH_USER_SOCKET, START_GAME, AUTH_USER_SOCKET_ERROR } from "../actionTypes";

export const authUserSocket = () => ({
  type: AUTH_USER_SOCKET
});

export const failAuthUserSocket = payload => ({
  type: AUTH_USER_SOCKET_ERROR,
  payload
});

export const startGame = payload => ({
  type: START_GAME,
  payload
});

export const authenticateUserSocket = socket => {
  return dispatch => {
    authenticateSocket(socket).then(res => {
      if (res.status === 201) {
        dispatch(authUserSocket());
        dispatch(startGame);
      } else {
        dispatch(failAuthUserSocket(res));
      }
    });
  };
};

/**
 * @author arcuri82
 * Code from course material in PG6300, by lecturer Andrea Arcuri.
 */
const authenticateSocket = async socket => {
  const url = "/api/wstoken";

  let response;

  try {
    response = await fetch(url, {
      method: "post"
    });
  } catch (err) {
    return "Failed to connect to server: " + err;
  }

  if (response.status === 401) {
    return "You need to login first.";
  }

  if (response.status !== 201) {
    return "Error when connecting to server: status code " + response.status;
  }

  const payload = await response.json();

  socket.emit("login", payload);
  return response;
};