import React, { Component } from "react";

import RegisterForm from "./RegisterForm";
import { register } from "redux/actions/auth-actions";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = { errors: [] };

  registerUser = userData => {
    register(userData).then(
      registered =>
        this.props.history.push({
          pathname: "/login",
          state: { registerSuccess: true }
        }),
      errors => this.setState({ errors })
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <section id="register">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Register</h1>
              <RegisterForm register={this.registerUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Register);
