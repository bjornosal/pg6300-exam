import React from "react";
import { Link } from "react-router-dom";

export default function Header({}) {
  console.log("yes, this is props", state);
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
        
{true &&
        <Link to="/login" className="headerLink headerLogin">
          Log In
        </Link>
}
        <Link to="/signup" className="headerLink headerSignUp">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
