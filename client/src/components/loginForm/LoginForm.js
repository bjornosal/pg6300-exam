import React from 'react'
import { Field, reduxForm } from 'redux-form'


/**
 * Inspired by Redux-Form examples - https://redux-form.com/7.4.2/examples/asyncvalidation/
 */

const renderField = ({
    input,
    label,
    type
  }) => (
    <div>
      {/* <label className="inputLabel">{label}</label> */}
      <div className="inputContainer">
        <input {...input} type={type} placeholder={label} />
      </div>
    </div>
  )

const LoginForm = props => {
    const { handleSubmit, isSubmitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="Username"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <div className="loginButtonContainer"> 
          <button type="submit" disabled={isSubmitting}>
            Log in
          </button>
        </div>
      </form>
    )
  }
  
  export default reduxForm({
    form: 'LoginForm',
  })(LoginForm)
  