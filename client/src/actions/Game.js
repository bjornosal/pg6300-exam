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
  GAME_STARTED,
  NEXT_QUESTION,
  LAST_QUESTION,
  FINISH_GAME,
  GAME_SCORES
} from "../actionTypes";

export const authUserSocket = () => ({
  type: AUTH_USER_SOCKET
});

export const startGame = payload => ({
  type: START_GAME,
  payload
});

export const hostGame = (
  room,
  username,
  isHost,
  quizName,
  amountOfQuestions
) => ({
  type: HOST_GAME,
  room,
  username,
  isHost,
  quizName,
  amountOfQuestions
});

export const joinGame = (room, players, host, quizName, amountOfQuestions) => ({
  type: JOIN_GAME,
  room,
  players,
  host,
  quizName,
  amountOfQuestions
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

const startingQuiz = (room, quizId, question, answers) => ({
  type: GAME_STARTING,
  room,
  quizId,
  question,
  answers
});

const newQuestion = (room, quizId, question, answers) => ({
  type: NEXT_QUESTION,
  room,
  quizId,
  question,
  answers
});

const lastQuestion = (room, quizId, question, answers) => ({
  type: LAST_QUESTION,
  room,
  quizId,
  question,
  answers,
  lastQuestion: true
});


//TODO: Does this work?
export const finishGame = (room, players, scores, socketId) => {
  return dispatch => {
    dispatch({ type: GAME_SCORES, room, scores });
  };
};

export const startingGame = (room, quiz, questionNumber) => {
  return dispatch => {
    if (quiz.questions.length - 1 === questionNumber) {
      dispatch(
        lastQuestion(
          room,
          quiz.quiz_id,
          quiz.questions[questionNumber].question,
          quiz.questions[questionNumber].answers
        )
      );
    } else {
      dispatch(
        newQuestion(
          room,
          quiz.quiz_id,
          quiz.questions[questionNumber].question,
          quiz.questions[questionNumber].answers
        )
      );
    }
    setTimeout(() => {
      dispatch({ type: GAME_STARTED, room });
    }, 3000);
  };
};

export const getNewQuestion = (room, quiz, questionNumber) => {
  return dispatch => {
    if (quiz.questions.length - 1 === questionNumber) {
      dispatch(
        lastQuestion(
          room,
          quiz.quiz_id,
          quiz.questions[questionNumber].question,
          quiz.questions[questionNumber].answers
        )
      );
    } else {
      dispatch(
        newQuestion(
          room,
          quiz.quiz_id,
          quiz.questions[questionNumber].question,
          quiz.questions[questionNumber].answers
        )
      );
    }
    setTimeout(() => {
      dispatch({ type: GAME_STARTED, room });
    }, 3000);
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

const updateUserScore = score => {
  //TODO: perform an api call and update the score of the user.
};
