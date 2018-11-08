import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { authenticateUserSocket } from "../../actions/Game";
import { withRouter } from "react-router-dom";

class Game extends Component {
  socket;
  isHost; 

  componentWillMount = () => {
    this.socket = io("/games");
    this.authenticateSocket(this.socket);
    this.onHostEvent(); 

    this.socket.on("playerJoin", (data) => {
      console.log("Cow say what?", data);
    });

    this.socket.on("initialJoin", (data) => {
      console.log("Existing players: ", data);
    });

    console.log("RENDERED AGAIN")
  };

  componentWillUnmount = () => {
    this.socket.close();
  };


  onHostEvent = () => {
    this.socket.on("hostEvent", () => {
      this.isHost = true;
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
  { authenticateUserSocket }
)(withRouter(Game));
