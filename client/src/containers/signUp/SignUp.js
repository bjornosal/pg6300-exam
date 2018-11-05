import React, { Component } from "react";
import SignUpForm from '../../forms/SignUpForm'
export default class SignUp extends Component {
  handleSignIn = values => {
    console.log(values);
  };

  render() {
    return (
      <div className="signUpContainer">
        <div className="signUpFormContainer">
          <span>SIGN UP</span>
          <SignUpForm onSubmit={this.handleSignIn} />
        </div>
      </div>
    );
  }
}
