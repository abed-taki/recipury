import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login - get user token
// set token to every request
export const setAuthToken = token => {
  if (token) {
    // apply it to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete it
    delete axios.defaults.headers.common["Authorization"];
  }
};
// set loggedin user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // get token
      const { token } = res.data;
      // set it to localStorage
      localStorage.setItem("jwtToken", token);
      //set it to header
      setAuthToken(token);
      // get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// logout
export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");

  // remove token from header
  setAuthToken(false);
  // reset user to {}
  dispatch(setCurrentUser({}));
  //redirect to login
  window.location.href = "/login";
};
