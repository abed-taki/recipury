import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

import { connect } from "react-redux";

class Navbar extends Component {
  onlogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navigation">
        <li className="navigation__item">
          <Link to="/recipes" className="navigation__link">
            Recipes
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/creators" className="navigation__link">
            Creators
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/about" className="navigation__link">
            About
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/register" className="navigation__link btn btn-short">
            Sign up
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/login" className="navigation__link">
            Log in
          </Link>
        </li>
      </ul>
    );

    const guestLinksSmall = (
      <ul className="navigation--small__list">
        <li className="navigation--small__item">
          <Link to="/recipes" className="navigation--small__link">
            Recipes
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/creators" className="navigation--small__link">
            Creators
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/about" className="navigation--small__link">
            About
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/register" className="navigation--small__link">
            Sign up
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/login" className="navigation--small__link">
            Log in
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navigation">
        <li className="navigation__item">
          <Link to="/recipes" className="navigation__link">
            Recipes
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/creators" className="navigation__link">
            Creators
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/about" className="navigation__link">
            About
          </Link>
        </li>
        <li className="navigation__item">
          <a
            href="!#"
            className="navigation__link"
            onClick={this.onlogoutClick}
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const authLinksSmall = (
      <ul className="navigation--small__list">
        <li className="navigation--small__item">
          <Link to="/recipes" className="navigation--small__link">
            Recipes
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/creators" className="navigation--small__link">
            Creators
          </Link>
        </li>
        <li className="navigation--small__item">
          <Link to="/about" className="navigation--small__link">
            About
          </Link>
        </li>

        <li className="navigation--small__item">
          <a
            href="!#"
            className="navigation--small__link"
            onClick={this.onlogoutClick}
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <header>
        {/* <!-- navbar --> */}
        <div className="container">
          <nav className="main-nav">
            <ul>
              <Link to="/" className="logo">
                Recipury
              </Link>
              <li className="navigation__item">
                {isAuthenticated ? (
                  <p className="navigation__link">Welcom {user.name}</p>
                ) : (
                  <p className="navigation__link">Welcom guest</p>
                )}
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
            <div className="navigation--small">
              <input
                type="checkbox"
                className="navigation--small__checkbox"
                id="navi-toggle"
              />
              <label
                htmlFor="navi-toggle"
                className="navigation--small__button"
              >
                <span className="navigation--small__icon">&nbsp;</span>
              </label>
              <div className="navigation--small__bg">&nbsp;</div>
              {isAuthenticated ? authLinksSmall : guestLinksSmall}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
