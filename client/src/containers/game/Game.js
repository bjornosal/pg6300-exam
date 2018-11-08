import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { authenticateUserSocket } from "../../actions/Game";
import { withRouter } from "react-router-dom";

class Game extends Component {
  socket;

  authenticateSocket = socket => {
    // console.log("PROPS", this.props);
    this.props.authenticateUserSocket(socket);
  };

  componentWillMount = () => {
    this.socket = io("/games");
    this.authenticateSocket(this.socket);

    this.socket.on("hostEvent", () => {
      console.log("IM THE HOST");
    });

    this.socket.on("update", (data) => {
      console.log("Cow say what?",data);
    });
  };

  componentWillUnmount = () => {
    this.socket.close();
  };

  render() {
    return <div className="gameContainer" />;
  }
}

/**
 * @author arcuri82
 * Code from course material in PG6300, by lecturer Andrea Arcuri.
 */
/* const authenticateSocket = async socket => {
  const url = "/api/wstoken";

  let response;

  try {
    response = await fetch(url, {
      method: "post"
    });
  } catch (err) {
    this.setState({ errorMsg: "Failed to connect to server: " + err });
    return;
  }

  if (response.status === 401) {
    //this could happen if the session has expired
    this.setState({ errorMsg: "You should log in first" });
    this.props.updateLoggedInUserId(null);
    return;
  }

  if (response.status !== 201) {
    this.setState({
      errorMsg:
        "Error when connecting to server: status code " + response.status
    });
    return;
  }

  const payload = await response.json();

  this.socket.emit("login", payload);
}; */

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { authenticateUserSocket }
)(withRouter(Game));
