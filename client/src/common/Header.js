import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "redux/actions/auth-actions";

class Header extends React.Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { isAuth } = this.props;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            AirBnB
          </Link>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 bwm-search"
              type="search"
              placeholder={`Try 'New York'`}
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
              type="submit"
            >
              Search
            </button>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {isAuth ? (
              <div className="navbar-nav ml-auto">
                <div
                  className="btn nav-item nav-link"
                  onClick={this.handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <Link to="/login" className="nav-item nav-link active">
                  Login <span className="sr-only">(current)</span>
                </Link>
                <Link to="/register" className="nav-item nav-link">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
