import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import LoginForm from '../../components/loginForm/LoginForm';

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