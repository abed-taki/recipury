import React, { Component } from "react";
import "../src/css/App.css";
import {
  setAuthToken,
  setCurrentUser,
  logoutUser
} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

// components
import Home from "./components/layout/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import Profile from "./components/profile/Profile";
import AddRecipe from "./components/recipe/AddRecipe";
import Feed from "./components/recipe/Feed";
import Recipe from "./components/recipe/Recipe";
import About from "./components/layout/About";
import NotFound from "./components/common/NotFound";

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
    // clear profile
    store.dispatch(clearCurrentProfile());
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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/recipes" component={Feed} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/recipes/:id" component={Recipe} />
              <Route exact path="/about" component={About} />
              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute exact path="/create-recipe" component={AddRecipe} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
