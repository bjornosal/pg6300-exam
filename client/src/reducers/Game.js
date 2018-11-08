import { AUTH_USER_SOCKET, AUTH_USER_SOCKET_ERROR, START_GAME } from "../actionTypes";

const game = (state = [], action) => {
  switch (action.type) {
    case AUTH_USER_SOCKET:
      console.log(AUTH_USER_SOCKET);
      return {
        ...state,
        loginError: false,
        errorMsg: "UNKNOWN ERROR"
      };
    case AUTH_USER_SOCKET_ERROR:
      console.log(AUTH_USER_SOCKET_ERROR);
      return {
        ...state,
        loginError: true,
        errorMsg: action.payload
      };
    case START_GAME:
      console.log(START_GAME);
      return {
        ...state,
        loginError: false,
        errorMsg: "TRYING TO START THE GAME"
      };
    default:
      return state;
  }
};

export default game;
