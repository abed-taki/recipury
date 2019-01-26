import React, { Component } from "react";
import "../src/css/App.css";
import {
  setAuthToken,
  setCurrentUser,
  logoutUser
} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// components
import Home from "./components/layout/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// set header for every page request
const token = localStorage.jwtToken;
if (token) {
  // set token
  setAuthToken(token);
  //decode token and get user
  const decoded = jwt_decode(token);
  // set user and auth
  store.dispatch(setCurrentUser(decoded));

  // check expiration
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // TODO : clear profile
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
