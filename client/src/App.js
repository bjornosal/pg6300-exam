import React, { Component } from "react";
import logo from "./logo.svg";
import "./scss/App.scss";

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
      <div className="App">
        <p>FROM SERVER: {this.state.data || "NOTHING YET"}</p>
      </div>
    );
  }
}

export default App;
