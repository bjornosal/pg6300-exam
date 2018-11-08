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

class Game extends Component {
  constructor(props) {
    super(props);
    // this.isHost = false;
    this.socket = undefined;
  }

  componentWillMount = () => {
    this.socket = io("/games");
    this.authenticateSocket(this.socket);
    this.onHostEvent();
    this.onInitialJoin();
    this.onPlayerJoin();
  };

  componentWillUnmount = () => {
    this.socket.close();
  };

  onHostEvent = () => {
    this.socket.on("hostJoin", data => {
      this.props.joinGame(data.room, data.username, true);
    });
  };

  onInitialJoin = () => {
    this.socket.on("initialJoin", data => {
      console.log("DATA", data);
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
    return <div className="gameContainer" />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { authenticateUserSocket, joinGame, playerJoin, playerLeave }
)(withRouter(Game));
