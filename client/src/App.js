import React, { Component } from "react";
import logo from "./logo.svg";
import "./scss/App.scss";
import Home from "./containers/Home";
import Game from "./containers/Game";
import Highscore from "./containers/Highscore";
import { BrowserRouter, Switch, Route} from 'react-router-dom'
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
              <Switch>
                  <Route exact path="/game" component={Game}/>
                  <Route exact path="/highscore" component={Highscore}/>
                  <Route exact path="/" component={Home}/>
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
