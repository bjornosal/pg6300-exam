import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser, checkUserToken } from "../../actions/Login";
import { colors } from "react-select/lib/theme";

class Header extends Component {
  isLoggedIn = () => {
    return this.props.loggedIn !== undefined && this.props.loggedIn === true;
  };

  doLogout = () => {
    this.props.logoutUser(this.props.history);
  }

  getLoggedInUser = () => {
    this.props.checkUserToken();
  }

  componentWillMount = () => {
    this.getLoggedInUser();
  }

  render() {
    return (
      <div className="headerContainer">
        <Link to="/" className="headerLink headerLogo">
          Quhoot
        </Link>

        <div className="headerNavigationContainer">
          <Link to="/quizmaker" className="headerLink">
            Quizmaker
          </Link>

          <Link to="/Leaderboard" className="headerLink">
            Leaderboard
          </Link>

          {!this.isLoggedIn() && (
            <Link to="/login" className="headerLink headerLogin">
              Log In
            </Link>
          )}
          {!this.isLoggedIn() && (
            <Link to="/signup" className="headerLink headerSignUp">
              Sign Up
            </Link>
          )}

          {this.isLoggedIn() && (
            <div className="headerLink" style={{borderWidth: "1px", borderColor: "black", borderStyle: "solid", margin: "1em" , borderRadius: ".1em"}}>{"USER - " + this.props.username}</div>
          )}

          {this.isLoggedIn() && (
            <button onClick={this.doLogout} className="headerLink headerSignUp">
              Log out
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    userId: state.login.user ? state.login.user.user_id : undefined,
    username: state.login.user ? state.login.user.username : undefined
  };
}

export default connect(
  mapStateToProps,
  { logoutUser,
    checkUserToken }
)(withRouter(Header));
