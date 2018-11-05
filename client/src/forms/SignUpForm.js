import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from '../components/inputField/InputField'
/**
 * Inspired by Redux-Form examples - https://redux-form.com/7.4.2/examples/asyncvalidation/
 */

const SignUpForm = props => {
  const { handleSubmit, isSubmitting } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        name="repeat"
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
  );
};

export default reduxForm({
  form: "signup"
})(SignUpForm);
