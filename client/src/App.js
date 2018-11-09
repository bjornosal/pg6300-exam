import React, { Component } from "react";
import "./scss/App.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./containers/routes/Routes";
import Footer from "./containers/footer/Footer";
import Header from "./containers/header/Header";
import { connect } from "react-redux";

class App extends Component {
 /*  componentDidMount() {
    this.performRequestToApi()
      .then(res => this.setState({ data: res.server }))
      .catch(err => console.error("ERROR: ", { err }));
  }

  performRequestToApi = async () => {
    const response = await fetch("/api/scores");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };
 */
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Routes loggedIn={this.props.loggedIn}/>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login ?  state.login.loggedIn : false,
  };
}

export default connect(mapStateToProps)(App);
