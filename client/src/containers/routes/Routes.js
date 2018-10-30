import React from 'react'
import Home from "../home/Home";
import Game from "../game/Game";
import Leaderboard from "../leaderboard/Leaderboard";
import { Switch, Route } from 'react-router-dom'
import SignUp from "../signUp/SignUp";
import Login from "../login/Login";
import Lobby from "../lobby/Lobby";
import QuizMaker from "../quizMaker/QuizMaker";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/game" component={Game} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/quizmaker" component={QuizMaker} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
        </Switch>
    )
}
