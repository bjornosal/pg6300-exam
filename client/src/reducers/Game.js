import {
  AUTH_USER_SOCKET,
  AUTH_USER_SOCKET_ERROR,
  START_GAME,
  JOIN_GAME,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  HOST_GAME,
  HOST_CHANGE,
  NEW_HOST,
  GAME_STARTING,
  GAME_STARTED,
  NEXT_QUESTION,
  LAST_QUESTION,
  GAME_SCORES
} from "../actionTypes";

const game = (state = [], action) => {
  switch (action.type) {
    case AUTH_USER_SOCKET:
      return { ...state, loginError: false };
    case AUTH_USER_SOCKET_ERROR:
      return { ...state, loginError: true, errorMsg: action.payload };
    case START_GAME:
      return {
        ...state,
        loginError: false,
        errorMsg: "TRYING TO START THE GAME"
      };
    case HOST_GAME:
      return {
        ...state,
        [action.room]: {
          players:
            state.players && state.players.length > 0
              ? [...state[action.room].players, action.username]
              : action.username,
          isHost: action.isHost,
          host: action.username,
          quizName: action.quizName,
          amountOfQuestions: action.amountOfQuestions
        }
      };
    case JOIN_GAME:
      return {
        ...state,
        [action.room]: {
          players: action.players,
          host: action.host,
          quizName: action.quizName,
          amountOfQuestions: action.amountOfQuestions
        }
      };
    case PLAYER_JOIN:
      if (!state[action.room].players.includes(action.username)) {
        return {
          ...state,
          [action.room]: {
            ...state[action.room],
            players:
              state[action.room].players instanceof Array
                ? [...state[action.room].players, action.username]
                : [state[action.room].players, action.username]
          }
        };
      }
      return state;

    case PLAYER_LEAVE:
      let playerIndex = state[action.room].players.indexOf(action.username);
      /**
       * Source for removing with spread operator to keep immutability.
       * https://til.hashrocket.com/posts/ae2aa38f6a-immutable-remove-with-the-spread-operator
       */
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          players: [
            ...state[action.room].players.slice(0, playerIndex),
            ...state[action.room].players.slice(
              playerIndex + 1,
              playerIndex.length
            )
          ]
        }
      };
    case HOST_CHANGE:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          host: action.username
        }
      };
    case NEW_HOST:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          isHost: true
        }
      };
    case GAME_STARTING:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          isStarting: true,
          question: action.question,
          answers: action.answers
        }
      };
    case GAME_STARTED:

      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          isStarting: false,
          isStarted: true
        }
      };
    case NEXT_QUESTION:

      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          question: action.question,
          answers: action.answers,
          isStarting: true,
          isStarted: false
        }
      };
    case LAST_QUESTION:

      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          question: action.question,
          answers: action.answers,
          isStarting: true,
          isStarted: false,
          lastQuestion: action.lastQuestion
        }
      };
    case GAME_SCORES:

      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          scores: action.scores
        }
      };
    default:
      return state;
  }
};

export default game;
