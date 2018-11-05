import React, { Component } from 'react'
import LoginForm from '../../forms/LoginForm';

export default class Login extends Component {

  async handleLogin(values) {
    // const { userId, password } = this.state;

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
      // this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      // this.setState({ errorMsg: "Invalid username/password" });
      return;
    }

    if (response.status !== 204) {
     /*  this.setState({
        errorMsg:
          "Error when connecting to server: status code " + response.status
      }); */
      return;
    }

    // this.setState({ errorMsg: null });
    // this.props.updateLoggedInUserId(userId);
    // this.props.history.push("/");
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="loginFormContainer">
          <span>LOG IN</span>
          <LoginForm onSubmit={this.handleLogin} />
        </div>
      </div>
    )
  }
}