import React, { Component } from "react";
import "./scss/App.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./containers/routes/Routes";
import Footer from "./containers/footer/Footer";
import Header from "./containers/header/Header";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Routes loggedIn={this.props.loggedIn}/>
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
