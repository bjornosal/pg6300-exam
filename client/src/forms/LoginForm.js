import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from "../components/inputField/InputField";
import { connect } from "react-redux";
import { loginUserAsync } from "../actions/Login";
import { withRouter } from 'react-router-dom'
/**
 * Inspired by Redux-Form examples - https://redux-form.com/7.4.2/examples/asyncvalidation/
 */

class LoginForm extends React.Component {

  onLogin = (fields) =>  {
    this.props.loginUserAsync(fields, this.props.history)
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onLogin)}>
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
        <div className="loginButtonContainer">
          <button type="submit" disabled={isSubmitting}>
            Log in
          </button>
        </div>
      </form>
    );
  };
}

function mapStateToProps(state) {
  return {
    user: state.form.login ? state.form.login.values : undefined
  };
}

export default reduxForm({
  form: "loginForm"
})(
  connect(
    mapStateToProps,
    { loginUserAsync }
  )(withRouter(LoginForm))
);
