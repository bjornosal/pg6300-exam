import React, { Component } from 'react'
import LoginForm from '../../forms/LoginForm';

export default class Login extends Component {

  handleSignIn = (values) => {
    console.log(values);
};

  render() {
    return (
      <div className="loginContainer">
        <div className="loginFormContainer">
          <span>LOG IN</span>
          <LoginForm onSubmit={this.handleSignIn}/>
        </div>
      </div>
    )
  }
}