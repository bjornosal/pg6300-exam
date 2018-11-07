import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import questionmark from "./../../questionMark.png";
import listIcon from "./../../listIcon.svg";

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="gameModeContainer">
          <div className="gamemodeChooser gameModeAuto">
            <div className="gameModeImageContainer">
              <img className="gameModeImage" src={questionmark} alt="" />
            </div>
            <p className="gameModeInfo">Automatically join a game. </p>
            <Link
              to={
                this.props.loggedIn === undefined || !this.props.loggedIn
                  ? "/login"
                  : "/game"
              }
              className="gamemodeButton"
            >
              Auto
            </Link>
          </div>
          <div className="gamemodeChooser gameModeLobby">
            <div className="gameModeImageContainer">
              <img className="gameModeImage" src={listIcon} alt="" />
            </div>
            <p className="gameModeInfo">
              Go to the lobby to find a game there!
              <br /> Are your friends playing?
            </p>
            <Link to={
                this.props.loggedIn === undefined || !this.props.loggedIn
                  ? "/login"
                  : "/lobby"
              } className="gamemodeButton">
              Lobby
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  };
};

export default connect(mapStateToProps)(Home);
