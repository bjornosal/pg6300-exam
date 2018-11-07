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

  componentDidUpdate = () => {
    //Close as it gets. Handle this on backend?
    if(this.props.loggedIn) {
      this.props.history.push("/");
    }
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

const formName = "login";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login ?  state.login.loggedIn : false,    
    user: state.form[formName] ? state.form[formName].registeredFields : undefined
  };
}

export default reduxForm({
  form: formName
})(
  connect(
    mapStateToProps,
    { loginUserAsync }
  )(withRouter(LoginForm))
);
