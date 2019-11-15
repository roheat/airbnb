import React from "react";
import { Field, reduxForm } from "redux-form";
import FormInput from "common/FormInput";
import FormError from "common/FormError";
import { required, minLength4 } from "helpers/validators";

const LoginForm = ({
  handleSubmit,
  pristine,
  submitting,
  valid,
  errors,
  login
}) => {
  return (
    <form onSubmit={handleSubmit(login)}>
      <Field
        name="email"
        label="Email"
        component={FormInput}
        type="text"
        className="form-control"
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        label="Password"
        component={FormInput}
        type="password"
        className="form-control"
        validate={[required]}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Log In
      </button>
      <FormError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
