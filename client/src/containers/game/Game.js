import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  authenticateUserSocket,
  joinGame,
  playerJoin,
  playerLeave
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
    this.onInitialJoin();
    this.onPlayerJoin();
    setTimeout(() => {
      console.log("THE ROOM", currentRoom);
    }, 3000);
  };

  componentWillUnmount = () => {
    this.socket.close();
  };

  onHostEvent = () => {
    this.socket.on("hostJoin", data => {
      currentRoom = data.room;
      this.props.joinGame(data.room, data.username, true);
    });
  };

  onInitialJoin = () => {
    this.socket.on("initialJoin", data => {
      currentRoom = data.room;
      this.props.joinGame(data.room, data.username, false);
    });
  };

  onPlayerJoin = () => {
    this.socket.on("playerJoin", data => {
      console.log("Player joined", data.username);
      this.props.playerJoin(data.room, data.username);
    });
  };

  onPlayerLeave = () => {
    this.socket.on("playerLeave", data => {
      console.log("Player left", data.username);
      this.props.playerLeave(data.room, data.username);
    });
  };

  authenticateSocket = socket => {
    this.props.authenticateUserSocket(socket, this.props.history);
  };

  render() {
    return (
      <div className="gameContainer">
        <div className="gameInformationContainer">
          <div className="quizInformation">
            <h2 className="quizName">{this.props.quizName || "Quiz X"}</h2>
            <p className="quizQuestions">
              {this.props.questions
                ? this.props.questions.length + " questions."
                : "I don't know how many questions there are."}
            </p>
          </div>
          <div className="playersContainer">
            {(this.props.players && this.props.players instanceof Array) ? (
              this.props.players.map(player => (
                <div className="player">{player}</div>
              ))
            ) : (
              <div className="player">
                {this.props.players ? this.props.players : "No players yet."}
              </div>
            )}
          </div>
          <div className="buttonContainer">
            {this.props.isHost && (
              <button className="quizButton startButton">Start Game</button>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.game[currentRoom] ? state.game[currentRoom].players : "");
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
        : undefined
  };
};

export default connect(
  mapStateToProps,
  { authenticateUserSocket, joinGame, playerJoin, playerLeave }
)(withRouter(Game));
