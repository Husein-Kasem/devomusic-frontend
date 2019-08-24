import { returnErrors } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig } from "../utils";

import {
  GENRES_LOADED,
  GENRES_LOADING,
  GENRES_LOADING_FAILED,
  GENRES_ALBUMS_LOADED,
  GENRES_ALBUMS_LOADING,
  GENRES_ALBUMS_LOADING_FAILED
} from "./types";

export const loadGenres = () => (dispatch, getState) => {
  dispatch({ type: GENRES_LOADING });

  const requestUrl = `${BASE_URL}music/genre/getall`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: GENRES_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get genres",
          err.status
        )
      );
      dispatch({
        type: GENRES_LOADING_FAILED
      });
    });
};

export const loadGenreAlbums = genreId => (dispatch, getState) => {
  dispatch({ type: GENRES_ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/getbygenreid?genreId=${genreId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: GENRES_ALBUMS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get the genre albums",
          err.status
        )
      );
      dispatch({
        type: GENRES_ALBUMS_LOADING_FAILED
      });
    });
};
