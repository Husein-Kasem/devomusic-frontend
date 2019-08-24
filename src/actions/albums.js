import { returnErrors } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig } from "../utils";

import {
  ALBUMS_LOADED,
  ALBUMS_LOADING,
  ALBUMS_LOADING_FAILED,
  HOME_ALBUMS_LOADED,
  HOME_ALBUMS_LOADING,
  HOME_ALBUMS_LOADING_FAILED
} from "./types";

export const loadAlbums = (size = 100) => (dispatch, getState) => {
  dispatch({ type: ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/getpopular?size=${size}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ALBUMS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get albums information",
          err.status
        )
      );
      dispatch({
        type: ALBUMS_LOADING_FAILED
      });
    });
};

export const loadHomeAlbums = (size = 5) => (dispatch, getState) => {
  dispatch({ type: HOME_ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/getpopular?size=${size}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: HOME_ALBUMS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get albums information",
          err.status
        )
      );
      dispatch({
        type: HOME_ALBUMS_LOADING_FAILED
      });
    });
};
