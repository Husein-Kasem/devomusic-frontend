import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig, getHeaderConfig } from "../utils";

import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_PLAYLISTS,
  AUTH_ERROR,
  RELOAD_USER_LOADED,
  RELOAD_USER_LOADING,
  RELOAD_USER_LOADING_FAILED,
  USERNAME_SUCCESSFULLY_CHANGED
} from "./types";

const jwt = require("jsonwebtoken");

// load the user from the token if excisting
export const loadUser = (token = localStorage.getItem("token")) => (
  dispatch,
  getState
) => {
  // The token needs to be verrified in the backend
  if (token) {
    dispatch({ type: USER_LOADING });
    // get the decoded payload
    let decoded = jwt.decode(token, { complete: true });
    const experationDate = new Date(0);
    experationDate.setUTCSeconds(decoded.payload.exp);
    if (experationDate > Date.now()) {
      // getting user info from the backend

      const requestUrl = `${BASE_URL}user/findbyusername?username=${
        decoded.payload.sub
      }`;

      fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
        .then(res => {
          res
            .json()
            .then(response => {
              const { id, email, username, profileImage, imageDate } = response;
              let user = {
                id,
                username,
                email,
                profileImage,
                imageDate,
                type: decoded.payload.authorities[0].split("_")[1].toLowerCase()
              };
              dispatch({
                type: USER_LOADED,
                payload: user
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
  }
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  // Request Body
  const body = JSON.stringify({ username, password });
  const requestUrl = `${BASE_URL}auth`;
  axios
    .post(requestUrl, body, getHeaderConfig())
    .then(res => {
      // making the token object
      let token = res.headers.authorization.split(" ")[1];

      // saving the token and the user information in Redux
      let data = { token };

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });

      dispatch(loadUser(token));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Unauthorized: Wrong username or password\nOr unverrified email ",
          401
        )
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const reloadUser = () => (dispatch, getState) => {
  dispatch({ type: RELOAD_USER_LOADING });

  const requestUrl = `${BASE_URL}user/findbyid?userId=${
    getState().auth.user.id
  }`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        const { id, email, username, profileImage, imageDate } = response;
        let user = {
          id,
          username,
          email,
          profileImage,
          imageDate,
          type: getState().auth.user.type
        };
        dispatch({
          type: RELOAD_USER_LOADED,
          payload: user
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get songs history information",
          err.status
        )
      );
      dispatch({
        type: RELOAD_USER_LOADING_FAILED
      });
    });
};

// REGISTER USER
export const register = ({
  username,
  password,
  email,
  gender,
  country,
  birthDate
}) => dispatch => {
  const requestUrl = `${BASE_URL}user/register?username=${username}&email=${email}&password=${password}&gender=${gender}&country=${country}&birthDate=${birthDate}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
    .then(res => {
      res.text().then(response => {
        if (response !== "success") {
          dispatch(returnErrors(response, ""));
        } else {
          console.log(response);
          dispatch({
            type: REGISTER_SUCCESS
          });
          dispatch(
            createMessage(
              "Successful registration\nPlease check your mail for confirmation"
            )
          );
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors("something went wrong", ""));
      dispatch({
        type: REGISTER_FAIL
      });
    });
  // axios
  //   .post(
  //     `${BASE_URL}user/register?username=${username}&email=${email}&password=${password}&gender=${gender}&country=${country}&birthDate=${birthDate}`,
  //     getHeaderConfig()
  //   )
  //   .then(res => {
  //     console.log(res);
  //     dispatch({
  //       type: REGISTER_SUCCESS
  //     });
  //     dispatch(
  //       createMessage(
  //         "Successful registration\nPlease check your mail for confirmation"
  //       )
  //     );
  //   })
  //   .catch(err => {
  //     console.log(err);

  //     dispatch(returnErrors("something went wrong", ""));
  //     // (err.response &&
  //     //   dispatch(returnErrors(err.response.data, err.response.status))) ||
  //     //   dispatch(returnErrors("something went wrong", "500"));
  //     dispatch({
  //       type: REGISTER_FAIL
  //     });
  //   });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_PLAYLISTS });
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

// reload user manually
export const reloadUsername = username => (dispatch, getState) => {
  if (getState().auth.user) {
    let user = getState().auth.user;
    user.username = username;
    dispatch({ type: USERNAME_SUCCESSFULLY_CHANGED, payload: user });
  }
};
