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
  getNewQuestion
} from "../../actions/Game";
import { withRouter } from "react-router-dom";

let currentRoom;

class Game extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line
    let countdown = null;
    // eslint-disable-next-line
    let questionCountdown = null;

    this.state = {
      countdownTimer: 5,
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
    this.onHostChange();
    this.onNewHost();
    this.onGameStart();
    this.onNewQuestion();
  };

  componentWillUnmount = () => {
    this.socket.close();
    if (this.countdown !== null) {
      clearInterval(this.countdown);
    }
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
      this.startCountdownTimer();
      setTimeout(() => {
        this.startQuestionCountdownTimer(10);
        setTimeout(() => {
          //TODO: Move to next "score" screen.
         /*  this.setState({
            moreQuestions:
              data.questionNumber !== data.quiz.questions.length ? true : false
          }); */
        }, 10000);
      }, 5000);
    });
  };

  onNewQuestion = () => {
    this.socket.on("newQuestion", data => {
      this.props.getNewQuestion(data.room, data.quiz, data.questionNumber);
      this.startCountdownTimer();
      
      this.setState({
        countdownTimer: 5,
        questionCountdownTimer: 10,
        answered: false
      })

      setTimeout(() => {
        this.startQuestionCountdownTimer(10);
        setTimeout(() => {
          //TODO: Move to next "score" screen.
          /* this.setState({
            moreQuestions:
              data.questionNumber !== data.quiz.questions.length ? true : false
          }); */
        }, 10000);
      }, 5000);
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
      if (this.state.questionCountdownTimer === 0)
        clearInterval(this.questionCountdown);
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
              <button
                className={
                  this.props.isHost ? "quizButton leaveButton" : "quizButton"
                }
              >
                Leave Game
              </button>
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
        <div className="gameInformationContainer activeGameContainer">
          {!this.props.isStarting && this.props.isStarted && (
            <div className="questionMainContainer">
              <div className="questionContainer">
                <div className="question">{this.props.question}</div>
                <p className="questionCountdown">
                  {this.state.questionCountdownTimer}
                </p>
              </div>
              <div className="answersContainer">
                {(!this.state.answered &&
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
                  ))) || (
                  <div className="answerWaiting">
                    Waiting for the other players
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {this.props.isHost && 
            <button onClick={this.nextQuestion} className="nextQuestionButton">
              Next Question
            </button>
          }
        </div>
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
      : ["I don't know."]
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
    getNewQuestion
  }
)(withRouter(Game));
