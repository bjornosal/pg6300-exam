import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  authenticateUserSocket,
  hostGame,
  joinGame,
  playerJoin,
  playerLeave,
  hostChange,
  newHost,
  startingGame,
  getNewQuestion,
  finishGame
} from "../../actions/Game";
import { Link, withRouter } from "react-router-dom";

let currentRoom;

class Game extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line
    let countdown = null;
    // eslint-disable-next-line
    let questionCountdown = null;
    // eslint-disable-next-line
    let introQuestionTimer = null;
    // eslint-disable-next-line
    let finishQuestionTimer = null;
    this.state = {
      countdownTimer: 3,
      questionCountdownTimer: 10,
      answered: false
    };

    this.socket = undefined;
    currentRoom = null;
  }

  componentWillMount = () => {
    this.props.history.push("/game");
    this.socket = io("/games");
    this.authenticateSocket(this.socket);
    this.onHostEvent();
    this.onJoinGame();
    this.onPlayerJoin();
    this.onPlayerLeave();
    this.onHostChange();
    this.onAlreadyInRoom();
    this.onNewHost();
    this.onGameStart();
    this.onNewQuestion();
    this.onQuestionDone();
    this.onGameFinish();
  };

  componentWillUnmount = () => {
    this.socket.close();
    this.stopAllCountdownTimers();
  };

  onHostEvent = () => {
    this.socket.on("hostJoin", data => {
      currentRoom = data.room;
      this.props.hostGame(
        data.room,
        data.username,
        true,
        data.quiz.name,
        data.quiz.questions.length
      );
    });
  };

  onJoinGame = () => {
    this.socket.on("joinGame", data => {
      currentRoom = data.room;
      this.props.joinGame(
        data.room,
        data.players,
        data.host,
        data.quiz.name,
        data.quiz.questions.length
      );
    });
  };

  onPlayerJoin = () => {
    this.socket.on("playerJoin", data => {
      this.props.playerJoin(data.room, data.username);
    });
  };

  onPlayerLeave = () => {
    
    this.socket.on("playerLeave", data => {
      this.props.playerLeave(data.room, data.username);
    });
  };

  onNewHost = () => {
    this.socket.on("newHost", data => {
      this.props.newHost(data.room);
    });
  };

  onHostChange = () => {
    this.socket.on("hostChange", data => {
      this.props.hostChange(data.room, data.username);
    });
  };
  
  onAlreadyInRoom = () => {
    this.socket.on("alreadyInRoom", () => {
      this.props.history.push("/");
    });
  };

  onGameFinish = () => {
    this.socket.on("gameFinish", data => {
      this.props.finishGame(
        data.room,
        data.players,
        data.scores,
        this.socket.id
      );
    });
  };

  authenticateSocket = socket => {
    this.props.authenticateUserSocket(socket, this.props.history);
  };

  startGame = () => {
    this.socket.emit("startGame", currentRoom);
  };

  onGameStart = () => {
    this.socket.on("startingGame", data => {
      this.props.history.push("/game/" + data.room);
      this.props.startingGame(data.room, data.quiz, data.questionNumber);
      //TODO: Move the timers to server.
      this.startCountdownTimer();
      this.introQuestionTimer = setTimeout(() => {
        this.startQuestionCountdownTimer(10);
        this.finishQuestionTimer = setTimeout(() => {
          this.setState({
            questionDone: true
          });
        }, 10000);
      }, 3000);
    });
  };

  onNewQuestion = () => {
    this.socket.on("newQuestion", data => {
      this.stopAllCountdownTimers();
      this.stopFinishQuestionTimer();
      this.props.getNewQuestion(data.room, data.quiz, data.questionNumber);

      this.setState({
        countdownTimer: 3,
        questionCountdownTimer: 10,
        answered: false,
        questionDone: false
      });

      this.startCountdownTimer();
      //TODO: Move the timers to server.
      this.introQuestionTimer = setTimeout(() => {
        this.startQuestionCountdownTimer(10);
        this.finishQuestionTimer = setTimeout(() => {
          this.setState({
            questionDone: true
          });
        }, 10000);
      }, 3000);
    });
  };

  onQuestionDone = () => {
    this.socket.on("questionDone", () => {
      this.setState({
        questionDone: true
      });
    });
  };

  informWaitingForMorePlayers = () => {
    alert("Waiting for more players");
  };

  answerQuestion = answer => {
    this.socket.emit("answerQuestion", { room: currentRoom, answer });
    this.setState({ answered: true });
  };

  nextQuestion = () => {
    this.socket.emit("nextQuestion", { room: currentRoom });
  };

  stopAllCountdownTimers = () => {
    if (this.countdown !== null) {
      clearInterval(this.countdown);
    }
    if (this.questionCountdown !== null) {
      clearInterval(this.questionCountdown);
    }
  };

  stopFinishQuestionTimer = () => {
    if (this.finishQuestionTimer !== null) {
      clearTimeout(this.finishQuestionTimer);
    }
    if (this.introQuestionTimer !== null) {
      clearTimeout(this.introQuestionTimer);
    }
  };

  startCountdownTimer = () => {
    this.countdown = setInterval(() => {
      this.setState(state => {
        return { countdownTimer: state.countdownTimer - 1 };
      });
      if (this.state.countdownTimer === 0) clearInterval(this.countdown);
    }, 1000);
  };

  startQuestionCountdownTimer = questionTime => {
    this.setState({ questionCountdownTimer: questionTime });

    this.questionCountdown = setInterval(() => {
      this.setState(state => {
        return { questionCountdownTimer: state.questionCountdownTimer - 1 };
      });
      if (this.state.questionCountdownTimer === 0){
        clearInterval(this.questionCountdown);
        this.answerQuestion(-1);
      }
    }, 1000);
  };

  render() {
    return (
      <div className="gameContainer">
        {/* TODO: Move the entire container into it's own component */}
        {!this.props.isStarting && !this.props.isStarted && (
          <div className="gameInformationContainer">
            <div className="quizInformation">
              <h2 className="quizName">{this.props.quizName || "Quiz X"}</h2>
              <p className="quizQuestions">
                {this.props.amountOfQuestions
                  ? this.props.amountOfQuestions + " questions"
                  : "I don't know how many questions there are."}
              </p>
              <p className="quizHost">
                Hosted by:{" "}
                {(this.props.isHost ? "YOU" : "") ||
                  (this.props.host ? this.props.host : "Unknown")}
              </p>
            </div>
            <div className="playersContainer">
              {this.props.players && this.props.players instanceof Array ? (
                this.props.players.map((player, key) => (
                  <div key={key} className="player">
                    {player}
                  </div>
                ))
              ) : (
                  <div className="player">
                    {this.props.players ? this.props.players : "No players yet."}
                  </div>
                )}
            </div>
            <div className="buttonContainer">
              {this.props.isHost && (
                <button
                  className="quizButton startButton"
                  onClick={
                    this.props.players instanceof Array &&
                      this.props.players.length > 1
                      ? this.startGame
                      : this.informWaitingForMorePlayers
                  }
                >
                  Start Game
                </button>
              )}
              <Link to="/"
                className={
                  this.props.isHost ? "quizButton leaveButton" : "quizButton"
                }
              >
                Leave Game
              </Link>
            </div>
          </div>
        )}
        {this.props.isStarting && !this.props.isStarted && (
          /*TODO: Continue with implementing the countdown and the active game container */
          <div className="gameInformationContainer countdownContainer">
            <div className="countdownTimer">{this.state.countdownTimer}</div>
          </div>
        )}
        {/*TODO: Continue with implementing the countdown and the active game container */}
        {!this.props.isStarting && this.props.isStarted && (
          <div className="gameInformationContainer activeGameContainer">
            <div className="questionMainContainer">
              {!this.state.questionDone && (
                <div className="questionContainer">
                  <div className="question">{this.props.question}</div>
                  <p className="questionCountdown">
                    {this.state.questionCountdownTimer}
                  </p>
                </div>
              )}
              <div className="answersContainer">
                {(!this.state.questionDone &&
                  !this.state.answered &&
                  this.props.answers.map((answer, key) => (
                    <button
                      key={key}
                      className="answer"
                      onClick={() => {
                        this.answerQuestion(key);
                      }}
                    >
                      {answer}
                    </button>
                  ))) ||
                  ((!this.state.questionDone && !this.props.lastQuestion && (
                    <div className="answerWaiting">
                      Waiting for the other players
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </div>
                  )) ||
                    (!this.props.isHost && !this.props.lastQuestion && (
                      <div className="answerWaiting">
                        Waiting for the next question
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </div>
                    )))}
                {this.props.isHost &&
                  !this.props.lastQuestion &&
                  this.state.questionDone && (
                    <button
                      onClick={this.nextQuestion}
                      className="nextQuestionButton"
                    >
                      Next Question
                    </button>
                  )}

                {this.state.questionDone &&
                  this.props.lastQuestion &&
                  this.props.scores !== undefined && (
                    <div className="resultContainer">
                      <h2>Scores</h2>
                      <div className="winnerContainer">Winner winner {this.props.scores ? this.props.scores[0][0] + " with " + this.props.scores[0][1]  : "Unknown winner"}</div>
                      <table>
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.scores.map((result, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{result[0]}</td>
                              <td>{result[1] ? result[1] : 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {this.state.questionDone &&
                  this.props.lastQuestion && (
                    <Link to="/" className="returnHomeButton">Return to main menu</Link>
                    )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  //TODO: Move the check for state.game[currentRoom] outside the return statement
  return {
    players: state.game[currentRoom]
      ? state.game[currentRoom].players
      : undefined,
    isHost: state.game[currentRoom] ? state.game[currentRoom].isHost : false,
    quizName: state.game[currentRoom]
      ? state.game[currentRoom].quizName
      : "Unknown",
    amountOfQuestions: state.game[currentRoom]
      ? state.game[currentRoom].amountOfQuestions
      : 0,
    host: state.game[currentRoom] ? state.game[currentRoom].host : undefined,
    isStarting: state.game[currentRoom]
      ? state.game[currentRoom].isStarting
      : false,
    isStarted: state.game[currentRoom]
      ? state.game[currentRoom].isStarted
      : false,
    question: state.game[currentRoom]
      ? state.game[currentRoom].question
      : "Missing Question",
    answers: state.game[currentRoom]
      ? state.game[currentRoom].answers
      : ["I don't know."],
    lastQuestion: state.game[currentRoom]
      ? state.game[currentRoom].lastQuestion
      : false,
    scores: state.game[currentRoom] ? state.game[currentRoom].scores : []
  };
};

export default connect(
  mapStateToProps,
  {
    authenticateUserSocket,
    joinGame,
    playerJoin,
    playerLeave,
    hostGame,
    hostChange,
    newHost,
    startingGame,
    getNewQuestion,
    finishGame
  }
)(withRouter(Game));
