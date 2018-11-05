import React, { Component } from "react";
import SignUpForm from '../../forms/SignUpForm'

export default class SignUp extends Component {
  
  handleSignUp = values => {
    console.log(values);
  };

  async doSignUp(values) {
    // const { username, password, confirm } = this.state;
    // console.log("STATE: ", state)
    // console.log("PROPS: ", props)

    if (values.confirm !== values.password) {
      // this.setState({ errorMsg: "Passwords do not match" });
      console.log("Passwords do not match.")
      return;
    }

    const url = "/api/signup";
    console.log(values)
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
      console.log("Failed to connect to server: " + err );
      return;
    }

    if (response.status === 400) {
      console.log("Invalid username/password");
      return;
    }

    if (response.status !== 204) {
      console.log("Error to server - " + response.status);
      return;
    }

    // this.props.updateLoggedInUserId(userId);
    // this.props.history.push("/");
  }

  render() {
    return (
      <div className="signUpContainer">
        <div className="signUpFormContainer">
          <span>SIGN UP</span>
          <SignUpForm onSubmit={this.doSignUp} />
        </div>
      </div>
    );
  }
}
