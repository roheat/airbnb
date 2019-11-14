import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import FormInput from "common/FormInput";
import FormError from "common/FormError";

class RegisterForm extends Component {
  render() {
    const {
      submitting,
      pristine,
      register,
      handleSubmit,
      valid,
      errors
    } = this.props;
    return (
      <form onSubmit={handleSubmit(register)}>
        <Field
          name="username"
          component={FormInput}
          label="Username"
          type="text"
          className="form-control"
        />

        <Field
          name="email"
          component={FormInput}
          label="Email"
          type="text"
          className="form-control"
        />

        <Field
          name="password"
          component={FormInput}
          label="Password"
          type="password"
          className="form-control"
        />

        <Field
          name="passwordConfirmation"
          component={FormInput}
          label="Confirm Password"
          type="password"
          className="form-control"
        />
        <button
          className="btn btn-bwm btn-form"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Submit
        </button>
        <FormError errors={errors} />
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (values.username && values.username.length < 4) {
    errors.username = "Username should be atleast 4 characters long";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Confirm your password";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords do not match";
  }

  return errors;
};

export default reduxForm({ form: "registerForm", validate })(RegisterForm);
