import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Header extends Component {
  isLoggedIn = () => {
    return this.props.loggedIn !== undefined && this.props.loggedIn === true;
  };

  render() {
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

          {!this.isLoggedIn() &&
            <Link to="/login" className="headerLink headerLogin">
              Log In
              </Link>
          }
          {!this.isLoggedIn() &&
            <Link to="/signup" className="headerLink headerSignUp">
              Sign Up
              </Link>
          }

           {this.isLoggedIn() &&
            <div className="headerLink">{"USER:" + this.props.username}</div>
          }

          {this.isLoggedIn() &&
            <Link to="/logout" className="headerLink headerSignUp">
              Log out
          </Link>
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("HEADER", state)
  return {
    loggedIn: state.login.loggedIn,
    userId: state.login.user ? state.login.user.user_id : undefined,
    username: state.login.user ? state.login.user.username : undefined
  };
}

export default connect(mapStateToProps)(withRouter(Header));
