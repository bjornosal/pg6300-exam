import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from "../components/inputField/InputField";
import { connect } from "react-redux";
import { loginUser } from "../actions/Login";

/**
 * Inspired by Redux-Form examples - https://redux-form.com/7.4.2/examples/asyncvalidation/
 */

const LoginForm = props => {
  const { handleSubmit, isSubmitting, loginUser } = props;
  return (
    <form onSubmit={handleSubmit(loginUser)}>
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
    { loginUser }
  )(LoginForm)
);
