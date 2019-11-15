import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "redux/actions/auth-actions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  loginUser = userData => {
    this.props.login(userData);
  };
  render() {
    const { isAuth, errors, location } = this.props;
    const { registerSuccess } = location.state || false;
    if (isAuth) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {registerSuccess && (
                <div className="alert alert-success">
                  <p>You have been successfully registered. Please login.</p>
                </div>
              )}
              <LoginForm login={this.loginUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={`${process.env.PUBLIC_URL}/img/login-image.jpg`}
                  alt="login"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    errors: state.auth.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: userData => dispatch(login(userData))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
