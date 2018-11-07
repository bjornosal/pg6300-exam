import React, { Component } from "react";
import SignUpForm from "../../forms/SignUpForm";

export default class SignUp extends Component {
 
  render() {
    return (
      <div className="signUpContainer">
        <div className="signUpFormContainer">
          <span>SIGN UP</span>
          <SignUpForm />
        </div>
      </div>
    );
  }
}