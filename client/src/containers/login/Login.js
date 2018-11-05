import React, { Component } from 'react'
import { } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import LoginForm from '../../components/loginForm/LoginForm';

export default class Login extends Component {
  render() {
    return (
      <div className="loginContainer">
        <div className="loginFormContainer">
          <span>LOG IN</span>
          <LoginForm />
        </div>
      </div>
    )
  }
}
