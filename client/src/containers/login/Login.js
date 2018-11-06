import React, { Component } from "react";
import LoginForm from "../../forms/LoginForm";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from '../../actions/Login'

class Login extends Component {
  constructor(props) {
    super(props);
    
    console.log("PROPS", props)
  }

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

function mapStateToProps(state) {
  return {
    TEST: "THE STATE"
  };
}

export default connect(mapStateToProps, {})(Login)
