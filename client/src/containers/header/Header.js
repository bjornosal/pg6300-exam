import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="headerContainer">
      <Link to="/">Quiz Logo</Link>

      <Link to="/quizmaker" className="">New Quiz</Link>
      <Link to="/lobby" className="">Quiz Lobby</Link>
      <Link to="/Leaderboard" className="">Leaderboard</Link>
      <Link to="" className="">Log In</Link>
    </div>
  );
}
