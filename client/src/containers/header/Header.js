import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  
  render() {
    console.log("STATE/PROPS?", this.state)
    console.log("STATE/PROPS?", this.props)

    return (
      <div className="headerContainer">
        <Link to="/" className="headerLink headerLogo">
          Quiz Logo
          </Link>

        <div className="headerNavigationContainer">
          <Link to="/quizmaker" className="headerLink">
            New Quiz
            </Link>

          <Link to="/lobby" className="headerLink">
            Quiz Lobby
            </Link>

          <Link to="/Leaderboard" className="headerLink">
            Leaderboard
            </Link>

          {true && (
            <Link to="/login" className="headerLink headerLogin">
              Log In
              </Link>
          )}
          <Link to="/signup" className="headerLink headerSignUp">
            Sign Up
            </Link>
        </div>
      </div>
    )
  }
}
