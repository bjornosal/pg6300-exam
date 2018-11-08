import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { authenticateUserSocket, joinGame } from "../../actions/Game";
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
    this.socket.on("hostJoin", (data) => {
      this.props.joinGame(data.currentRoom, data.username, true);
    });
  };

  onInitialJoin = () => {
    this.socket.on("initialJoin", data => {
      console.log("DATA", data)
      this.props.joinGame(data.currentRoom, data.username, false)
    });
  }

  onPlayerJoin = () => {
    this.socket.on("playerJoin", data => {
      console.log("Cow say what?", data);
    });
  }

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
  { authenticateUserSocket, joinGame }
)(withRouter(Game));
