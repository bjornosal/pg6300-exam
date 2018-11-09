import {
  AUTH_USER_SOCKET,
  AUTH_USER_SOCKET_ERROR,
  START_GAME,
  JOIN_GAME,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  HOST_GAME
} from "../actionTypes";

const game = (state = [], action) => {
  switch (action.type) {
    case AUTH_USER_SOCKET:
      console.log(AUTH_USER_SOCKET);
      return { ...state, loginError: false };
    case AUTH_USER_SOCKET_ERROR:
      console.log(AUTH_USER_SOCKET_ERROR);
      return { ...state, loginError: true, errorMsg: action.payload };
    case START_GAME:
      console.log(START_GAME);
      return {
        ...state,
        loginError: false,
        errorMsg: "TRYING TO START THE GAME"
      };
    case HOST_GAME:
      console.log(HOST_GAME);
      return {
        ...state,
        [action.room]: {
          players:
            state.players && state.players.length > 0
              ? [...state[action.room].players, action.username]
              : action.username,
          isHost: action.isHost,
          host: action.username,
          quiz: action.quiz
        }
      };
    case JOIN_GAME:
      console.log(JOIN_GAME);
      return {
        ...state,
        [action.room]: {
          players:action.players,
          host: action.host,
          quiz: action.quiz
        }
      };
    case PLAYER_JOIN:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
              players: [...state[action.room].players, action.username]
        }
      };
    case PLAYER_LEAVE:
      console.log(PLAYER_LEAVE);
      let playerIndex = state[action.room].players.indexOf(action.username);
      /**
       * Source for removing with spread operator to keep immutability.
       * https://til.hashrocket.com/posts/ae2aa38f6a-immutable-remove-with-the-spread-operator
       */
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
            players: [...state[action.room].players.slice(0,playerIndex),
            ...state[action.room].players.slice(playerIndex + 1,playerIndex.length)]
        }
      };
    default:
      return state;
  }
};

export default game;
