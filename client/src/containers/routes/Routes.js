import React from "react";
import Home from "../home/Home";
import Game from "../game/Game";
import Leaderboard from "../leaderboard/Leaderboard";
import { Switch, Route } from "react-router-dom";
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
import QuizMaker from "../quizMaker/QuizMaker";

export default function Routes({ loggedIn }) {
  return (
    <Switch>
      {(loggedIn === undefined || !loggedIn) && (
        <Route exact path="/signup" component={SignUp} />
      )}
      {(loggedIn === undefined || !loggedIn) && (
        <Route exact path="/login" component={Login} />
      )}
      <Route exact path="/game" component={Game} />
      <Route exact path="/leaderboard" component={Leaderboard} />
      <Route exact path="/quizmaker" component={QuizMaker} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
