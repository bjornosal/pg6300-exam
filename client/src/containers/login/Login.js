import React, { Component } from "react";
import LoginForm from "../../forms/LoginForm";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Login extends Component {
  render() {
    return (
      <div className="loginContainer">
        <div className="loginFormContainer">
          <span>LOG IN</span>
          <LoginForm />
        </div>
      </div>
    );
  }
}


export default connect()(withRouter(Login))
