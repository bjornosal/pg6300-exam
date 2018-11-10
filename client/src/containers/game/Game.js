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
  startingGame
} from "../../actions/Game";
import { withRouter } from "react-router-dom";

let currentRoom;

class Game extends Component {
  constructor(props) {
    super(props);
    this.socket = undefined;
    currentRoom = null;
  }

  componentWillMount = () => {
    this.socket = io("/games");
    this.authenticateSocket(this.socket);
    this.onHostEvent();
    this.onJoinGame();
    this.onPlayerJoin();
    this.onHostChange();
    this.onNewHost();
    this.onGameStart();
  };

  componentWillUnmount = () => {
    this.socket.close();
  };

  onHostEvent = () => {
    this.socket.on("hostJoin", data => {
      currentRoom = data.room;
      this.props.hostGame(data.room, data.username, true, data.quiz);
    });
  };

  onJoinGame = () => {
    this.socket.on("joinGame", data => {
      console.log("JOIN GAME DATA", data);
      currentRoom = data.room;
      this.props.joinGame(data.room, data.players, data.host, data.quiz);
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
      this.props.startingGame(data.room, data.quiz);
    });
  };

  informWaitingForMorePlayers = () => {
    alert("Waiting for more players");
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
                {this.props.questions
                  ? this.props.questions.length + " questions"
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
        { /*TODO: Continue with implementing the countdown and the active game container */<div className="activeGameContainer" />}
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
    quizName:
      state.game[currentRoom] && state.game[currentRoom].quiz
        ? state.game[currentRoom].quiz.name
        : undefined,
    questions:
      state.game[currentRoom] && state.game[currentRoom].quiz
        ? state.game[currentRoom].quiz.questions
        : undefined,
    host: state.game[currentRoom] ? state.game[currentRoom].host : undefined,
    isStarting: state.game[currentRoom]
      ? state.game[currentRoom].isStarting
      : false,
    isStarted: state.game[currentRoom]
      ? state.game[currentRoom].isStarted
      : false
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
    startingGame
  }
)(withRouter(Game));
