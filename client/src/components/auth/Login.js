import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import login from "../../img/login.jpg";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = {
      email,
      password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <section className="home-hero">
          <Navbar />
        </section>
        <h3 className="third-title">Log in</h3>
        <p className="forth-title">Log in to your Recipury Account</p>
        <div className="container">
          <section className="login">
            <div className="login__img">
              <img src={login} alt="login" className="login__img__img" />
            </div>
            <div className="login__form">
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    type="email"
                    className={classnames("login__input", {
                      invalid: errors.email
                    })}
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <div className="error">
                    {errors ? (
                      <p className="error-class">{errors.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    className={classnames("login__input", {
                      invalid: errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <div className="error">
                    {errors ? (
                      <p className="error-class">{errors.password}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <input type="submit" className="login__btn" value="Sign In" />
              </form>
              <p className="login__text">
                Not a member yet?
                <Link to="/register" className="login__link">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
