import React, { Component } from "react";
import logo from "./logo.svg";
import "./scss/App.scss";
import Home from "./containers/home/Home";
import Game from "./containers/game/Game";
import Leaderboard from "./containers/leaderboard/Leaderboard";
import Footer from "./containers/footer/Footer";
import Header from "./containers/header/Header";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.performRequestToApi()
      .then(res => this.setState({ data: res.server }))
      .catch(err => console.error("ERROR: ", err));
  }

  performRequestToApi = async () => {
    const response = await fetch("/api/scores");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };


  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/game" component={Game} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
