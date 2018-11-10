import {
  AUTH_USER_SOCKET,
  START_GAME,
  LOGIN_ERROR,
  JOIN_GAME,
  PLAYER_JOIN,
  HOST_GAME,
  PLAYER_LEAVE,
  NEW_HOST,
  HOST_CHANGE,
  GAME_STARTING,
  GAME_STARTED
} from "../actionTypes";

export const authUserSocket = () => ({
  type: AUTH_USER_SOCKET
});

export const startGame = payload => ({
  type: START_GAME,
  payload
});

export const hostGame = (room, username, isHost, quiz) => ({
  type: HOST_GAME,
  room,
  username,
  isHost,
  quiz
});

export const joinGame = (room, players, host, quiz) => ({
  type: JOIN_GAME,
  room,
  players,
  host,
  quiz
});

export const playerJoin = (room, username) => ({
  type: PLAYER_JOIN,
  room,
  username
});

export const playerLeave = (room, username) => ({
  type: PLAYER_LEAVE,
  room,
  username
});

export const newHost = room => ({
  type: NEW_HOST,
  room
});

export const hostChange = (room, username) => ({
  type: HOST_CHANGE,
  room,
  username
});

const startingQuiz = (room, question) => ({
  type: GAME_STARTING,
  room,
  question
});

export const startingGame = (room, question) => {
  return dispatch => {
    dispatch(startingQuiz(room, question));
    setTimeout(() => {
      dispatch({ type: GAME_STARTED, room });
    }, 5000);
  };
};

export const authenticateUserSocket = (socket, history) => {
  return dispatch => {
    authenticateSocket(socket).then(res => {
      if (res.status === 201) {
        dispatch(authUserSocket());
        dispatch(startGame);
      } else {
        history.push("/login");
        dispatch({ type: LOGIN_ERROR });
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
