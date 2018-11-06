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


  async handleLogin(values) {
    const url = "/api/login";
    const payload = { username: values.username, password: values.password };

    let response;

    try {
      response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      return;
    }

    if (response.status === 401) {
      return;
    }

    if (response.status !== 204) {
      return;
    }
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="loginFormContainer">
          <span>LOG IN</span>
          <LoginForm onSubmit={this.handleLogin} />
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

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser)
 });

export default connect(mapStateToProps, mapDispatchToProps)(Login)
