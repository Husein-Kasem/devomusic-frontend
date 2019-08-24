import { BASE_URL, REQUEST_METHODES } from "../constants";
import {
  USERS_LOADED,
  USERS_LOADING,
  USERS_LOADING_FAILED,
  USER_ROLES_LOADED,
  USER_ROLES_LOADING,
  USER_ROLES_LOADING_FAILED
} from "./types";
import { returnErrors, createMessage } from "./messages";
import { getFetchHeaderConfig } from "../utils";

export const loadUsers = () => (dispatch, getState) => {
  dispatch({ type: USERS_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getusers`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: USERS_LOADED,
          payload: response
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
        type: USERS_LOADING_FAILED
      });
    });
};

export const loadUsersRoles = () => (dispatch, getState) => {
  dispatch({ type: USER_ROLES_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getroles`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: USER_ROLES_LOADED,
          payload: response
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
        type: USER_ROLES_LOADING_FAILED
      });
    });
};

export const editRole = (userId, role) => (dispatch, getState) => {
  const requestUrl = `${BASE_URL}auth/admin/setrole?userId=${userId}&role=${role}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.PUT))
    .then(data => dispatch(createMessage("user role changed")))
    .catch(error => {
      console.error(error);
      dispatch(returnErrors(error));
    });
};
