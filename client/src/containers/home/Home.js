import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import questionmark from "./../../questionMark.png";
import listIcon from "./../../listIcon.svg";

export default class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="gameModeContainer">
          <div className="gamemodeChooser gameModeAuto">
            <div className="gameModeImageContainer">
              <img className="gameModeImage" src={questionmark} />
            </div>
            <p className="gameModeInfo">Automatically join a game. </p>
            <button className="gamemodeButton">Auto</button>
          </div>
          <div className="gamemodeChooser gameModeLobby">
            <div className="gameModeImageContainer">
              <img className="gameModeImage" src={listIcon} />
            </div>
            <p className="gameModeInfo">
              Go to the lobby to find a game there!
              <br /> Are your friends playing?
            </p>
            <button className="gamemodeButton">Lobby</button>
          </div>
        </div>
      </div>
    );
  }
}
