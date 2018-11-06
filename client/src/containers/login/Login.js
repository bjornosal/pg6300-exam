import React, { Component } from "react";
import LoginForm from "../../forms/LoginForm";
import { withRouter } from "react-router-dom";

class Login extends Component {

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
    // console.log("PROPS", this.props)
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

export default withRouter(Login)
