import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from "../components/inputField/InputField";
import { connect } from "react-redux";
import { signUpUser, signUpUserAsync } from "../actions/SignUp";
import { withRouter } from "react-router-dom";

/**
 * Inspired by Redux-Form examples - https://redux-form.com/7.4.2/examples/asyncvalidation/
 */

class SignUpForm extends React.Component {
  handleSignUp = fields => {
    // console.log("PROPS", this.props);
    this.props.signUpUserAsync(fields, this.props.history);
  };

  componentDidMount = () => {
    this.props.signUpUser();
  }

  componentDidUpdate = () => {
    //Close as it gets. Handle this on backend?
    if(this.props.loggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSignUp)}>
          <Field
            name="username"
            type="text"
            component={InputField}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            label="Password"
          />
          <Field
            name="confirm"
            type="password"
            component={InputField}
            label="Repeat password"
          />
          <div className="signUpButtonContainer">
            <button type="submit" disabled={isSubmitting}>
              Sign up
            </button>
          </div>
        </form>
        {this.props.signUp.loginError &&
          <div className="errorBox">{this.props.signUp.errorMsg}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login ?  state.login.loggedIn : false,
    signUp: state.signUp
  };
}

export default reduxForm({
  form: "signup"
})(
  connect(
    mapStateToProps,
    { signUpUser, signUpUserAsync }
  )(withRouter(SignUpForm))
);
