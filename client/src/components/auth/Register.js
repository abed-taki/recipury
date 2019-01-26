import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import register from "../../img/register.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
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
        <h3 className="third-title">Sign Up</h3>
        <p className="forth-title">Create your Recipury Account</p>
        <section className="register">
          <div className="register__img">
            <img src={register} alt="register" className="register__img__img" />
          </div>
          <div className="register__form">
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  className={classnames("register__input", {
                    invalid: errors.name
                  })}
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="error">
                  {errors ? <p className="error-class">{errors.name}</p> : ""}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  className={classnames("register__input", {
                    invalid: errors.email
                  })}
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <div className="error">
                  {errors ? <p className="error-class">{errors.email}</p> : ""}
                </div>
              </div>
              <div>
                <input
                  type="password"
                  className={classnames("register__input", {
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
              <div>
                <input
                  type="password"
                  className={classnames("register__input", {
                    invalid: errors.password2
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <div className="error">
                  {errors ? (
                    <p className="error-class">{errors.password2}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <input type="submit" className="register__btn" value="Sign Up" />
            </form>
            <p className="register__text">
              Already have an account?
              <Link to="/login" className="register__link">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToPtops = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToPtops,
  { registerUser }
)(withRouter(Register));
