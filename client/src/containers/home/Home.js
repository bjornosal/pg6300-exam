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
              Go check out the scores!
              <br /> Have your friends played?
            </p>
            <Link to={"/leaderboard"} className="gamemodeButton">
              Leaderboard
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
