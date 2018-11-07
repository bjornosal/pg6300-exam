import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import questionmark from "./../../questionMark.png";
import listIcon from "./../../listIcon.svg";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="gameModeContainer">
        <div className="gamemodeChooser gameModeAuto">
          <div className="gameModeImageContainer">
            <img className="gameModeImage" src={questionmark} />
          </div>
          <p className="gameModeInfo">Automatically join a game. </p>
          <Link to="/game" className="gamemodeButton">Auto</Link>
        </div>
        <div className="gamemodeChooser gameModeLobby">
          <div className="gameModeImageContainer">
            <img className="gameModeImage" src={listIcon} />
          </div>
          <p className="gameModeInfo">
            Go to the lobby to find a game there!
            <br /> Are your friends playing?
          </p>
          <Link to="/lobby" className="gamemodeButton">Lobby</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;